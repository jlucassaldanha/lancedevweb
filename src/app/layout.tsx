import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Lora, Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import AppProvider from "./providers";
import { Header } from "@/components/my-components/Header";
import Footer from "@/components/my-components/Footer";
import { getTokenAndDataAction } from "@/actions/auth";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const instant = false;

const fontSans = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans", // Adicione os pesos para o Tailwind reconhecer font-bold, etc.
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fontSerif = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Lance Dev",
  description: "Seu site de Leilões ao vivo",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { user, token } = await getTokenAndDataAction()

  return (
    <html
      lang="pt-BR"
      className={cn("h-full", "antialiased", fontSans.variable, fontSans.variable, "font-sans", inter.variable, fontSerif.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col lg:px-20">
        <AppProvider user={user} token={token}>
          <Header />
          {children}
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
