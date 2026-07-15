import type { Product } from "./types";

export const categories = [
  { name: "Hoodies", slug: "hoodies", image: "/images/hoodie-editorial.png", copy: "Weight, form, quiet confidence." },
  { name: "T-Shirts", slug: "t-shirts", image: "/images/shirt-editorial.png", copy: "The everyday layer, reconsidered." },
  { name: "Jackets", slug: "jackets", image: "/images/jacket-editorial.png", copy: "Built for changing conditions." },
  { name: "Pants", slug: "pants", image: "/images/northline-hero.png", copy: "Movement without compromise." },
  { name: "Accessories", slug: "accessories", image: "/images/accessories-editorial.png", copy: "Utility in every detail." },
];

const names: Record<string, string[]> = {
  hoodies: ["Contour Heavy Hoodie", "Core Zip Hoodie", "Frame Sweatshirt", "North Loop Hoodie", "Studio Half-Zip", "Raw Edge Crew"],
  "t-shirts": ["Axis Heavy Tee", "Foundation Tee", "Box Cut Tee", "Longline Jersey", "Daily Rib Tee", "Grid Long Sleeve"],
  jackets: ["Transit Shell", "Field Overshirt", "Forma Bomber", "Weather Parka", "Layer Vest", "Studio Blouson"],
  pants: ["Motion Trouser", "Arc Cargo", "Wide Studio Pant", "Utility Track Pant", "Form Denim", "Relaxed Chino"],
  accessories: ["Canvas System Bag", "Merino Watch Cap", "Frame Belt", "Daily Tote", "Wool Grid Scarf", "Utility Wallet"],
};

const imageFor = (category: string) => ({
  hoodies: "/images/hoodie-editorial.png", "t-shirts": "/images/shirt-editorial.png", jackets: "/images/jacket-editorial.png",
  pants: "/images/northline-hero.png", accessories: "/images/accessories-editorial.png",
}[category] || "/images/hoodie-editorial.png");

export const products: Product[] = Object.entries(names).flatMap(([category, list], categoryIndex) =>
  list.map((name, index) => ({
    id: `${categoryIndex + 1}${index + 1}`,
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
    description: "A precise everyday layer designed in our studio with considered proportions, durable materials and a quiet, functional finish.",
    price: 85 + categoryIndex * 28 + index * 9,
    oldPrice: index === 4 ? 175 + categoryIndex * 20 : undefined,
    category: categories[categoryIndex].name,
    categorySlug: category,
    images: [imageFor(category), imageFor(category)],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "White", "Grey", "Beige", "Navy"],
    stock: index === 5 ? 0 : 7 + index * 3,
    rating: Number((4.4 + ((index + categoryIndex) % 6) * .1).toFixed(1)),
    isNew: index < 2,
  }))
);

export const formatPrice = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

export const getProduct = (slug: string) => products.find((product) => product.slug === slug);
