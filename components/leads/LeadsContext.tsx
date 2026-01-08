// components/leads/LeadsContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Lead, LeadStatus } from "@/lib/leadTypes";

const STORAGE_KEY = "cd-followup-leads";

const DEFAULT_LEADS: Lead[] = [
  {
    id: "1",
    nome: "Ana Souza",
    empresa: "Studio Fit Premium",
    whatsapp: "+55 11 99999-0001",
    faturamento: "50–100k/mês",
    leadsSemana: "500–1000",
    investimento: "1k–4.9k",
    status: "Agendado",
    ultimaAtividade: "Hoje • Enviou áudio de dúvidas",
    origem: "Typebot • Funil IA WhatsApp",
    tags: ["Alto potencial", "Academia", "IA no atendimento"],
    observacoes:
      "Quer automatizar pré-venda e follow up de alunos que pedem preços no WhatsApp. Já marcou reunião para entender integrações com CRM.",
  },
  {
    id: "2",
    nome: "Bruno Lima",
    empresa: "Clínica Odonto Lima",
    whatsapp: "+55 21 98888-1002",
    faturamento: "20–50k/mês",
    leadsSemana: "Menos de 500",
    investimento: "1k–4.9k",
    status: "Qualificando",
    ultimaAtividade: "Ontem • Respondeu formulário Typebot",
    origem: "Typebot • Anúncio Instagram",
    tags: ["Saúde", "Agendamentos", "Funil simples"],
    observacoes:
      "Atende principalmente por WhatsApp, quer reduzir furos de agenda e implementar lembretes automáticos.",
  },
  {
    id: "3",
    nome: "Carla Ribeiro",
    empresa: "Loja Online CR Style",
    whatsapp: "+55 85 97777-2303",
    faturamento: "100–500k/mês",
    leadsSemana: "2k–5k",
    investimento: "5k–10k",
    status: "Novo",
    ultimaAtividade: "2 horas atrás • Conversou com bot",
    origem: "Typebot • Tráfego pago",
    tags: ["E-commerce", "Volume alto", "Carrinho abandonado"],
    observacoes:
      "Quer IA para suporte e recuperação de carrinho abandonado. Nunca usou chatbot antes, precisa de explicação mais guiada.",
  },
];

interface LeadsContextValue {
  leads: Lead[];
  addLead: (lead: Lead) => void;
  updateLead: (id: string, patch: Partial<Lead>) => void;
  removeLead: (id: string) => void;
  setStatus: (id: string, status: LeadStatus) => void;
}

const LeadsContext = createContext<LeadsContextValue | undefined>(undefined);

export function LeadsProvider({ children }: { children: React.ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>(DEFAULT_LEADS);

  // Carrega do localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Lead[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setLeads(parsed);
        }
      }
    } catch (e) {
      console.error("Erro ao ler leads do localStorage", e);
    }
  }, []);

  // Salva no localStorage sempre que mudar
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    } catch (e) {
      console.error("Erro ao salvar leads no localStorage", e);
    }
  }, [leads]);

  const addLead = (lead: Lead) => {
    setLeads((prev) => [lead, ...prev]);
  };

  const updateLead = (id: string, patch: Partial<Lead>) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, ...patch } : lead))
    );
  };

  const removeLead = (id: string) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
  };

  const setStatus = (id: string, status: LeadStatus) => {
    updateLead(id, { status });
  };

  const value: LeadsContextValue = {
    leads,
    addLead,
    updateLead,
    removeLead,
    setStatus,
  };

  return <LeadsContext.Provider value={value}>{children}</LeadsContext.Provider>;
}

export function useLeads(): LeadsContextValue {
  const ctx = useContext(LeadsContext);
  if (!ctx) {
    throw new Error("useLeads deve ser usado dentro de LeadsProvider");
  }
  return ctx;
}
