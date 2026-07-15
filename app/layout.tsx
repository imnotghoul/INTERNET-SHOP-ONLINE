import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteChrome } from "@/components/site-chrome";

export const metadata:Metadata={metadataBase:new URL("https://northline.example"),title:{default:"NORTHLINE — Modern essentials",template:"%s — NORTHLINE"},description:"Premium modern streetwear designed for everyday movement.",openGraph:{title:"NORTHLINE",description:"Modern essentials built for everyday movement.",images:["/images/northline-hero.png"]}};
const themeScript = `(()=>{try{const saved=localStorage.getItem("northline-theme");const dark=saved?saved==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",dark)}catch{}})()`;
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:themeScript}}/></head><body><Providers><SiteChrome>{children}</SiteChrome></Providers></body></html>}
