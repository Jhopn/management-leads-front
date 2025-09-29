import { z } from "zod";

const brazilianPhoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;

export const createLeadSchema = z.object({
  name: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres." }),
  email: z.string().email({ message: "Formato de e-mail inválido." }),
  telephone: z.string().regex(brazilianPhoneRegex, { message: "Formato de telefone inválido. Use (99) 99999-9999." }),
  position: z.string().min(2, { message: "O cargo é obrigatório." }),
  dateBirth: z.coerce.date(
    "Data de nascimento inválida!"
  ).refine(birthDate => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
    return age >= 16;
  }, { message: "Você deve ter pelo menos 16 anos." }),
  message: z.string().min(5, { message: "A mensagem deve ter pelo menos 5 caracteres." }),
  agreeToPolicies: z.boolean().refine(val => val === true, {
    message: "Você deve concordar com a política de privacidade."
  }),
});

export type CreateLeadForm = z.infer<typeof createLeadSchema>;


export const leadSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "O nome é obrigatório."),
  email: z.string().min(1, "O e-mail é obrigatório.").email("Formato de e-mail inválido."),
  telephone: z.string().regex(brazilianPhoneRegex, { message: "Formato de telefone inválido. Use (99) 99999-9999." }),
  position: z.string().min(1, "O cargo é obrigatório."),
  dateBirth: z.string(), 
  message: z.string().min(10, { message: "A mensagem deve ter no mínimo 10 caracteres." }),
  utm_source: z.string().nullable().optional(),
  utm_medium: z.string().nullable().optional(),
  utm_campaign: z.string().nullable().optional(),
  utm_term: z.string().nullable().optional(),
  utm_content: z.string().nullable().optional(),
  gclid: z.string().nullable().optional(),
  fbclid: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdById: z.string().uuid().nullable().optional(),
});

export type Lead = z.infer<typeof leadSchema>;

export const leadFormDataSchema = leadSchema.pick({
  name: true,
  email: true,
  telephone: true,
  position: true,
  dateBirth: true,
  message: true,
});

export type LeadFormData = z.infer<typeof leadFormDataSchema>;

export type FormErrors = Partial<Record<keyof LeadFormData, string>>;

export interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: LeadFormData) => void;
  lead: Lead | null;
}
