import type { MetadataRoute } from "next";import { categories,products } from "@/lib/data";
export default function sitemap():MetadataRoute.Sitemap{const base="https://northline.example";return [{url:base,priority:1},{url:`${base}/shop`,priority:.9},...categories.map(c=>({url:`${base}/categories/${c.slug}`,priority:.7})),...products.map(p=>({url:`${base}/product/${p.slug}`,priority:.6}))]}
