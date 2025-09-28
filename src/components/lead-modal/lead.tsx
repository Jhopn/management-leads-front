import { Lead, LeadFormData } from "@/app/(private_pages)/dashboard/page";
import { useEffect, useState } from "react";
import { Modal } from "../modal/modal";

interface LeadFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (formData: LeadFormData) => void;
    lead: Lead | null;
}

export const LeadFormModal: React.FC<LeadFormModalProps> = ({ isOpen, onClose, onSave, lead }) => {
    const [formData, setFormData] = useState<LeadFormData>({ name: '', email: '', telephone: '', position: '', dateBirth: '', message: '' });

    useEffect(() => {
        if (lead) {
            const formattedDate = lead.dateBirth ? lead.dateBirth.split('T')[0] : '';
            setFormData({ name: lead.name, email: lead.email, telephone: lead.telephone, position: lead.position, dateBirth: formattedDate, message: lead.message });
        } else {
            setFormData({ name: '', email: '', telephone: '', position: '', dateBirth: '', message: '' });
        }
    }, [lead, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <h3 className="text-xl font-semibold mb-4 text-white">{lead ? 'Editar Lead' : 'Adicionar Novo Lead'}</h3>
                <div className="space-y-4 h-96 overflow-y-auto pr-2 ">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-white">Nome Completo</label>
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-white/5 text-white rounded-md shadow-sm  focus:outline-none focus:border-[#00FF00]" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white">E-mail</label>
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-white/5 text-white rounded-md shadow-sm  focus:outline-none focus:border-[#00FF00]" />
                    </div>
                    <div>
                        <label htmlFor="telephone" className="block text-sm font-medium text-white">Telefone</label>
                        <input type="tel" name="telephone" id="telephone" value={formData.telephone} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-white/5 text-white rounded-md shadow-sm  focus:outline-none focus:border-[#00FF00]" />
                    </div>
                    <div>
                        <label htmlFor="position" className="block text-sm font-medium text-white">Cargo</label>
                        <input type="text" name="position" id="position" value={formData.position} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-white/5 text-white rounded-md shadow-sm  focus:outline-none focus:border-[#00FF00]" />
                    </div>
                    <div>
                        <label htmlFor="dateBirth" className="block text-sm font-medium text-white">Data de Nascimento</label>
                        <input type="date" name="dateBirth" id="dateBirth" value={formData.dateBirth} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-white/5 text-white rounded-md shadow-sm  focus:outline-none focus:border-[#00FF00]" />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-white">Mensagem</label>
                        <textarea name="message" id="message" value={formData.message} onChange={handleChange} required rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-white/5 text-white rounded-md shadow-sm  focus:outline-none focus:border-[#00FF00]" />
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

