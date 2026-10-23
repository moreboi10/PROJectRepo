import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Figtree({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata = {
  title: { default: "Surhires | Hire faster, get hired sooner", template: "%s | Surhires" },
  description: "Surhires matches employers and job seekers on skills. Post a job in ten minutes or find your next role today.",
  openGraph: { siteName: "Surhires", type: "website", locale: "en_IN" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a href="#main" className="sr-only z-[60] rounded bg-white px-4 py-2 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
