import { LoginForm, loginSchema } from "@/schemas/login-schema";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";


export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<Partial<LoginForm>>({});
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setLoginError(null);

    const validationResult = loginSchema.safeParse({ email, password });
    if (!validationResult.success) {
      setIsSubmitting(false);
      const fieldErrors: { [key: string]: string } = {};
      for (const issue of validationResult.error.issues) {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as string] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    try {
      const result = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });

      if (result?.error) {
        setIsSubmitting(false);
        setLoginError("Credenciais inválidas. Verifique seu e-mail e senha.");
        return;
      }
      setIsSubmitting(false);
      toast.success("Login realizado com sucesso!");
      router.push("/dashboard");
    } catch (error) {
      setIsSubmitting(false);
      setLoginError("Ocorreu um erro inesperado. Tente novamente.");
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-28 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[72.1875rem] max-w-none -translate-x-1/2 -rotate-30 bg-gradient-to-tr from-[#00FF00] to-[#12bd12] opacity-30 sm:left-[calc(50%+50rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">Acesso Restrito</h2>
          <p className="mt-2 text-lg/8 text-gray-400">Faça login para gerenciar os leads!</p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                Endereço de Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#00FF00] sm:text-sm/6"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                  Senha
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-[#00FF00] hover:text-[#0a7a0a]">
                    Esqueceu sua senha?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#00FF00] sm:text-sm/6"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                {errors.password && <p className="mt-2 text-sm text-red-400">{errors.password}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex cursor-pointer w-full justify-center rounded-md bg-[#00FF00] px-3 py-1.5 text-sm/6 font-semibold text-black hover:bg-[#0a7a0a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                {isSubmitting ? 'Entrando...' : 'Entrar'}
              </button>
            </div>
            {loginError && <p className="mt-2 text-sm text-red-400 text-center">{loginError}</p>}
          </form>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-bottom-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[72.1875rem] max-w-none -translate-x-1/2 rotate-40 bg-gradient-to-tr from-[#00FF00] to-[#12bd12] opacity-30 sm:left-[calc(50%-55rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </>
  )
}