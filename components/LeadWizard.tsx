"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLeads } from "@/components/leads/LeadsContext";
import type { Lead } from "@/lib/leadTypes";
import {
  createLeadWizardTranslator,
  LeadWizardLocale,
  LeadWizardMessageKey,
} from "@/lib/i18n/leadwizardMessages";

// CREDENCIAIS VÁLIDAS (ainda não usadas aqui, mantidas para futuro uso)
const VALID_EMAIL = process.env.VALID_EMAIL;
const VALID_PASSWORD = process.env.VALID_PASSWORD;

// TIPOS BASE
type PosicaoAtual = "dono" | "funcionario" | "iniciando" | null;
type FaturamentoFaixa =
  | "menos-20"
  | "20-50"
  | "50-100"
  | "100-500"
  | "500-1000"
  | "mais-1000"
  | null;

type LeadsFaixa =
  | "menos-500"
  | "500-1000"
  | "1000-2000"
  | "2000-5000"
  | "5000-10000"
  | "mais-10000"
  | null;

type Step =
  | "nome"
  | "whatsapp"
  | "posicao"
  | "site"
  | "faturamento"
  | "leadsSemana"
  | "investimentoIniciando"
  | "contatoResponsavel"
  | "resumo";

interface LeadQualificacao {
  nome: string;
  whatsapp: string;
  posicao: PosicaoAtual;
  siteInstagram: string;
  faturamento: FaturamentoFaixa;
  leadsSemana: LeadsFaixa;
  investimento: string;
  contatoResponsavelWhatsapp: string;
}

const stepOrder: Record<Step, number> = {
  nome: 0,
  whatsapp: 1,
  posicao: 2,
  site: 3,
  faturamento: 4,
  leadsSemana: 5,
  investimentoIniciando: 6,
  contatoResponsavel: 7,
  resumo: 8,
};
const TOTAL_STEPS = Object.keys(stepOrder).length;

// Mapeia faixas -> keys de mensagem (sem texto aqui)
const faturamentoKeyMap: Record<
  NonNullable<FaturamentoFaixa>,
  LeadWizardMessageKey
> = {
  "menos-20": "leadwizard.faturamento.menos20",
  "20-50": "leadwizard.faturamento.20_50",
  "50-100": "leadwizard.faturamento.50_100",
  "100-500": "leadwizard.faturamento.100_500",
  "500-1000": "leadwizard.faturamento.500_1000",
  "mais-1000": "leadwizard.faturamento.mais1000",
};

const leadsKeyMap: Record<NonNullable<LeadsFaixa>, LeadWizardMessageKey> = {
  "menos-500": "leadwizard.leads.menos500",
  "500-1000": "leadwizard.leads.500_1000",
  "1000-2000": "leadwizard.leads.1000_2000",
  "2000-5000": "leadwizard.leads.2000_5000",
  "5000-10000": "leadwizard.leads.5000_10000",
  "mais-10000": "leadwizard.leads.mais10000",
};

const posicaoKeyMap: Record<
  Exclude<PosicaoAtual, null>,
  LeadWizardMessageKey
> = {
  dono: "leadwizard.posicao.dono",
  funcionario: "leadwizard.posicao.funcionario",
  iniciando: "leadwizard.posicao.iniciando",
};

function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

