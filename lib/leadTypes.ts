// lib/leadTypes.ts
export type LeadStatus = "Novo" | "Qualificando" | "Agendado" | "Cliente" | "Perdido";

export interface Lead {
  id: string;
  nome: string;
  empresa?: string;
  whatsapp: string;
  faturamento?: string;
  leadsSemana?: string;
  investimento?: string;
  status: LeadStatus;
  ultimaAtividade?: string;
  origem?: string;
  tags?: string[];
  observacoes?: string;
}
