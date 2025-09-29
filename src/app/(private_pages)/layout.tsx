import { AuthGuard } from "@/guard/auth-guard/auth-guard";
import { AuthInterceptor } from "@/providers/auth-interceptor/auth-interceptor";

const PrivateLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
      <AuthGuard>
        <AuthInterceptor />
        {children}
      </AuthGuard>
  )
};

export default PrivateLayout;