export default function LeadWizard() {
  const router = useRouter();
  const { addLead } = useLeads();

  // Locale: começa em "en" e ajusta depois com detecção/browser + localStorage
  const [locale, setLocale] = useState<LeadWizardLocale>("en");
  const t = createLeadWizardTranslator(locale);

  const [step, setStep] = useState<Step>("nome");
  const [data, setData] = useState<LeadQualificacao>({
    nome: "",
    whatsapp: "",
    posicao: null,
    siteInstagram: "",
    faturamento: null,
    leadsSemana: null,
    investimento: "",
    contatoResponsavelWhatsapp: "",
  });

  const [errors, setErrors] = useState<{
    whatsapp?: string;
    contatoResponsavelWhatsapp?: string;
  }>({});

  // Detecção automática de idioma + persistência em localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1) Tenta usar o que o usuário escolheu anteriormente
    const stored = window.localStorage.getItem(
      "leadwizard.locale"
    ) as LeadWizardLocale | null;

    if (stored === "pt" || stored === "en") {
      setLocale(stored);
      return;
    }

    // 2) Se não houver nada salvo, detecta pelo navegador/dispositivo
    const browserLang =
      navigator.language ||
      (navigator as any).userLanguage ||
      "en";
    const normalized = browserLang.toLowerCase();

    const detected: LeadWizardLocale = normalized.startsWith("pt")
      ? "pt"
      : "en";

    setLocale(detected);
  }, []);

  // Sempre que o usuário mudar manualmente o idioma, persistimos
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("leadwizard.locale", locale);
  }, [locale]);

  const handleChange = (
    field: keyof LeadQualificacao,
    value: string
  ) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNextFromNome = () => {
    if (!data.nome.trim()) return;
    setStep("whatsapp");
  };

  const handleNextFromWhatsapp = () => {
    if (!data.whatsapp.trim()) return;

    if (!isValidPhone(data.whatsapp)) {
      setErrors((prev) => ({
        ...prev,
        whatsapp: t("leadwizard.errors.whatsapp.invalid"),
      }));
      return;
    }

    setErrors((prev) => ({ ...prev, whatsapp: undefined }));
    setStep("posicao");
  };

  const handleSelectPosicao = (posicao: PosicaoAtual) => {
    setData((prev) => ({ ...prev, posicao }));

    if (posicao === "dono") {
      setStep("site");
    } else if (posicao === "funcionario") {
      setStep("contatoResponsavel");
    } else if (posicao === "iniciando") {
      setStep("investimentoIniciando");
    }
  };

  const handleNextFromSite = () => {
    if (!data.siteInstagram.trim()) return;
    setStep("faturamento");
  };

  const handleSelectFaturamento = (
    faturamento: FaturamentoFaixa
  ) => {
    setData((prev) => ({ ...prev, faturamento }));
    setStep("leadsSemana");
  };

  const handleSelectLeads = (leadsSemana: LeadsFaixa) => {
    setData((prev) => ({ ...prev, leadsSemana }));
    setStep("resumo");
  };

  const handleNextFromInvestimento = () => {
    if (!data.investimento.trim()) return;
    setStep("resumo");
  };

  const handleNextFromContatoResponsavel = () => {
    if (!data.contatoResponsavelWhatsapp.trim()) return;

    if (!isValidPhone(data.contatoResponsavelWhatsapp)) {
      setErrors((prev) => ({
        ...prev,
        contatoResponsavelWhatsapp: t(
          "leadwizard.errors.responsavel.invalid"
        ),
      }));
      return;
    }

    setErrors((prev) => ({
      ...prev,
      contatoResponsavelWhatsapp: undefined,
    }));
    setStep("resumo");
  };

  // Finish: monta lead para o dashboard + envia para webhook
  const handleFinish = async () => {
    const posicaoLabel =
      data.posicao !== null
        ? t(posicaoKeyMap[data.posicao])
        : t("leadwizard.posicao.indefinido");

    const novoLead: Lead = {
      id: Date.now().toString(),
      nome: data.nome,
      empresa:
        data.posicao === "dono" && data.siteInstagram
          ? data.siteInstagram
          : undefined,
      whatsapp:
        data.posicao === "funcionario" &&
        data.contatoResponsavelWhatsapp
          ? data.contatoResponsavelWhatsapp
          : data.whatsapp,
      faturamento: data.faturamento
        ? t(faturamentoKeyMap[data.faturamento])
        : undefined,
      leadsSemana: data.leadsSemana
        ? t(leadsKeyMap[data.leadsSemana])
        : undefined,
      investimento:
        data.posicao === "iniciando" && data.investimento
          ? data.investimento
          : undefined,
      // Mantemos o status literal para não quebrar o tipo Lead["status"]
      status: "Novo",
      origem: t("leadwizard.origem.form"),
      ultimaAtividade: t("leadwizard.ultimaAtividade.form"),
      tags: [
        posicaoLabel,
        data.posicao === "dono"
          ? t("leadwizard.tag.decisor")
          : undefined,
        data.posicao === "iniciando"
          ? t("leadwizard.tag.negocioInicial")
          : undefined,
      ].filter(Boolean) as string[],
      observacoes:
        data.posicao === "funcionario"
          ? t("leadwizard.observacoes.funcionario")
          : data.posicao === "iniciando"
          ? t("leadwizard.observacoes.iniciando")
          : t("leadwizard.observacoes.generica"),
    };

    addLead(novoLead);

    try {
      await fetch(
        "https://webhook.conexaodireta.com.br/webhook/cc53dc89-68ba-4c79-a853-1b1063d477dcsiteOFCLucas",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            posicaoLabel,
            faturamentoFormatado: novoLead.faturamento,
            leadsSemanaFormatado: novoLead.leadsSemana,
            origem: novoLead.origem,
          }),
        }
      );
    } catch (err) {
      console.error("Erro ao enviar para webhook:", err);
    }

    const calPhone =
      data.posicao === "funcionario" && data.contatoResponsavelWhatsapp
        ? data.contatoResponsavelWhatsapp
        : data.whatsapp;

    const searchParams = new URLSearchParams();
    if (data.nome) searchParams.set("name", data.nome);
    if (calPhone) searchParams.set("phone", calPhone);
    // Se no futuro você coletar e-mail no funil, basta fazer:
    // if (data.email) searchParams.set("email", data.email);

    router.push(`/obrigado?${searchParams.toString()}`);
  };

  const firstName =
    data.nome.trim().split(" ")[0] ||
    t("leadwizard.generic.fallbackName");
  const progress =
    ((stepOrder[step] + 1) / TOTAL_STEPS) * 100;

  return (
    <div className="relative w-full">
      <div className="mx-auto w-full max-w-2xl flex flex-col items-center">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <div className="rounded-3xl bg-slate-950/90 border border-slate-800 shadow-2xl shadow-black/60 p-2">
            <Image
              src="/logoCD.webp"
              alt="Conexão Direta"
              width={128}
              height={128}
              className="rounded-2xl object-contain"
              priority
            />
          </div>
        </div>

        {/* Card principal */}
        <div className="w-full rounded-3xl bg-slate-950/90 border border-slate-800 shadow-2xl shadow-black/60 backdrop-blur-lg px-6 py-6 md:px-8 md:py-8 space-y-6">
          {/* Linha superior: seletor de idioma */}
          <div className="flex justify-end">
            <LanguageSwitcher
              locale={locale}
              onChange={setLocale}
            />
          </div>

          {/* Cabeçalho */}
          <div className="space-y-2">
            <h1 className="text-xl md:text-2xl font-semibold text-slate-50">
              {t("leadwizard.header.title")}
            </h1>
            <p className="text-sm text-slate-400">
              {t("leadwizard.header.description")}
            </p>
          </div>

          {/* Etapas */}
          <div className="space-y-5">
            {step === "nome" && (
              <QuestionBlock
                titulo={t("leadwizard.steps.nome.title")}
                texto={t("leadwizard.steps.nome.text")}
              >
                <div className="mt-3 space-y-4">
                  <Field
                    label={t("leadwizard.fields.nome.label")}
                    value={data.nome}
                    onChange={(v) => handleChange("nome", v)}
                    placeholder={t(
                      "leadwizard.fields.nome.placeholder"
                    )}
                    onEnter={handleNextFromNome}
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextFromNome}
                      disabled={!data.nome.trim()}
                      className="rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 disabled:text-slate-400 text-slate-950 text-xs font-semibold px-4 py-2 transition"
                    >
                      {t("leadwizard.buttons.continuar")}
                    </button>
                  </div>
                </div>
              </QuestionBlock>
            )}

            {step === "whatsapp" && (
              <QuestionBlock
                titulo={t("leadwizard.steps.whatsapp.title", {
                  firstName,
                })}
                texto={t("leadwizard.steps.whatsapp.text")}
              >
                <div className="mt-3 space-y-4">
                  <Field
                    label={t("leadwizard.fields.whatsapp.label")}
                    value={data.whatsapp}
                    onChange={(v) => handleChange("whatsapp", v)}
                    placeholder={t(
                      "leadwizard.fields.whatsapp.placeholder"
                    )}
                    error={errors.whatsapp}
                    onEnter={handleNextFromWhatsapp}
                  />
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setStep("nome")}
                      className="text-xs text-slate-400 hover:text-slate-200"
                    >
                      {t("leadwizard.buttons.voltar")}
                    </button>
                    <button
                      type="button"
                      onClick={handleNextFromWhatsapp}
                      disabled={!data.whatsapp.trim()}
                      className="rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 disabled:text-slate-400 text-slate-950 text-xs font-semibold px-4 py-2 transition"
                    >
                      {t("leadwizard.buttons.continuar")}
                    </button>
                  </div>
                </div>
              </QuestionBlock>
            )}

            {step === "posicao" && (
              <QuestionBlock
                titulo={t("leadwizard.steps.posicao.title")}
                texto={t("leadwizard.steps.posicao.text")}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                  <ChoiceButton
                    selected={data.posicao === "dono"}
                    onClick={() => handleSelectPosicao("dono")}
                    title={t("leadwizard.posicao.dono")}
                  />
                  <ChoiceButton
                    selected={data.posicao === "funcionario"}
                    onClick={() =>
                      handleSelectPosicao("funcionario")
                    }
                    title={t("leadwizard.posicao.funcionario")}
                  />
                  <ChoiceButton
                    selected={data.posicao === "iniciando"}
                    onClick={() =>
                      handleSelectPosicao("iniciando")
                    }
                    title={t(
                      "leadwizard.posicao.iniciando.opcao"
                    )}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setStep("whatsapp")}
                  className="mt-4 text-xs text-slate-400 hover:text-slate-200"
                >
                  {t("leadwizard.buttons.voltar")}
                </button>
              </QuestionBlock>
            )}

            {step === "site" && (
              <QuestionBlock
                titulo={t("leadwizard.steps.site.title", {
                  firstName,
                })}
                texto={t("leadwizard.steps.site.text")}
              >
                <div className="mt-3 space-y-4">
                  <Field
                    label={t("leadwizard.fields.site.label")}
                    value={data.siteInstagram}
                    onChange={(v) =>
                      handleChange("siteInstagram", v)
                    }
                    placeholder={t(
                      "leadwizard.fields.site.placeholder"
                    )}
                    onEnter={handleNextFromSite}
                  />
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setStep("posicao")}
                      className="text-xs text-slate-400 hover:text-slate-200"
                    >
                      {t("leadwizard.buttons.voltar")}
                    </button>
                    <button
                      type="button"
                      onClick={handleNextFromSite}
                      disabled={!data.siteInstagram.trim()}
                      className="rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 disabled:text-slate-400 text-slate-950 text-xs font-semibold px-4 py-2 transition"
                    >
                      {t("leadwizard.buttons.continuar")}
                    </button>
                  </div>
                </div>
              </QuestionBlock>
            )}

            {step === "faturamento" && (
              <QuestionBlock
                titulo={t("leadwizard.steps.faturamento.title")}
                texto={t("leadwizard.steps.faturamento.text")}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  <ChoiceButton
                    selected={data.faturamento === "menos-20"}
                    onClick={() =>
                      handleSelectFaturamento("menos-20")
                    }
                    title={t("leadwizard.faturamento.menos20")}
                  />
                  <ChoiceButton
                    selected={data.faturamento === "20-50"}
                    onClick={() =>
                      handleSelectFaturamento("20-50")
                    }
                    title={t("leadwizard.faturamento.20_50")}
                  />
                  <ChoiceButton
                    selected={data.faturamento === "50-100"}
                    onClick={() =>
                      handleSelectFaturamento("50-100")
                    }
                    title={t("leadwizard.faturamento.50_100")}
                  />
                  <ChoiceButton
                    selected={data.faturamento === "100-500"}
                    onClick={() =>
                      handleSelectFaturamento("100-500")
                    }
                    title={t("leadwizard.faturamento.100_500")}
                  />
                  <ChoiceButton
                    selected={data.faturamento === "500-1000"}
                    onClick={() =>
                      handleSelectFaturamento("500-1000")
                    }
                    title={t("leadwizard.faturamento.500_1000")}
                  />
                  <ChoiceButton
                    selected={data.faturamento === "mais-1000"}
                    onClick={() =>
                      handleSelectFaturamento("mais-1000")
                    }
                    title={t("leadwizard.faturamento.mais1000")}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setStep("site")}
                  className="mt-4 text-xs text-slate-400 hover:text-slate-200"
                >
                  {t("leadwizard.buttons.voltar")}
                </button>
              </QuestionBlock>
            )}

            {step === "leadsSemana" && (
              <QuestionBlock
                titulo={t("leadwizard.steps.leadsSemana.title")}
                texto={t("leadwizard.steps.leadsSemana.text")}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  <ChoiceButton
                    selected={data.leadsSemana === "menos-500"}
                    onClick={() =>
                      handleSelectLeads("menos-500")
                    }
                    title={t("leadwizard.leads.menos500")}
                  />
                  <ChoiceButton
                    selected={data.leadsSemana === "500-1000"}
                    onClick={() =>
                      handleSelectLeads("500-1000")
                    }
                    title={t("leadwizard.leads.500_1000")}
                  />
                  <ChoiceButton
                    selected={data.leadsSemana === "1000-2000"}
                    onClick={() =>
                      handleSelectLeads("1000-2000")
                    }
                    title={t("leadwizard.leads.1000_2000")}
                  />
                  <ChoiceButton
                    selected={data.leadsSemana === "2000-5000"}
                    onClick={() =>
                      handleSelectLeads("2000-5000")
                    }
                    title={t("leadwizard.leads.2000_5000")}
                  />
                  <ChoiceButton
                    selected={data.leadsSemana === "5000-10000"}
                    onClick={() =>
                      handleSelectLeads("5000-10000")
                    }
                    title={t("leadwizard.leads.5000_10000")}
                  />
                  <ChoiceButton
                    selected={data.leadsSemana === "mais-10000"}
                    onClick={() =>
                      handleSelectLeads("mais-10000")
                    }
                    title={t("leadwizard.leads.mais10000")}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setStep("faturamento")}
                  className="mt-4 text-xs text-slate-400 hover:text-slate-200"
                >
                  {t("leadwizard.buttons.voltar")}
                </button>
              </QuestionBlock>
            )}

            {step === "investimentoIniciando" && (
              <QuestionBlock
                titulo={t("leadwizard.steps.investimento.title", {
                  firstName,
                })}
                texto={t("leadwizard.steps.investimento.text")}
              >
                <div className="mt-3 space-y-4">
                  <Field
                    label={t("leadwizard.fields.investimento.label")}
                    value={data.investimento}
                    onChange={(v) =>
                      handleChange("investimento", v)
                    }
                    placeholder={t(
                      "leadwizard.fields.investimento.placeholder"
                    )}
                    onEnter={handleNextFromInvestimento}
                  />
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setStep("posicao")}
                      className="text-xs text-slate-400 hover:text-slate-200"
                    >
                      {t("leadwizard.buttons.voltar")}
                    </button>
                    <button
                      type="button"
                      onClick={handleNextFromInvestimento}
                      disabled={!data.investimento.trim()}
                      className="rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 disabled:text-slate-400 text-slate-950 text-xs font-semibold px-4 py-2 transition"
                    >
                      {t("leadwizard.buttons.continuar")}
                    </button>
                  </div>
                </div>
              </QuestionBlock>
            )}

            {step === "contatoResponsavel" && (
              <QuestionBlock
                titulo={t(
                  "leadwizard.steps.contatoResponsavel.title"
                )}
                texto={t(
                  "leadwizard.steps.contatoResponsavel.text",
                  { firstName }
                )}
              >
                <div className="mt-3 space-y-4">
                  <Field
                    label={t(
                      "leadwizard.fields.contatoResponsavel.label"
                    )}
                    value={data.contatoResponsavelWhatsapp}
                    onChange={(v) =>
                      handleChange(
                        "contatoResponsavelWhatsapp",
                        v
                      )
                    }
                    placeholder={t(
                      "leadwizard.fields.contatoResponsavel.placeholder"
                    )}
                    error={errors.contatoResponsavelWhatsapp}
                    onEnter={handleNextFromContatoResponsavel}
                  />
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setStep("posicao")}
                      className="text-xs text-slate-400 hover:text-slate-200"
                    >
                      {t("leadwizard.buttons.voltar")}
                    </button>
                    <button
                      type="button"
                      onClick={handleNextFromContatoResponsavel}
                      disabled={
                        !data.contatoResponsavelWhatsapp.trim()
                      }
                      className="rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 disabled:text-slate-400 text-slate-950 text-xs font-semibold px-4 py-2 transition"
                    >
                      {t("leadwizard.buttons.continuar")}
                    </button>
                  </div>
                </div>
              </QuestionBlock>
            )}

            {step === "resumo" && (
              <QuestionBlock
                titulo={t("leadwizard.steps.resumo.title")}
                texto={t("leadwizard.steps.resumo.text")}
              >
                <div className="mt-3 space-y-3 text-xs text-slate-200">
                  <ResumoLinha
                    label={t("leadwizard.summary.nome")}
                    value={
                      data.nome ||
                      t("leadwizard.generic.empty")
                    }
                  />
                  <ResumoLinha
                    label={t("leadwizard.summary.whatsapp")}
                    value={
                      data.whatsapp ||
                      t("leadwizard.generic.empty")
                    }
                  />
                  <ResumoLinha
                    label={t("leadwizard.summary.posicao")}
                    value={
                      data.posicao === "dono"
                        ? t("leadwizard.posicao.dono")
                        : data.posicao === "funcionario"
                        ? t("leadwizard.posicao.funcionario")
                        : data.posicao === "iniciando"
                        ? t("leadwizard.posicao.iniciando")
                        : t("leadwizard.generic.empty")
                    }
                  />

                  {data.posicao === "dono" && (
                    <>
                      <ResumoLinha
                        label={t(
                          "leadwizard.summary.siteInstagram"
                        )}
                        value={
                          data.siteInstagram ||
                          t("leadwizard.generic.empty")
                        }
                      />
                      <ResumoLinha
                        label={t(
                          "leadwizard.summary.faturamento"
                        )}
                        value={
                          data.faturamento
                            ? t(
                                faturamentoKeyMap[
                                  data.faturamento
                                ]
                              )
                            : t("leadwizard.generic.empty")
                        }
                      />
                      <ResumoLinha
                        label={t(
                          "leadwizard.summary.leadsSemana"
                        )}
                        value={
                          data.leadsSemana
                            ? t(
                                leadsKeyMap[
                                  data.leadsSemana
                                ]
                              )
                            : t("leadwizard.generic.empty")
                        }
                      />
                    </>
                  )}

                  {data.posicao === "iniciando" && (
                    <ResumoLinha
                      label={t(
                        "leadwizard.summary.investimento"
                      )}
                      value={
                        data.investimento ||
                        t("leadwizard.generic.empty")
                      }
                    />
                  )}

                  {data.posicao === "funcionario" && (
                    <ResumoLinha
                      label={t(
                        "leadwizard.summary.contatoResponsavel"
                      )}
                      value={
                        data.contatoResponsavelWhatsapp ||
                        t("leadwizard.generic.empty")
                      }
                    />
                  )}
                </div>

                <div className="flex justify-between items-center pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      if (data.posicao === "dono") {
                        setStep("leadsSemana");
                      } else if (data.posicao === "iniciando") {
                        setStep("investimentoIniciando");
                      } else if (data.posicao === "funcionario") {
                        setStep("contatoResponsavel");
                      } else {
                        setStep("posicao");
                      }
                    }}
                    className="text-xs text-slate-400 hover:text-slate-200"
                  >
                    {t("leadwizard.buttons.voltarEditar")}
                  </button>
                  <button
                    type="button"
                    onClick={handleFinish}
                    className="rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-semibold px-4 py-2 transition"
                  >
                    {t("leadwizard.buttons.salvarLead")}
                  </button>
                </div>
              </QuestionBlock>
            )}
          </div>

          {/* Barra de progresso */}
          <div>
            <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-1 text-[11px] text-slate-400">            
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- componentes auxiliares ----------- */

