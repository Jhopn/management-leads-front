import { ReactNode } from "react";
import { AuthGuard } from "@/guard/auth-guard/auth-guard";
import { AuthInterceptor } from "@/providers/auth-interceptor/auth-interceptor";
// import { Toaster } from "@/components/ui/sonner";

const PrivateLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
      <AuthGuard>
        <AuthInterceptor />
        {children}
         {/* <Toaster /> */}
      </AuthGuard>
  )
};

export default PrivateLayout;