"use client";
import Form from "@/components/form/form";
import Login from "@/components/login/login";
import { useState } from "react";

const Index = () => {
  const [pageView, setPageView] = useState<'public' | 'admin'>();

  return (
    <>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="py-3 sm:py-5 ">
          <div className="text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
              Plataforma de Gerenciamento de Leads
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
              fugiat veniam occaecat.
            </p>
          </div>
        </div>
      </div>

      <div className="flex mt-28 justify-center mb-20 bg-gray-800 rounded-lg p-2 max-w-sm mx-auto">
        <button onClick={() => setPageView('public')} className={`w-1/2 py-2 px-4 rounded-md text-sm font-semibold transition-colors duration-300 ${pageView === 'public' ? 'bg-logik-green text-gray-900' : 'text-gray-300'}`}>Formulário</button>
        <button onClick={() => setPageView('admin')} className={`w-1/2 py-2 px-4 rounded-md text-sm font-semibold transition-colors duration-300 ${pageView === 'admin' ? 'bg-logik-green text-gray-900' : 'text-gray-300'}`}>Painel Admin</button>
      </div>

      <main>
        {pageView === 'public' && <Form />}
        {pageView === 'admin' && <Login />}
      </main>

    </>
  );
}

export default Index;