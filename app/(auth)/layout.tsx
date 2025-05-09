import { QueryProvider } from "@/providers/QueryClientProvider";
import "../globals.css";
import { Toaster } from "sonner";
import AuthPageMetaTags from "@/components/AuthMetaTags";
type props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: props) => {
  return (
    <html>
      <AuthPageMetaTags />
      <body>
        <Toaster />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
};

export default AuthLayout;
