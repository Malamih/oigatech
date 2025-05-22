import type { Metadata } from "next";
import "../globals.css";
import { Header } from "./dashboard/components/Header";
import { Sidebar } from "./dashboard/components/Sidebar";
import { QueryProvider } from "@/providers/QueryClientProvider";
import { Toaster } from "sonner";
import NextToploader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "Dashboard - Iraq Oil and Gas Technology Exhibition (OIGATECH 2025)",
  description:
    "Welcome to your dashboard for the Iraq Oil and Gas Technology Exhibition (OIGATECH 2025).",
  keywords: [
    "dashboard",
    "OIGATECH 2025",
    "oil and gas technology",
    "user dashboard",
    "OIGATECH participants",
  ],
  authors: [{ name: "OIGATECH 2025 Team" }],
  robots: "index, follow",
  openGraph: {
    title: "Dashboard - Iraq Oil and Gas Technology Exhibition (OIGATECH 2025)",
    description:
      "Welcome to your dashboard for the Iraq Oil and Gas Technology Exhibition (OIGATECH 2025).",
    url: "https://www.oigatech2025.com/dashboard",
    type: "website",
    images: [
      {
        url: "https://www.oigatech2025.com/og-image-dashboard.jpg",
        width: 1200,
        height: 630,
        alt: "Dashboard OIGATECH 2025 Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dashboard - Iraq Oil and Gas Technology Exhibition (OIGATECH 2025)",
    description:
      "Welcome to your dashboard for the Iraq Oil and Gas Technology Exhibition (OIGATECH 2025).",
    images: ["https://www.oigatech2025.com/og-image-dashboard.jpg"],
  },
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-[#f5eeeb]`}>
        <NextToploader showSpinner={true} color="#ee6115" />
        <Toaster />
        <QueryProvider>
          <div className="page dashboard-layout">
            <Sidebar />
            <Header />
            {children}
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
