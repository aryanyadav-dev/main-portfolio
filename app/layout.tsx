import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://aryanyadav-dev.vercel.app'),
  title: {
    default: "Aryan Yadav Portfolio",
    template: "%s | Aryan Yadav Portfolio"
  },
  description: "Portfolio of Aryan Yadav - Full Stack Developer, Product Builder, and Polymath. Specializing in AI, React, Next.js, and building impactful products.",
  keywords: ["Aryan Yadav", "Full Stack Developer", "Product Builder", "AI Engineer", "React", "Next.js", "Portfolio", "Web Development"],
  authors: [{ name: "Aryan Yadav", url: "https://aryanyadav-dev.vercel.app" }],
  creator: "Aryan Yadav",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aryanyadav-dev.vercel.app",
    title: "Aryan Yadav Portfolio",
    description: "Portfolio of Aryan Yadav - Full Stack Developer, Product Builder, and Polymath. Bridging technical architecture with business outcomes.",
    siteName: "Aryan Yadav Portfolio",
    images: [
      {
        url: "/me.png",
        width: 1200,
        height: 630,
        alt: "Aryan Yadav"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryan Yadav Portfolio",
    description: "Portfolio of Aryan Yadav - Full Stack Developer, Product Builder, and Polymath.",
    images: ["/me.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Aryan Yadav",
              "url": "https://aryanyadav-dev.vercel.app",
              "image": "https://aryanyadav-dev.vercel.app/me.png",
              "sameAs": [
                "https://www.linkedin.com/in/-aryanyadav/",
                "https://github.com/aryanyadav-dev",
                "https://medium.com/@aryanyadavblogs"
              ],
              "jobTitle": "Full Stack Developer & Product Builder",
              "knowsAbout": ["Web Development", "Artificial Intelligence", "React", "Next.js", "Product Management"],
              "worksFor": {
                "@type": "Organization",
                "name": "Self-Employed"
              }
            })
          }}
        />
      </head>
      <body
        className={`${dmSans.variable} antialiased transition-colors duration-300`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
