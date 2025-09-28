"use client";
import Form from "@/components/form/form";
import Login from "@/components/login/login";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const Index = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageView = searchParams.get('view') === 'admin' ? 'admin' : 'public';

  const showPublicView = () => router.push('/');
  const showAdminView = () => router.push('/?view=admin');

  const mainContentRef = useRef<HTMLElement>(null);
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    mainContentRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }, [pageView]); 

  return (
    <>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="py-3 sm:py-5 ">
          <div className="text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
              Plataforma de Gerenciamento de <span className="text-[#00FF00]">Leads</span>
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-400  sm:text-xl/8">
              Gerenciando e organizando os leads com simplicidade e eficácia.
            </p>
          </div>
        </div>
      </div>

      <div className="flex mt-28 justify-center mb-20 border-2 border-[#00FF00] rounded-lg p-2 max-w-sm mx-auto gap-1.5">
        <button
          onClick={showPublicView}
          className={`w-1/2 py-2 px-4 cursor-pointer rounded-md text-sm font-semibold transition-colors duration-300 hover:bg-[#0a7a0a] hover:text-white ${pageView === 'public' ? 'bg-[#00FF00] text-[#000]' : 'text-white'}`}
        >
          Formulário
        </button>
        <button
          onClick={showAdminView}
          className={`w-1/2 py-2 px-4 cursor-pointer rounded-md text-sm font-semibold transition-colors duration-300 hover:bg-[#0a7a0a] hover:text-white ${pageView === 'admin' ? 'bg-[#00FF00] text-[#000]' : 'text-white'}`}
        >
          Painel Admin
        </button>
      </div>

      <main ref={mainContentRef}>
        {pageView === 'public' && <Form />}
        {pageView === 'admin' && <Login />}
      </main>
    </>
  );
}

export default Index;