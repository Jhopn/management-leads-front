import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 
import AuthProvider from "@/providers/auth-provider/auth-provider";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata = {
  title: "Teste Técnico - Management Leads",
  description: "Sistema de Gestão de Leads",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="pt-br">
      <body>
        <AuthProvider session={session}>
          <Header />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}