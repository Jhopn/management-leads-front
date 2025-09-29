"use client";
import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiClient } from "@/services";
import { useState } from "react";
import { CreateLeadForm, createLeadSchema } from "@/schemas/leads-schemas";
import { toast } from "sonner";


export default function Form() {
  const resolver = zodResolver(createLeadSchema) as Resolver<CreateLeadForm>;
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateLeadForm>({
    resolver,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);


  const onSubmit = async (data: CreateLeadForm) => {
    setIsSubmitting(true); 
    await apiClient.post('/leads', data)

    toast.success("Cadastro enviado com sucesso!");
    setIsSubmitting(false); 
    reset();
  };

  return (
    <div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-1/2 -z-10 aspect-1155/678 w-144.5 max-w-none -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#00FF00] to-[#12bd12] opacity-20 sm:left-[calc(50%-40rem)] sm:w-288.75"
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">Cadastre-se para Novidades</h2>
        <p className="mt-2 text-lg/8 text-gray-400">Entraremos em contato!</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-16 max-w-xl sm:mt-20 p-2">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="name" className="block text-sm/6 font-semibold text-white">
              Nome Completo
            </label>
            <div className="mt-2.5">
              <input
                id="name"
                type="text"
                autoComplete="given-name"
                {...register("name")}
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#00FF00]"
              />
              {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm/6 font-semibold text-white">
              Email
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#00FF00]"
              />
              {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>}
            </div>
          </div>
          <div>
            <label
              htmlFor="dateBirth"
              className="block text-sm/6 font-semibold text-white">
              Data de Nascimento</label>

            <div className="mt-2.5">
              <input
                type="date"
                id="dateBirth"
                {...register("dateBirth")}
                className="block w-full rounded-md bg-white/5 px-3.5 py-2  text-white placeholder:text-gray-500  focus:outline-[#00FF00]"
              />
              {errors.dateBirth && <p className="mt-2 text-sm text-red-400">{errors.dateBirth.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="position" className="block text-sm/6 font-semibold text-white">
              Cargo
            </label>
            <div className="mt-2.5">
              <input
                id="position"
                type="text"
                autoComplete="organization"
                {...register("position")}
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#00FF00]"
              />
              {errors.position && <p className="mt-2 text-sm text-red-400">{errors.position.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="telephone" className="block text-sm/6 font-semibold text-white">
              Número de Telefone
            </label>
            <div className="mt-2.5">
              <div className="flex rounded-md bg-white/5 outline-1 -outline-offset-1 outline-white/10 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-[#00FF00]">
                <div className="grid shrink-0 grid-cols-1">
                  <div
                    className="col-start-1 row-start-1 flex items-center justify-center rounded-l-md bg-transparent py-2 pl-3.5 pr-2 text-base text-gray-400 focus:outline-none"
                  >
                    +55
                  </div>
                </div>
                <input
                  id="telephone"
                  type="text"
                  placeholder="(99) 99999-9999"
                  {...register("telephone")}
                  className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                />
              </div>
              {errors.telephone && <p className="mt-2 text-sm text-red-400">{errors.telephone.message}</p>}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm/6 font-semibold text-white">
              Mensagem
            </label>
            <div className="mt-2.5">
              <textarea
                id="message"
                rows={4}
                {...register("message")}
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#00FF00]"
                defaultValue={''}
              />
              {errors.message && <p className="mt-2 text-sm text-red-400">{errors.message.message}</p>}
            </div>
          </div>
          <div className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <div className="group relative inline-flex w-8 shrink-0 rounded-full bg-white/5 p-px inset-ring inset-ring-white/10 outline-offset-2 outline-[#0a7a0a] transition-colors duration-200 ease-in-out has-checked:bg-[#00FF00] has-focus-visible:outline-2">
                <span className="size-4 rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-3.5" />
                <input
                  id="agree-to-policies"
                  type="checkbox"
                  {...register("agreeToPolicies")}
                  aria-label="Agree to policies"
                  className="absolute inset-0 appearance-none focus:outline-hidden"
                />
              </div>
            </div>
            <div>
              <label htmlFor="agree-to-policies" className="text-sm/6 text-gray-400">
                Ao selecionar isso, você concorda com nossa{' '}
                <a href="#" className="font-semibold whitespace-nowrap text-[#00FF00]">
                  Política de Privacidade
                </a>
                .
              </label>
              {errors.agreeToPolicies && <p className="mt-1 text-sm text-red-400">{errors.agreeToPolicies.message}</p>}
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full cursor-pointer rounded-md bg-[#00FF00] px-3.5 py-2.5 text-center text-sm font-semibold text-black shadow-xs hover:bg-[#0a7a0a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            {isSubmitting ? 'Enviando Cadastro...' : 'Enviar Cadastro'}
          </button>
        </div>
      </form>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-bottom-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[72.1875rem] max-w-none -translate-x-1/2 -rotate-30 bg-gradient-to-tr from-[#00FF00] to-[#12bd12] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
    </div>
  )
}
