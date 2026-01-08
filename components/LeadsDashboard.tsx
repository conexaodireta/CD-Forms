// components/LeadsDashboard.tsx
"use client";

import { useMemo, useState } from "react";
import { useLeads } from "@/components/leads/LeadsContext";
import type { LeadStatus, Lead } from "@/lib/leadTypes";

type FilterStatus = LeadStatus | "Todos";

const STATUS_OPTIONS: FilterStatus[] = [
  "Todos",
  "Novo",
  "Qualificando",
  "Agendado",
  "Cliente",
  "Perdido",
];

export default function LeadsDashboard() {
  const { leads } = useLeads();

  const [statusFiltro, setStatusFiltro] = useState<FilterStatus>("Todos");
  const [busca, setBusca] = useState("");
  const [leadSelecionadoId, setLeadSelecionadoId] = useState<
    string | undefined
  >(leads[0]?.id);

  const leadsFiltrados = useMemo(() => {
    return leads.filter((lead) => {
      const matchStatus =
        statusFiltro === "Todos" ? true : lead.status === statusFiltro;

      const query = busca.toLowerCase().trim();
      const matchBusca =
        query.length === 0
          ? true
          : [
              lead.nome,
              lead.empresa,
              lead.whatsapp,
              lead.faturamento,
              lead.leadsSemana,
              lead.investimento,
              lead.origem,
            ]
              .filter(Boolean)
              .some((field) => field!.toLowerCase().includes(query));

      return matchStatus && matchBusca;
    });
  }, [leads, statusFiltro, busca]);

  const leadSelecionado: Lead | undefined =
    leadsFiltrados.find((l) => l.id === leadSelecionadoId) ||
    leadsFiltrados[0];

  if (!leads.length) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-300">
        Nenhum lead encontrado.
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex flex-col md:flex-row gap-6 text-slate-50">
      {/* Lista / filtros */}
      <section className="md:w-[55%] space-y-4">
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map((status) => {
            const isActive = statusFiltro === status;
            return (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFiltro(status)}
                className={
                  "px-3 py-1.5 rounded-full text-xs font-medium border transition " +
                  (isActive
                    ? "bg-emerald-500 text-slate-950 border-emerald-500"
                    : "bg-slate-900/70 text-slate-300 border-slate-700 hover:bg-slate-900")
                }
              >
                {status}
              </button>
            );
          })}
        </div>

        <div className="relative">
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome, empresa, WhatsApp, faturamento..."
            className="w-full rounded-xl bg-slate-900/80 border border-slate-700 px-3 py-2 text-xs text-slate-50 placeholder-slate-500 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/40 transition"
          />
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-slate-900/80 text-slate-400">
              <tr className="text-left">
                <th className="px-4 py-2 font-medium">Lead</th>
                <th className="px-4 py-2 font-medium">Faturamento</th>
                <th className="px-4 py-2 font-medium">Leads/semana</th>
                <th className="px-4 py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {leadsFiltrados.map((lead) => {
                const isSelected = leadSelecionado?.id === lead.id;
                return (
                  <tr
                    key={lead.id}
                    className={
                      "cursor-pointer border-t border-slate-800/70 hover:bg-slate-900/70 " +
                      (isSelected ? "bg-slate-900" : "")
                    }
                    onClick={() => setLeadSelecionadoId(lead.id)}
                  >
                    <td className="px-4 py-3 align-top">
                      <div className="font-semibold text-slate-50">
                        {lead.nome}
                      </div>
                      {lead.empresa && (
                        <div className="text-[11px] text-slate-400">
                          {lead.empresa}
                        </div>
                      )}
                      <div className="text-[11px] text-slate-500 mt-1">
                        {lead.whatsapp}
                      </div>
                    </td>
                    <td className="px-4 py-3 align-top text-slate-200">
                      {lead.faturamento || "-"}
                    </td>
                    <td className="px-4 py-3 align-top text-slate-200">
                      {lead.leadsSemana || "-"}
                    </td>
                    <td className="px-4 py-3 align-top">
                      <span className="inline-flex rounded-full bg-slate-900 px-2 py-1 text-[11px] text-slate-200 border border-slate-700">
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {leadsFiltrados.length === 0 && (
            <div className="p-6 text-center text-sm text-slate-400">
              Nenhum lead encontrado com os filtros atuais.
            </div>
          )}
        </div>
      </section>

      {/* Detalhes do lead selecionado */}
      <section className="md:w-[45%]">
        {leadSelecionado ? (
          <div className="h-full rounded-2xl border border-slate-800 bg-slate-950/90 p-5 flex flex-col gap-4">
            <div>
              <p className="text-xs text-slate-400 mb-1">Lead selecionado</p>
              <h2 className="text-lg font-semibold text-slate-50">
                {leadSelecionado.nome}
              </h2>
              {leadSelecionado.empresa && (
                <p className="text-sm text-slate-400">
                  {leadSelecionado.empresa}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <InfoBlock
                label="WhatsApp"
                value={leadSelecionado.whatsapp}
              />
              <InfoBlock
                label="Faturamento"
                value={leadSelecionado.faturamento || "-"}
              />
              <InfoBlock
                label="Leads/semana"
                value={leadSelecionado.leadsSemana || "-"}
              />
              <InfoBlock
                label="Investimento"
                value={leadSelecionado.investimento || "-"}
              />
              <InfoBlock
                label="Status"
                value={leadSelecionado.status}
              />
              <InfoBlock
                label="Origem"
                value={leadSelecionado.origem || "-"}
              />
            </div>

            {leadSelecionado.tags?.length ? (
              <div className="space-y-2">
                <p className="text-xs text-slate-400">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {leadSelecionado.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-full bg-slate-900 text-[11px] text-slate-200 border border-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {leadSelecionado.observacoes && (
              <div className="space-y-2">
                <p className="text-xs text-slate-400">Resumo / contexto</p>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {leadSelecionado.observacoes}
                </p>
              </div>
            )}

            {leadSelecionado.ultimaAtividade && (
              <p className="mt-auto text-[11px] text-slate-500">
                Última atividade: {leadSelecionado.ultimaAtividade}
              </p>
            )}
          </div>
        ) : (
          <div className="h-full rounded-2xl border border-dashed border-slate-800/80 bg-slate-950/70 flex items-center justify-center text-sm text-slate-400">
            Selecione um lead na lista para ver detalhes.
          </div>
        )}
      </section>
    </div>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[11px] text-slate-500">{label}</p>
      <p className="text-xs text-slate-200 font-medium">{value}</p>
    </div>
  );
}
