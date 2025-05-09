import { QueryProvider } from "@/providers/QueryClientProvider";
import "../globals.css";
import { Toaster } from "sonner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Iraq Oil and Gas Technology Exhibition (OIGATECH 2025)",
  description:
    "Access the OIGATECH 2025 dashboard by logging in to admin account.",
  keywords: [
    "login",
    "authentication",
    "OIGATECH 2025",
    "dashboard",
    "oil and gas technology",
  ],
  authors: [{ name: "OIGATECH 2025 Team" }],
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Login - Iraq Oil and Gas Technology Exhibition (OIGATECH 2025)",
    description:
      "Access the OIGATECH 2025 dashboard by logging in to admin account.",
    type: "website",
    images: [
      {
        url: "https://www.oigatech2025.com/og-image-login.jpg", // استبدلها برابط الصورة الفعلي
        width: 1200,
        height: 630,
        alt: "Login OIGATECH 2025 Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Login - Iraq Oil and Gas Technology Exhibition (OIGATECH 2025)",
    description:
      "Access the OIGATECH 2025 dashboard by logging in to admin account.",
    images: ["https://www.oigatech2025.com/og-image-login.jpg"], // نفس رابط الصورة
  },
};
type props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: props) => {
  return (
    <html>
      <body>
        <Toaster />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
};

export default AuthLayout;
