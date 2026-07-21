const fs = require("fs");
const path = require("path");

const PROJECTS_DIR = path.join(__dirname, "..", "public", "images", "projects");
const GALLERY_DIR = path.join(__dirname, "..", "public", "images", "gallery");
const OUTPUT = path.join(__dirname, "..", "src", "lib", "manifest.json");

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

const categoryMeta = {
  interior: {
    projects: {
      kitchen: {
        title: "Luxury Modern Kitchen",
        slug: "luxury-modern-kitchen",
        description:
          "A premium kitchen design featuring marble countertops, custom cabinetry, and ambient lighting for a sophisticated culinary space.",
        details:
          "This luxury kitchen was designed for a high-end residential property, focusing on clean lines, premium materials, and functional elegance. The design incorporates Italian marble countertops, custom walnut cabinetry, integrated smart appliances, and a carefully planned lighting scheme that creates warmth while maintaining a modern aesthetic.",
        tags: ["Kitchen", "Modern", "Luxury", "Residential"],
        year: "2025",
      },
      "living-room": {
        title: "Elegant Living Room",
        slug: "elegant-living-room",
        description:
          "A sophisticated living space with bespoke furniture, rich textures, and a warm color palette creating an inviting atmosphere.",
        details:
          "This elegant living room was crafted to be both a sanctuary and a statement. Featuring custom-designed furniture pieces, hand-selected fabrics, and a curated art collection, every element works harmoniously. The warm lighting design and carefully chosen accent pieces create an atmosphere of refined comfort.",
        tags: ["Living Room", "Elegant", "Custom Furniture"],
        year: "2025",
      },
      bathroom: {
        title: "Spa-Inspired Bathroom",
        slug: "spa-bathroom",
        description:
          "A serene bathroom retreat with natural stone, rainfall shower, and ambient lighting for ultimate relaxation.",
        details:
          "This spa-inspired bathroom transforms a functional space into a personal retreat. Using natural stone tiles, a freestanding soaking tub, rainfall shower system, and layered ambient lighting, the design creates a tranquil environment. Built-in niches, heated floors, and smart mirror technology add modern convenience.",
        tags: ["Bathroom", "Spa", "Luxury", "Natural Stone"],
        year: "2025",
      },
      bedroom: {
        title: "Master Bedroom Suite",
        slug: "master-bedroom-suite",
        description:
          "A luxurious bedroom retreat with custom headboard, layered textiles, and dreamy ambient lighting.",
        details:
          "This master bedroom suite is designed as the ultimate personal sanctuary. A custom upholstered headboard serves as the focal point, complemented by layered bedding in rich textures. The lighting design includes concealed LED strips, bedside sconces, and a statement chandelier, all controlled by a smart home system for effortless mood setting.",
        tags: ["Bedroom", "Master Suite", "Luxury", "Smart Home"],
        year: "2025",
      },
    },
  },
  exhibition: {
    projects: {
      "rare-beauty": {
        title: "Rare Beauty Exhibition Stall",
        slug: "rare-beauty-exhibition",
        description:
          "A stunning exhibition stall design for Rare Beauty featuring organic forms, premium materials, and immersive brand experience.",
        details:
          "The Rare Beauty exhibition stall was designed to embody the brand's philosophy of embracing individuality. The organic flowing forms, soft curves, and warm metallic accents create an inviting space. Interactive display stations, a makeup trial area, and Instagram-worthy photo spots ensure maximum visitor engagement and brand recall.",
        tags: ["Exhibition", "Rare Beauty", "Brand Experience", "Interactive"],
        year: "2025",
      },
      elan: {
        title: "Elan Exhibition Stall",
        slug: "elan-exhibition",
        description:
          "A bold and dynamic exhibition stall for Elan with geometric forms, dramatic lighting, and luxury finishes.",
        details:
          "The Elan exhibition stall makes a powerful statement with its bold geometric architecture and dramatic lighting design. Premium finishes including polished metal, backlit onyx panels, and custom LED installations create a luxurious ambiance. The layout strategically guides visitors through an immersive brand journey with product showcases and VIP meeting areas.",
        tags: ["Exhibition", "Elan", "Geometric", "Luxury"],
        year: "2025",
      },
      titan: {
        title: "Titan Exhibition Stall",
        slug: "titan-exhibition",
        description:
          "A sleek and modern exhibition stall for Titan with precision design, premium displays, and sophisticated brand presentation.",
        details:
          "The Titan exhibition stall reflects the brand's commitment to precision and craftsmanship. Clean architectural lines, precision-engineered display cases, and sophisticated material combinations create an atmosphere of refined luxury. The lighting design highlights product showcases while ambient elements create an engaging visitor experience.",
        tags: ["Exhibition", "Titan", "Precision", "Modern"],
        year: "2024",
      },
      "calvin-klein": {
        title: "Calvin Klein Exhibition Stall",
        slug: "calvin-klein-exhibition",
        description:
          "A minimalist yet impactful exhibition stall for Calvin Klein with monochrome palette and architectural simplicity.",
        details:
          "True to the Calvin Klein aesthetic, this exhibition stall embraces minimalist design principles. The monochrome palette, clean architectural forms, and strategic use of negative space create a powerful visual impact. Large-format product imagery, precision lighting, and premium material details elevate the brand presentation while maintaining simplicity.",
        tags: ["Exhibition", "Calvin Klein", "Minimalist", "Monochrome"],
        year: "2024",
      },
    },
  },
  commercial: { projects: {} },
  residential: { projects: {} },
};

