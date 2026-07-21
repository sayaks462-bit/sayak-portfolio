export interface Project {
  id: string;
  slug: string;
  title: string;
  category: "interior" | "exhibition" | "commercial" | "residential";
  description: string;
  details: string;
  image: string;
  images: string[];
  tags: string[];
  year: string;
  software: string[];
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
  span: number;
}

export interface Skill {
  name: string;
  percentage: number;
  icon: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface CounterItem {
  label: string;
  value: number;
  suffix: string;
}
