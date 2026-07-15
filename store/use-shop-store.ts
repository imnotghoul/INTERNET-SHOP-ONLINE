"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/lib/types";

type ShopStore = {
  cart: CartItem[]; favorites: Product[];
  addToCart: (product: Product, size?: string, color?: string) => void;
  removeFromCart: (id: string, size: string, color: string) => void;
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void;
  toggleFavorite: (product: Product) => void; clearCart: () => void;
};

export const useShopStore = create<ShopStore>()(persist((set) => ({
  cart: [], favorites: [],
  addToCart: (product, size = "M", color = "Black") => set((state) => {
    const found = state.cart.find((i) => i.id === product.id && i.size === size && i.color === color);
    return { cart: found ? state.cart.map((i) => i === found ? { ...i, quantity: i.quantity + 1 } : i) : [...state.cart, { ...product, size, color, quantity: 1 }] };
  }),
  removeFromCart: (id, size, color) => set((state) => ({ cart: state.cart.filter((i) => !(i.id === id && i.size === size && i.color === color)) })),
  updateQuantity: (id, size, color, quantity) => set((state) => ({ cart: state.cart.map((i) => i.id === id && i.size === size && i.color === color ? { ...i, quantity: Math.max(1, quantity) } : i) })),
  toggleFavorite: (product) => set((state) => ({ favorites: state.favorites.some((i) => i.id === product.id) ? state.favorites.filter((i) => i.id !== product.id) : [...state.favorites, product] })),
  clearCart: () => set({ cart: [] }),
}), { name: "northline-shop" }));
