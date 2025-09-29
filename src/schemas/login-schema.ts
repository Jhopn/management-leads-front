import { z } from "zod";

export type LoginForm = z.infer<typeof loginSchema>;

export const loginSchema = z.object({
  email: z.string().email("Informe um e-mail válido."),
  password: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres.").max(80),
});