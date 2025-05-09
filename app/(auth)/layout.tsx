import { QueryProvider } from "@/providers/QueryClientProvider";
import "../globals.css";
import { Toaster } from "sonner";
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