function isImage(f) {
  return IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase());
}

function scanImages(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(isImage).sort();
}

function slugFromFilename(filename) {
  return path.basename(filename, path.extname(filename)).toLowerCase();
}

function titleFromSlug(slug) {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* ── 1. Build projects (same as before) ──────────────── */
let idCounter = 1;
const allProjects = [];

for (const [category, catConfig] of Object.entries(categoryMeta)) {
  const catDir = path.join(PROJECTS_DIR, category);
  const files = scanImages(catDir);

  for (const file of files) {
    const key = slugFromFilename(file);
    const meta = catConfig.projects[key] || {};
    const imagePath = `/images/projects/${category}/${file}`;

    allProjects.push({
      id: String(idCounter++),
      slug: meta.slug || `${key}-${category}`,
      title: meta.title || titleFromSlug(key),
      category,
      description: meta.description || `Professional ${titleFromSlug(key)} 3D visualization.`,
      details: meta.details || meta.description || `A premium ${titleFromSlug(key)} design project.`,
      image: imagePath,
      images: [imagePath],
      tags: meta.tags || [titleFromSlug(key), capitalize(category)],
      year: meta.year || "2025",
    });
  }
}

/* ── 2. Build gallery from BOTH sources ─────────────────
   a) public/images/gallery/<category>/*  (explicit gallery)
   b) public/images/projects/<category>/*  (all project renders)
   ─────────────────────────────────────────────────────── */
const allGallery = [];
let gId = 1;

// Helper: aspect ratio for masonry span
function computeSpan(w, h) {
  const ratio = h / w;
  if (ratio > 1.3) return 2;   // tall image → span 2 rows
  if (ratio < 0.7) return 1;   // wide / square
  return 1;
}

// a) Explicit gallery subfolders
if (fs.existsSync(GALLERY_DIR)) {
  const entries = fs.readdirSync(GALLERY_DIR, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const cat = entry.name;                       // e.g. "interior"
      const catDir = path.join(GALLERY_DIR, cat);
      const files = scanImages(catDir);

      for (const file of files) {
        const key = slugFromFilename(file);
        const src = `/images/gallery/${cat}/${file}`;
        allGallery.push({
          id: `g${gId++}`,
          src,
          alt: titleFromSlug(key),
          category: capitalize(cat),
          width: 800,
          height: 600,
          span: 1,
        });
      }
    }
  }

  // Flat images in gallery root → category "All"
  const rootFiles = entries
    .filter((e) => e.isFile() && isImage(e.name))
    .map((e) => e.name)
    .sort();

  for (const file of rootFiles) {
    const key = slugFromFilename(file);
    const src = `/images/gallery/${file}`;
    allGallery.push({
      id: `g${gId++}`,
      src,
      alt: titleFromSlug(key),
      category: "All",
      width: 800,
      height: 600,
      span: 1,
    });
  }
}

// b) Include every project render in the gallery too
for (const project of allProjects) {
  allGallery.push({
    id: `g${gId++}`,
    src: project.image,
    alt: project.title,
    category: capitalize(project.category),
    width: 800,
    height: 600,
    span: 1,
  });
}

/* ── 3. Write manifest ────────────────────────────────── */
const manifest = {
  projects: allProjects,
  gallery: allGallery,
  scannedAt: new Date().toISOString(),
};

fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
fs.writeFileSync(OUTPUT, JSON.stringify(manifest, null, 2));

console.log(
  `Manifest generated: ${allProjects.length} projects, ${allGallery.length} gallery items`
);
console.log(`Output: ${OUTPUT}`);
