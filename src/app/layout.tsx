import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pumpfun Pepe ($PFP) - The Normie Starter",
  description: "Every normie who makes an account starts here. The blank slate, the face of every beginning.",
  keywords: ["Pumpfun Pepe", "PFP", "crypto", "meme coin", "Solana"],
  openGraph: {
    title: "Pumpfun Pepe ($PFP)",
    description: "The face of every beginning",
    type: "website",
    images: ['/pepeimage.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