function QuestionBlock({
  titulo,
  texto,
  children,
}: {
  titulo: string;
  texto: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className="space-y-1 whitespace-pre-line">
        <h2 className="text-base md:text-lg font-semibold text-slate-50">
          {titulo}
        </h2>
        <p className="text-xs md:text-sm text-slate-400">
          {texto}
        </p>
      </div>
      {children}
    </div>
  );
}

function ChoiceButton({
  selected,
  onClick,
  title,
  subtitle,
}: {
  selected?: boolean;
  onClick: () => void;
  title: string;
  subtitle?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "w-full text-left rounded-xl border px-4 py-3 text-xs md:text-sm transition " +
        (selected
          ? "border-emerald-500 bg-emerald-500/10 text-slate-50 shadow shadow-emerald-900/40"
          : "border-slate-700 bg-slate-900/70 text-slate-200 hover:bg-slate-900")
      }
    >
      <div className="font-medium">{title}</div>
      {subtitle && (
        <div className="mt-1 text-[11px] text-slate-400">
          {subtitle}
        </div>
      )}
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  error,
  onEnter,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  onEnter?: () => void;
}) {
  const baseClasses =
    "w-full rounded-xl bg-slate-900/80 border px-3 py-2 text-xs text-slate-50 placeholder-slate-500 outline-none transition";
  const borderClasses = error
    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/40"
    : "border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/40";

  return (
    <div className="space-y-1">
      <label className="text-xs text-slate-300">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${baseClasses} ${borderClasses}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onEnter) {
            e.preventDefault();
            onEnter();
          }
        }}
      />
      {error && (
        <p className="text-[11px] text-red-400 mt-1">{error}</p>
      )}
    </div>
  );
}

function ResumoLinha({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-slate-400">{label}</span>
      <span className="text-slate-100">{value}</span>
    </div>
  );
}

// Selector simples PT / EN
function LanguageSwitcher({
  locale,
  onChange,
}: {
  locale: LeadWizardLocale;
  onChange: (locale: LeadWizardLocale) => void;
}) {
  const baseBtn =
    "px-2 py-1 rounded-md text-[11px] font-semibold transition";
  const inactive =
    "text-slate-400 hover:text-slate-100 hover:bg-slate-800/70";
  const active =
    "text-emerald-300 bg-slate-800 border border-emerald-500/50";

  return (
    <div className="inline-flex items-center gap-1 bg-slate-900/80 rounded-xl border border-slate-700 px-2 py-1">
      <button
        type="button"
        onClick={() => onChange("pt")}
        className={`${baseBtn} ${
          locale === "pt" ? active : inactive
        }`}
      >
        PT
      </button>
      <span className="text-[10px] text-slate-600">/</span>
      <button
        type="button"
        onClick={() => onChange("en")}
        className={`${baseBtn} ${
          locale === "en" ? active : inactive
        }`}
      >
        EN
      </button>
    </div>
  );
}
