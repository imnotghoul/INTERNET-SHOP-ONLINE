export type Product = {
  id: string; name: string; slug: string; description: string; price: number; oldPrice?: number;
  category: string; categorySlug: string; images: string[]; sizes: string[]; colors: string[];
  stock: number; rating: number; isNew?: boolean;
};

export type CartItem = Product & { quantity: number; size: string; color: string };
