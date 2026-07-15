import { z } from "zod";
export const checkoutSchema=z.object({firstName:z.string().min(2),lastName:z.string().min(2),phone:z.string().min(7),email:z.string().email(),country:z.string().min(2),city:z.string().min(2),address:z.string().min(5),postcode:z.string().min(3),comment:z.string().optional()});
export const registerSchema=z.object({name:z.string().min(2),email:z.string().email(),password:z.string().min(8)});
export type CheckoutValues=z.infer<typeof checkoutSchema>;
