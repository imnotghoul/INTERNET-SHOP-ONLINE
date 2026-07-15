"use client";
import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useShopStore } from "@/store/use-shop-store";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const [open, setOpen] = useState(false); const pathname = usePathname();
  const cart = useShopStore((s) => s.cart); const favorites = useShopStore((s) => s.favorites);
  useEffect(() => setOpen(false), [pathname]);
  const count = cart.reduce((sum,i)=>sum+i.quantity,0);
  return <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
    <div className="container-x flex h-[72px] items-center justify-between text-white mix-blend-difference">
      <button className="md:hidden" onClick={()=>setOpen(!open)} aria-label="Menu">{open?<X size={21}/>:<Menu size={21}/>}</button>
      <nav className="hidden md:flex items-center gap-7 text-[10px] font-bold uppercase tracking-[.16em]"><Link className="link-line" href="/shop">Shop</Link><Link className="link-line" href="/categories/jackets">Collections</Link><Link className="link-line" href="/#story">About</Link></nav>
      <Link href="/" className="absolute left-1/2 -translate-x-1/2 font-black text-[19px] tracking-[-.045em]">NORTHLINE®</Link>
      <div className="flex items-center gap-3 md:gap-5"><Link href="/shop" aria-label="Search"><Search size={18}/></Link><Link className="hidden sm:block" href="/account" aria-label="Account"><User size={18}/></Link><Link className="relative hidden sm:block" href="/favorites" aria-label="Favorites"><Heart size={18}/>{favorites.length>0&&<span className="absolute -right-2 -top-2 text-[8px]">{favorites.length}</span>}</Link><ThemeToggle/><Link className="relative" href="/cart" aria-label={`Cart with ${count} items`}><ShoppingBag size={18}/>{count>0&&<span className="absolute -right-2.5 -top-2.5 grid h-4 min-w-4 place-items-center rounded-full bg-acid px-1 text-[8px] text-ink">{count}</span>}</Link></div>
    </div>
    {open&&<div className="bg-ink text-white min-h-[calc(100vh-72px)] p-6 flex flex-col gap-3"><Link className="display text-[15vw]" href="/shop">Shop</Link><Link className="display text-[15vw]" href="/favorites">Saved</Link><Link className="display text-[15vw]" href="/account">Account</Link><div className="mt-auto eyebrow text-white/50">Built for everyday movement.</div></div>}
  </header>;
}
