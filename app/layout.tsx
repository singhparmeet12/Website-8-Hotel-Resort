import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { MobileFloatingNav } from "@/components/navigation/MobileFloatingNav";

export const metadata: Metadata = {
  title: "Marea Bay Resort | Luxury Oceanfront Sanctuary",
  description:
    "An architectural ode to the untamed Pacific coast. Discover barefoot luxury, clifftop penthouses, oceanfront villas with private plunge pools, and world-class thalassotherapy at Marea Bay Resort.",
  keywords: [
    "Marea Bay Resort",
    "luxury resort",
    "oceanfront villa",
    "clifftop penthouse",
    "thalassotherapy spa",
    "Costa Pacifica",
    "private beach resort",
  ],
  authors: [{ name: "Marea Bay Resort & Sanctuary" }],
  openGraph: {
    title: "Marea Bay Resort | Luxury Oceanfront Sanctuary",
    description:
      "Where dramatic Pacific cliffs meet untouched turquoise waters. Experience Forbes 5-Star rated barefoot luxury.",
    url: "https://mareabayresort.com",
    siteName: "Marea Bay Resort",
    images: [
      {
        url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85",
        width: 1200,
        height: 630,
        alt: "Marea Bay Resort Oceanfront Villa",
      },
    ],
    locale: "en_US",
    type: "website",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased selection:bg-marea-gold selection:text-marea-teal-night">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <div className="pb-20 md:pb-0 min-h-screen">
            {children}
          </div>
          <MobileFloatingNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
