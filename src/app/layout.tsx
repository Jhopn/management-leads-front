import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AuthProvider from "@/providers/auth-provider/auth-provider";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { Toaster } from "sonner";
import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "Teste Técnico - Management Leads",
  description: "Sistema de Gestão de Leads",
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="pt-br">
      <head>
        {GTM_ID && (
          <Script id="gtm-init" strategy="afterInteractive" dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`
          }} />
        )}
      </head>
      <body>
        {GTM_ID && (
          <div dangerouslySetInnerHTML={{
            __html: `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`
          }} />
        )}
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