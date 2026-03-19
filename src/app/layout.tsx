import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "SlashEasy — Your MVP Built in 7 Days | Idea to Launch, Fast",
  description:
    "We build production-ready MVPs in 7 days. Book a free call, share your idea, and we handle design, development, and deployment. Fixed price, fixed timeline.",
  keywords: [
    "mvp development",
    "startup mvp",
    "build mvp fast",
    "7 day mvp",
    "rapid prototyping",
    "software development",
  ],
  openGraph: {
    title: "SlashEasy — Your MVP Built in 7 Days",
    description: "From idea to launch in 7 days. Book a free call today.",
    url: "https://slasheasy.com",
    siteName: "SlashEasy",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SlashEasy — Your MVP Built in 7 Days",
    description: "From idea to launch in 7 days. Book a free call today.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <head>
        {/* Prevent FOUC: apply dark class before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme:dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="font-poppins antialiased bg-white dark:bg-surface-dark text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
