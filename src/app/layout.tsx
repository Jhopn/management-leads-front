import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Verifique se este caminho está correto
import AuthProvider from "@/providers/auth-provider/auth-provider";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import "./globals.css";

export const metadata = {
  title: "Meu App",
  description: "Descrição do meu app",
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
        </AuthProvider>
      </body>
    </html>
  );
}