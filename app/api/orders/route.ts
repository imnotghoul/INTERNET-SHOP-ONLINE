import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { checkoutSchema } from "@/lib/validators";

const orderSchema = z.object({
  customer: checkoutSchema,
  items: z.array(z.object({
    id: z.string().min(1),
    quantity: z.number().int().min(1).max(10),
    size: z.string().min(1),
    color: z.string().min(1),
  })).min(1).max(50),
});

export async function POST(req: Request) {
  try {
    const { customer, items } = orderSchema.parse(await req.json());
    const ids = [...new Set(items.map((item) => item.id))];
    const products = await prisma.product.findMany({ where: { id: { in: ids }, isPublished: true } });
    if (products.length !== ids.length) return NextResponse.json({ error: "A product is unavailable" }, { status: 409 });

    const lines = items.map((item) => {
      const product = products.find((candidate) => candidate.id === item.id)!;
      if (!product.sizes.includes(item.size) || !product.colors.includes(item.color)) throw new Error("Invalid variant");
      return { ...item, price: Number(product.price) };
    });
    const subtotal = lines.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalPrice = subtotal + (subtotal >= 200 ? 0 : 15);
    const session = await auth();
    const user = session?.user?.email ? await prisma.user.findUnique({ where: { email: session.user.email.toLowerCase() } }) : null;

    const order = await prisma.$transaction(async (tx) => {
      for (const line of lines) {
        const updated = await tx.product.updateMany({
          where: { id: line.id, stock: { gte: line.quantity } },
          data: { stock: { decrement: line.quantity } },
        });
        if (updated.count !== 1) throw new Error("Insufficient stock");
      }
      return tx.order.create({
        data: {
          userId: user?.id,
          customerName: `${customer.firstName.trim()} ${customer.lastName.trim()}`,
          email: customer.email.toLowerCase().trim(),
          phone: customer.phone,
          address: customer.address,
          city: customer.city,
          country: customer.country,
          postcode: customer.postcode,
          comment: customer.comment,
          totalPrice,
          items: { create: lines.map((line) => ({ productId: line.id, quantity: line.quantity, size: line.size, color: line.color, price: line.price })) },
        },
      });
    });
    return NextResponse.json({ id: order.id, totalPrice });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Order failed" }, { status: 400 });
  }
}
