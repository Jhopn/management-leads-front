"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { apiClient } from '@/services';
import { z } from 'zod';
import { Modal } from '@/components/modal/modal';
import { LeadFormModal } from '@/components/lead-modal/lead';

const leadSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    telephone: z.string(),
    position: z.string(),
    dateBirth: z.string(),
    message: z.string(),
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

const leadFormDataSchema = leadSchema.pick({
    name: true,
    email: true,
    telephone: true,
    position: true,
    dateBirth: true,
    message: true,
});

export type Lead = z.infer<typeof leadSchema>;
export type LeadFormData = z.infer<typeof leadFormDataSchema>;

// --- ÍCONES SVG COMO COMPONENTES ---
const ViewIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>;
const EditIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>;
const DeleteIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>;


export default function Dashboard() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [view, setView] = useState<'list' | 'details'>('list');
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [isLeadModalOpen, setIsLeadModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [leadToEdit, setLeadToEdit] = useState<Lead | null>(null);
    const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);

    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');

    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 1;
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
            setCurrentPage(1); // Reseta para a página 1 ao fazer uma nova busca
        }, 500); // Atraso de 500ms

        return () => {
            clearTimeout(timerId);
        };
    }, [searchTerm]);

    // --- EFEITO PARA BUSCAR DADOS DA API (PAGINADO) ---
    useEffect(() => {
        const fetchLeads = async () => {
            try {
                setError(null);
                setIsLoading(true);

                const params = new URLSearchParams({
                    page: String(currentPage),
                    pageSize: String(itemsPerPage),
                });

                if (debouncedSearchTerm) {
                    params.append('search', debouncedSearchTerm); // Supondo que o parâmetro de busca seja 'search'
                }

                const response = await apiClient.get(`/leads?${params.toString()}`);

                setLeads(response.data.leads || []);
                setTotalPages(response.data.totalPages)

            } catch (err) {
                console.error("Falha ao buscar leads:", err);
                setError("Não foi possível carregar os leads. Tente novamente mais tarde.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchLeads();
    }, [currentPage, itemsPerPage, debouncedSearchTerm]); // Re-executa ao mudar de página ou busca

    // --- LÓGICA DE PAGINAÇÃO ---
    const indexOfFirstLead = (currentPage - 1) * itemsPerPage;

    // --- LÓGICA DE FILTRO ---
    const filteredLeads = useMemo(() =>
        leads.filter(lead =>
            lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.email.toLowerCase().includes(searchTerm.toLowerCase())
        ), [leads, searchTerm]
    );

    // --- MANIPULADORES DE EVENTOS ---
    const handleOpenLeadModal = (lead: Lead | null = null) => {
        setLeadToEdit(lead);
        setIsLeadModalOpen(true);
    };

    const handleCloseLeadModal = () => {
        setIsLeadModalOpen(false);
        setLeadToEdit(null);
    };

    const handleOpenDeleteModal = (lead: Lead) => {
        setLeadToDelete(lead);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setLeadToDelete(null);
    };

    const handleViewDetails = (lead: Lead) => {
        setSelectedLead(lead);
        setView('details');
    };

    const handleSaveLead = async (formData: LeadFormData) => {
        const validatedData = leadFormDataSchema.safeParse(formData);
        if (!validatedData.success) {
            console.error("Dados do formulário inválidos:", validatedData.error);
            return;
        }

        try {
            if (leadToEdit) {
                // Edição
                const response = await apiClient.patch(`/leads/${leadToEdit.id}`, validatedData.data);
                setLeads(leads.map(lead => lead.id === leadToEdit.id ? response.data : lead));
            } else {
                // Criação
                const response = await apiClient.post('/leads', validatedData.data);
                setLeads([response.data, ...leads]);
            }
        } catch (apiError) {
            console.error("Falha ao salvar lead:", apiError);
            // Idealmente, mostrar um toast/notificação de erro para o usuário
        }

        handleCloseLeadModal();
    };

    const handleConfirmDelete = async () => {
        if (!leadToDelete) return;

        try {
            await apiClient.delete(`/leads/${leadToDelete.id}`);
            // Atualização otimista da UI
            setLeads(leads.filter(lead => lead.id !== leadToDelete.id));
        } catch (apiError) {
            console.error("Falha ao deletar lead:", apiError);
            // Mostrar notificação de erro
        }
        handleCloseDeleteModal();
    };

    const downloadFile = (content: string, fileName: string, mimeType: string) => {
        const a = document.createElement('a');
        const blob = new Blob([content], { type: mimeType });
        a.href = URL.createObjectURL(blob);
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
    };

    const handleExportCsv = () => {
        const headers = ['ID', 'Nome', 'Email', 'Telefone', 'Cargo', 'Data de Nascimento', 'Mensagem', 'Data de Criação', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];
        const rows = leads.map(lead => [
            `"${lead.id}"`, `"${lead.name}"`, `"${lead.email}"`, `"${lead.telephone}"`, `"${lead.position}"`, `"${lead.dateBirth}"`, `"${lead.message.replace(/"/g, '""')}"`, `"${lead.createdAt}"`,
            lead.utm_source || '', lead.utm_medium || '', lead.utm_campaign || '', lead.utm_term || '', lead.utm_content || '', lead.gclid || '', lead.fbclid || '',
        ].join(','));
        const csvContent = [headers.join(','), ...rows].join('\n');
        downloadFile(csvContent, 'leads.csv', 'text/csv;charset=utf-8;');
    };

    // --- RENDERIZAÇÃO ---
    return (
        <div className="min-h-screen bg-transparent text-gray-800 font-sans">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">Painel de Leads</h2>
                <p className="mt-2 text-lg/8 text-gray-400">Gerencie os leads capturados.</p>
            </div>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {view === 'list' && (
                    <>
                        <div>
                            <div className="px-4 py-5 sm:p-6 rounded-t-lg shadow">
                                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                                    <div className="w-full md:w-1/2">
                                        <input type="text" placeholder="Buscar por nome ou e-mail..." className="block w-full px-3 py-2 border bg-white/5 border-gray-700 rounded-md shadow-sm placeholder:text-white focus:outline-none focus:border-[#00FF00] sm:text-sm" value={searchTerm} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}></input>
                                    </div>
                                    <div className="flex space-x-3">
                                        <button onClick={handleExportCsv} className="inline-flex items-center justify-center px-4 py-2 border outline-white/10 placeholder:text-gray-500  rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">Exportar CSV</button>
                                        <button onClick={() => handleOpenLeadModal()} className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-[#00FF00] hover:bg-[#0a7a0a] hover:text-white cursor-pointer">Adicionar Lead</button>
                                    </div>
                                </div>
                            </div>
                            <div className="overflow-x-auto shadow rounded-b-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E-mail</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
                                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Ações</span></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {isLoading ? (
                                            <tr><td colSpan={4} className="text-center py-10 text-gray-500">Carregando...</td></tr>
                                        ) : error ? (
                                            <tr><td colSpan={4} className="text-center py-10 text-red-500">{error}</td></tr>
                                        ) : filteredLeads.length > 0 ? filteredLeads.map(lead => (
                                            <tr key={lead.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lead.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.telephone}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                    <button onClick={() => handleViewDetails(lead)} className="text-[#00FF00] hover:text-[#0a7a0a]" title="Visualizar Detalhes"><ViewIcon /></button>
                                                    <button onClick={() => handleOpenLeadModal(lead)} className="text-yellow-600 hover:text-yellow-900" title="Editar Lead"><EditIcon /></button>
                                                    <button onClick={() => handleOpenDeleteModal(lead)} className="text-red-600 hover:text-red-900" title="Excluir Lead"><DeleteIcon /></button>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan={4} className="text-center py-10 text-gray-500">Nenhum lead encontrado.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-b-lg">
                                <div className="flex flex-1 justify-between sm:hidden">
                                    <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50">Anterior</button>
                                    <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50">Próximo</button>
                                </div>
                                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Mostrando <span className="font-medium">{indexOfFirstLead + 1}</span> a <span className="font-medium">{indexOfFirstLead + leads.length}</span> de <span className="font-medium">{totalPages}</span> resultados
                                        </p>
                                    </div>
                                    <div>
                                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50">
                                                <span className="sr-only">Anterior</span>
                                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" /></svg>
                                            </button>
                                            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50">
                                                <span className="sr-only">Próximo</span>
                                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" /></svg>
                                            </button>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {view === 'details' && selectedLead && (
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
                            <div>
                                <h3 className="text-2xl leading-6 font-bold text-gray-900">{selectedLead.name}</h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">{selectedLead.position}</p>
                            </div>
                            <button onClick={() => setView('list')} className="inline-flex items-center px-4 py-2 border outline-white/10 placeholder:text-gray-500  rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Voltar</button>
                        </div>
                        <div className="px-4 py-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <div>
                                <h4 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Informações do Lead</h4>
                                <dl className="space-y-4">
                                    <div className="grid grid-cols-3 gap-4"><dt className="text-sm font-medium text-gray-500">E-mail</dt><dd className="mt-1 text-sm text-gray-900 col-span-2">{selectedLead.email}</dd></div>
                                    <div className="grid grid-cols-3 gap-4"><dt className="text-sm font-medium text-gray-500">Telefone</dt><dd className="mt-1 text-sm text-gray-900 col-span-2">{selectedLead.telephone}</dd></div>
                                    <div className="grid grid-cols-3 gap-4"><dt className="text-sm font-medium text-gray-500">Data de Nasc.</dt><dd className="mt-1 text-sm text-gray-900 col-span-2">{new Date(selectedLead.dateBirth).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</dd></div>
                                    <div className="grid grid-cols-3 gap-4"><dt className="text-sm font-medium text-gray-500">Mensagem</dt><dd className="mt-1 text-sm text-gray-900 col-span-2 whitespace-pre-wrap">{selectedLead.message}</dd></div>
                                </dl>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Dados de Tracking</h4>
                                <dl className="space-y-4">
                                    {Object.entries({ utm_source: selectedLead.utm_source, utm_medium: selectedLead.utm_medium, utm_campaign: selectedLead.utm_campaign, utm_term: selectedLead.utm_term, utm_content: selectedLead.utm_content, gclid: selectedLead.gclid, fbclid: selectedLead.fbclid }).filter(([, value]) => value).length > 0 ?
                                        Object.entries({ utm_source: selectedLead.utm_source, utm_medium: selectedLead.utm_medium, utm_campaign: selectedLead.utm_campaign, utm_term: selectedLead.utm_term, utm_content: selectedLead.utm_content, gclid: selectedLead.gclid, fbclid: selectedLead.fbclid }).map(([key, value]) => value && (
                                            <div key={key} className="grid grid-cols-3 gap-4"><dt className="text-sm font-medium text-gray-500">{key}</dt><dd className="mt-1 text-sm text-gray-900 col-span-2 break-all">{value}</dd></div>
                                        )) : <p className="text-sm text-gray-500">Nenhum dado de tracking disponível.</p>}
                                </dl>
                            </div>
                        </div>
                    </div>
                )}
            </main>


            <LeadFormModal isOpen={isLeadModalOpen} onClose={handleCloseLeadModal} onSave={handleSaveLead} lead={leadToEdit} />

            <Modal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
                <h3 className="text-lg font-semibold text-white">Confirmar Exclusão</h3>
                <p className="mt-2 text-sm text-white">
                    {`Você tem certeza que deseja excluir o lead "${leadToDelete?.name}"? Esta ação não pode ser desfeita.`}
                </p>
                <div className="mt-6 flex justify-end space-x-3">
                    <button onClick={handleCloseDeleteModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 cursor-pointer">Cancelar</button>
                    <button onClick={handleConfirmDelete} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 cursor-pointer">Excluir</button>
                </div>
            </Modal>
        </div>
    );
}
