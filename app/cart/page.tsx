"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { formatPrice } from "@/lib/data";
import { useShopStore } from "@/store/use-shop-store";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useShopStore();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return <main className="container-x min-h-[75vh] pb-24 pt-36">
    <div className="flex items-end justify-between border-b hairline pb-7">
      <h1 className="display text-[clamp(64px,11vw,150px)]">Your bag</h1>
      <span className="eyebrow text-black/40">{itemCount} items</span>
    </div>
    {!cart.length ? <div className="py-28 text-center">
      <p className="display text-5xl">Your bag is quiet.</p>
      <p className="mt-4 text-sm text-black/45">Add something built to last.</p>
      <Link href="/shop" className="btn-dark mt-8">Explore collection</Link>
    </div> : <div className="grid gap-12 pt-8 lg:grid-cols-[1.6fr_.7fr]">
      <div className="divide-y hairline">
        {cart.map((item) => <div className="grid grid-cols-[110px_1fr] gap-5 py-5 sm:grid-cols-[150px_1fr_auto]" key={`${item.id}-${item.size}-${item.color}`}>
          <Link className="relative aspect-[3/4] bg-fog" href={`/product/${item.slug}`}>
            <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
          </Link>
          <div>
            <Link href={`/product/${item.slug}`} className="font-semibold">{item.name}</Link>
            <p className="mt-2 text-xs text-black/45">{item.color} / {item.size}</p>
            <div className="mt-6 inline-flex items-center border hairline">
              <button aria-label={`Decrease ${item.name} quantity`} onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)} className="p-2"><Minus size={13} /></button>
              <span className="w-8 text-center text-xs">{item.quantity}</span>
              <button aria-label={`Increase ${item.name} quantity`} onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)} className="p-2"><Plus size={13} /></button>
            </div>
          </div>
          <div className="col-start-2 flex items-end justify-between sm:col-start-auto sm:flex-col">
            <span>{formatPrice(item.price * item.quantity)}</span>
            <button aria-label={`Remove ${item.name}`} onClick={() => removeFromCart(item.id, item.size, item.color)} className="text-black/40 hover:text-black"><Trash2 size={16} /></button>
          </div>
        </div>)}
      </div>
      <aside className="h-fit bg-[#e6e3db] p-6 lg:sticky lg:top-24">
        <div className="eyebrow mb-7">Order summary</div>
        <div className="space-y-4 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>{subtotal >= 200 ? "Complimentary" : "$15"}</span></div>
        </div>
        <form onSubmit={(event) => { event.preventDefault(); toast.info("Promo codes are not active in this demo"); }} className="mt-7 flex border-b border-black/30">
          <input className="min-w-0 flex-1 bg-transparent py-3 text-xs outline-none" placeholder="Promo code" />
          <button className="text-[10px] font-bold uppercase">Apply</button>
        </form>
        <div className="mt-7 flex justify-between border-t border-black/20 pt-5 font-semibold">
          <span>Total</span><span>{formatPrice(subtotal + (subtotal >= 200 ? 0 : 15))}</span>
        </div>
        <Link href="/checkout" className="btn-dark mt-7 w-full">Proceed to checkout</Link>
        <p className="mt-4 text-center text-[10px] text-black/45">Taxes calculated at checkout</p>
      </aside>
    </div>}
  </main>;
}
