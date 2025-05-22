// app/layout.tsx
import type { Metadata } from "next";
import "../globals.css";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Sponsors } from "@/components/Sponsors";
import { Toaster } from "sonner";
import { QueryProvider } from "@/providers/QueryClientProvider";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "Iraq Oil and Gas Technology Exhibition (OIGATECH 2025)",
  description:
    "Join the Iraq Oil and Gas Technology Exhibition (OIGATECH 2025) from 1-6 June 2025 at the Baghdad International Fair. Discover the latest innovations and connect with industry leaders.",
  keywords: [
    "Iraq Oil and Gas",
    "OIGATECH 2025",
    "Baghdad International Fair",
    "energy technology",
    "oil exhibition",
    "gas technology",
    "Iraq events",
    "energy conference",
  ],
  authors: [{ name: "OIGATECH 2025 Organizers" }],
  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow",
  openGraph: {
    title: "Iraq Oil and Gas Technology Exhibition (OIGATECH 2025)",
    description:
      "Join the Iraq Oil and Gas Technology Exhibition (OIGATECH 2025) from 1-6 June 2025 at the Baghdad International Fair. Discover the latest innovations and connect with industry leaders.",
    url: "https://www.oigatech2025.com",
    type: "website",
    images: [
      {
        url: "/header-logo.png",
        width: 800,
        height: 600,
        alt: "OIGATECH 2025 Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Iraq Oil and Gas Technology Exhibition (OIGATECH 2025)",
    description:
      "Join the Iraq Oil and Gas Technology Exhibition (OIGATECH 2025) from 1-6 June 2025 at the Baghdad International Fair.",
    images: ["/header-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased flex items-center p-2 lg:p-0 justify-center min-h-[100vh] overflow-x-hidden bg-[#973f0f]`}
      >
        <NextTopLoader showSpinner={false} color="#ee6115" />
        <Toaster />
        <QueryProvider>
          <div className="bg fixed top-0 left-0 w-full h-full z-0 opacity-[30%]">
            <img
              src={"/background.png"}
              alt="background"
              className="w-full h-full object-cover absolute top-0 left-0"
            />
          </div>
          <div className="page flex flex-col lg:flex-row z-10 p-3">
            <div className="content flex flex-col relative p-4 bg-white min-h-[500px] rounded-tl-2xl rounded-bl-2xl max-w-[800px] w-auto">
              <img
                src={"/content-background.png"}
                alt="background"
                className="z-0 opacity-50 object-cover absolute top-0 left-0"
                draggable={false}
              />
              <Header />
              <div className="flex-[1]">{children}</div>
            </div>
            <Sponsors />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
