// Supondo que seus tipos e schemas estão em um arquivo, por exemplo: '@/lib/schemas'
import { Lead, LeadFormData, leadFormDataSchema } from "@/app/(private_pages)/dashboard/page";
import { useEffect, useState } from "react";
import { Modal } from "../modal/modal";

// Tipo auxiliar para armazenar os erros formatados
type FormErrors = Partial<Record<keyof LeadFormData, string>>;

interface LeadFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (formData: LeadFormData) => void;
    lead: Lead | null;
}

export const LeadFormModal: React.FC<LeadFormModalProps> = ({ isOpen, onClose, onSave, lead }) => {
    const [formData, setFormData] = useState<LeadFormData>({ name: '', email: '', telephone: '', position: '', dateBirth: '', message: '' });
    // 1. Adicionar estado para os erros de validação
    const [errors, setErrors] = useState<FormErrors>({});

    useEffect(() => {
        if (isOpen) {
            if (lead) {
                const formattedDate = lead.dateBirth ? new Date(lead.dateBirth).toISOString().split('T')[0] : '';
                setFormData({ name: lead.name, email: lead.email, telephone: lead.telephone, position: lead.position, dateBirth: formattedDate, message: lead.message });
            } else {
                setFormData({ name: '', email: '', telephone: '', position: '', dateBirth: '', message: '' });
            }
            // Limpar os erros quando o modal for aberto
            setErrors({});
        }
    }, [lead, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Opcional: Limpar o erro do campo ao ser modificado para melhor UX
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({}); // Limpa erros antigos

        // 2. Validar os dados do formulário com o schema Zod importado
        const validationResult = leadFormDataSchema.safeParse(formData);

        if (!validationResult.success) {
            // Se a validação falhar, formata e atualiza o estado de erros
            const formattedErrors: FormErrors = {};
            for (const issue of validationResult.error.issues) {
                // Pega o nome do campo e a mensagem de erro
                const fieldName = issue.path[0] as keyof LeadFormData;
                formattedErrors[fieldName] = issue.message;
            }
            setErrors(formattedErrors);
            return; // Impede o envio do formulário
        }
        
        // Se a validação for bem-sucedida, chama onSave com os dados seguros
        onSave(validationResult.data);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} noValidate> {/* noValidate impede a validação HTML padrão */}
                <h3 className="text-xl font-semibold mb-4 text-white">{lead ? 'Editar Lead' : 'Adicionar Novo Lead'}</h3>
                <div className="space-y-4 h-96 overflow-y-auto pr-2 ">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-white">Nome Completo</label>
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-white/5 text-white rounded-md shadow-sm  focus:outline-none focus:border-[#00FF00]" />
                        {/* 3. Exibir a mensagem de erro para o campo 'name' */}
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white">E-mail</label>
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-white/5 text-white rounded-md shadow-sm  focus:outline-none focus:border-[#00FF00]" />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="telephone" className="block text-sm font-medium text-white">Telefone</label>
                        <input type="tel" name="telephone" id="telephone" value={formData.telephone} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-white/5 text-white rounded-md shadow-sm  focus:outline-none focus:border-[#00FF00]" />
                        {errors.telephone && <p className="text-red-500 text-xs mt-1">{errors.telephone}</p>}
                    </div>
                    <div>
                        <label htmlFor="position" className="block text-sm font-medium text-white">Cargo</label>
                        <input type="text" name="position" id="position" value={formData.position} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-white/5 text-white rounded-md shadow-sm  focus:outline-none focus:border-[#00FF00]" />
                        {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
                    </div>
                    <div>
                        <label htmlFor="dateBirth" className="block text-sm font-medium text-white">Data de Nascimento</label>
                        <input type="date" name="dateBirth" id="dateBirth" value={formData.dateBirth} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-white/5 text-white rounded-md shadow-sm  focus:outline-none focus:border-[#00FF00]" />
                        {errors.dateBirth && <p className="text-red-500 text-xs mt-1">{errors.dateBirth}</p>}
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-white">Mensagem</label>
                        <textarea name="message" id="message" value={formData.message} onChange={handleChange} required rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-white/5 text-white rounded-md shadow-sm  focus:outline-none focus:border-[#00FF00]" />
                        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 cursor-pointer">Cancelar</button>
                    <button type="submit" className="px-4 py-2 bg-[#00FF00] text-black rounded-md hover:bg-[#0a7a0a] hover:text-white cursor-pointer">Salvar</button>
                </div>
            </form>
        </Modal>
    );
};