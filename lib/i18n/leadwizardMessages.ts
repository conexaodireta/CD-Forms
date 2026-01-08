// lib/i18n/leadwizardMessages.ts

export type LeadWizardLocale = "en" | "pt";

/**
 * MENSAGENS EM INGLÊS (DEFAULT)
 */
const enLeadWizardMessages = {
  // Header
  "leadwizard.header.title": "Consulting pre-qualification",
  "leadwizard.header.description":
    "Answer a few quick questions so we can arrive at the meeting much better prepared to help you.",

  // Steps: Name
  "leadwizard.steps.nome.title": "First, what is your name?",
  "leadwizard.steps.nome.text": "You can type only your first name.",
  "leadwizard.fields.nome.label": "Name",
  "leadwizard.fields.nome.placeholder": "Type your name",

  // Steps: WhatsApp
  "leadwizard.steps.whatsapp.title":
    "Great, {firstName}! What is your WhatsApp number?",
  "leadwizard.steps.whatsapp.text":
    "We will use this contact to send the meeting reminder.",
  "leadwizard.fields.whatsapp.label": "WhatsApp",
  "leadwizard.fields.whatsapp.placeholder": "+55 85 99999-0000",

  // Steps: Position
  "leadwizard.steps.posicao.title": "All right, everything is set.",
  "leadwizard.steps.posicao.text":
    "What is your current role in the company?",

  "leadwizard.posicao.dono": "Owner / CEO",
  "leadwizard.posicao.funcionario": "Employee",
  "leadwizard.posicao.iniciando": "Starting the business",
  "leadwizard.posicao.indefinido": "Undefined",
  "leadwizard.posicao.iniciando.opcao":
    "I am starting my own business",

  // Steps: Website / Instagram
  "leadwizard.steps.site.title":
    "Great, {firstName}! What is your company website or Instagram?",
  "leadwizard.steps.site.text":
    "You can paste the Instagram @ or your main website.",
  "leadwizard.fields.site.label": "Website or Instagram",
  "leadwizard.fields.site.placeholder":
    "@mycompany or www.mycompany.com",

  // Steps: Revenue
  "leadwizard.steps.faturamento.title":
    "Nice! What is your current monthly revenue?",
  "leadwizard.steps.faturamento.text":
    "Choose the range that best represents your reality today.",

  "leadwizard.faturamento.menos20": "Less than R$ 20,000",
  "leadwizard.faturamento.20_50": "Between R$ 20k and 50k",
  "leadwizard.faturamento.50_100": "Between R$ 50k and 100k",
  "leadwizard.faturamento.100_500": "Between R$ 100k and 500k",
  "leadwizard.faturamento.500_1000": "R$ 500k to 1 million",
  "leadwizard.faturamento.mais1000": "More than R$ 1 million",

  // Steps: Leads per week
  "leadwizard.steps.leadsSemana.title":
    "And on average, how many leads/contacts per week?",
  "leadwizard.steps.leadsSemana.text":
    "Consider all channels: WhatsApp, Instagram, website, etc.",

  "leadwizard.leads.menos500": "Less than 500",
  "leadwizard.leads.500_1000": "Between 500 and 1,000",
  "leadwizard.leads.1000_2000": "Between 1,000 and 2,000",
  "leadwizard.leads.2000_5000": "Between 2,000 and 5,000",
  "leadwizard.leads.5000_10000": "Between 5,000 and 10,000",
  "leadwizard.leads.mais10000": "More than 10,000",

  // Steps: Investment (starting the business)
  "leadwizard.steps.investimento.title": "Got it, {firstName}!",
  "leadwizard.steps.investimento.text":
    "If you could count on an AI that sells like the best salesperson on your team, how much would make sense to invest today?",
  "leadwizard.fields.investimento.label":
    "How much would make sense to invest?",
  "leadwizard.fields.investimento.placeholder":
    "E.g.: Between R$ 100 and R$ 4,999 per month",

  // Steps: Responsible contact (employee)
  "leadwizard.steps.contatoResponsavel.title": "Employee",
  "leadwizard.steps.contatoResponsavel.text":
    "Got it, {firstName}! Our consulting calls are for business owners.\n\nCould you share the decision-maker's WhatsApp so we can send the information and align a quick conversation?",
  "leadwizard.fields.contatoResponsavel.label":
    "Decision-maker WhatsApp",
  "leadwizard.fields.contatoResponsavel.placeholder":
    "+55 11 99999-0000",

  // Step: Summary
  "leadwizard.steps.resumo.title": "Perfect. Just a quick review:",
  "leadwizard.steps.resumo.text":
    "Check if everything looks good before saving this lead.",

  // Summary labels
  "leadwizard.summary.nome": "Name",
  "leadwizard.summary.whatsapp": "WhatsApp",
  "leadwizard.summary.posicao": "Role",
  "leadwizard.summary.siteInstagram": "Website / Instagram",
  "leadwizard.summary.faturamento": "Monthly revenue",
  "leadwizard.summary.leadsSemana": "Leads per week",
  "leadwizard.summary.investimento": "Expected investment",
  "leadwizard.summary.contatoResponsavel":
    "Decision-maker WhatsApp",

  // Buttons
  "leadwizard.buttons.continuar": "Continue",
  "leadwizard.buttons.voltar": "Back",
  "leadwizard.buttons.voltarEditar": "Go back and edit",
  "leadwizard.buttons.salvarLead": "Save lead",

  // Progress
  "leadwizard.progress.label": "Step {current} of {total}",

  // Generic
  "leadwizard.generic.empty": "-",
  "leadwizard.generic.fallbackName": "there",

  // Errors
  "leadwizard.errors.whatsapp.invalid":
    "Invalid number. Please try again.",
  "leadwizard.errors.responsavel.invalid":
    "Invalid message. Please, try again.",

  // Status / origem / tags / observações
  "leadwizard.status.novo": "New",
  "leadwizard.origem.form": "Pre-qualification form",
  "leadwizard.ultimaAtividade.form": "Lead sent via AI form",

  "leadwizard.tag.decisor": "Decision-maker",
  "leadwizard.tag.negocioInicial": "Early-stage business",

  "leadwizard.observacoes.funcionario":
    "Employee shared the decision-maker’s contact for consulting.",
  "leadwizard.observacoes.iniciando":
    "Entrepreneur starting the business and evaluating AI investment.",
  "leadwizard.observacoes.generica":
    "Lead qualified by the AI funnel.",
} as const;

// Tipos derivados do EN (apenas para chaves)
type EnMessages = typeof enLeadWizardMessages;
export type LeadWizardMessageKey = keyof EnMessages;

// Bundle genérico: todas as chaves com valor string
type Bundle = Record<LeadWizardMessageKey, string>;

/**
 * MENSAGENS EM PORTUGUÊS
 * (mesmas chaves do inglês, valores diferentes)
 */
const ptLeadWizardMessages: Bundle = {
  // Header
  "leadwizard.header.title": "Pré-qualificação da consultoria",
  "leadwizard.header.description":
    "Responda rapidinho. Com essas informações a gente chega na reunião mais preparado para te ajudar.",

  // Steps: Nome
  "leadwizard.steps.nome.title": "Primeiramente, qual é o seu nome?",
  "leadwizard.steps.nome.text": "Nome e sobrenome.",
  "leadwizard.fields.nome.label": "Nome",
  "leadwizard.fields.nome.placeholder": "Digite seu nome",

  // Steps: WhatsApp
  "leadwizard.steps.whatsapp.title":
    "Ótimo, {firstName}. Qual é o seu número de WhatsApp?",
  "leadwizard.steps.whatsapp.text":
    "Utilizaremos esse contato para enviar o lembrete da reunião.",
  "leadwizard.fields.whatsapp.label": "WhatsApp",
  "leadwizard.fields.whatsapp.placeholder": "+55 85 99999-0000",

  // Steps: Posição
  "leadwizard.steps.posicao.title": "Perfeito, vamos avançar.",
  "leadwizard.steps.posicao.text":
    "Qual é a sua posição atual na empresa?",

  "leadwizard.posicao.dono": "Dono(a) / CEO",
  "leadwizard.posicao.funcionario": "Funcionário(a)",
  "leadwizard.posicao.iniciando": "Iniciando o negócio",
  "leadwizard.posicao.indefinido": "Indefinido",
  "leadwizard.posicao.iniciando.opcao":
    "Estou iniciando o meu negócio",

  // Steps: Site / Instagram
  "leadwizard.steps.site.title":
    "Perfeito, {firstName}. Qual é o site ou Instagram da sua empresa?",
  "leadwizard.steps.site.text":
    "Você pode informar o @ do Instagram ou o site principal da empresa.",
  "leadwizard.fields.site.label": "Site ou Instagram",
  "leadwizard.fields.site.placeholder":
    "@minhaempresa ou www.minhaempresa.com",

  // Steps: Faturamento
  "leadwizard.steps.faturamento.title":
    "Ótimo. Qual é o faturamento mensal atual da empresa?",
  "leadwizard.steps.faturamento.text":
    "Selecione a faixa que melhor representa a realidade do seu negócio hoje.",

  "leadwizard.faturamento.menos20": "Menos de R$ 20.000",
  "leadwizard.faturamento.20_50": "Entre R$ 20.000 e R$ 50.000",
  "leadwizard.faturamento.50_100": "Entre R$ 50.000 e R$ 100.000",
  "leadwizard.faturamento.100_500": "Entre R$ 100.000 e R$ 500.000",
  "leadwizard.faturamento.500_1000": "Entre R$ 500.000 e R$ 1.000.000",
  "leadwizard.faturamento.mais1000": "Acima de R$ 1.000.000",

  // Steps: Leads / semana
  "leadwizard.steps.leadsSemana.title":
    "Em média, quantos leads/contatos comerciais a empresa recebe por mês?",
  "leadwizard.steps.leadsSemana.text":
    "Considere todos os canais: WhatsApp, Instagram, site, tráfego pago, entre outros.",

  "leadwizard.leads.menos500": "Menos de 500",
  "leadwizard.leads.500_1000": "Entre 500 e 1.000",
  "leadwizard.leads.1000_2000": "Entre 1.000 e 2.000",
  "leadwizard.leads.2000_5000": "Entre 2.000 e 5.000",
  "leadwizard.leads.5000_10000": "Entre 5.000 e 10.000",
  "leadwizard.leads.mais10000": "Mais de 10.000",

  // Steps: Investimento (iniciando)
  "leadwizard.steps.investimento.title": "Perfeito, {firstName}.",
  "leadwizard.steps.investimento.text":
    "Se você pudesse contar com uma IA que vende como o melhor profissional da sua equipe, quanto faria sentido investir nessa solução hoje?",
  "leadwizard.fields.investimento.label":
    "Quanto faria sentido investir?",
  "leadwizard.fields.investimento.placeholder":
    "Ex.: entre R$ 100 e R$ 4.999 por mês",

  // Steps: Contato responsável (funcionário)
  "leadwizard.steps.contatoResponsavel.title": "Funcionário",
  "leadwizard.steps.contatoResponsavel.text":
    "Entendi, {firstName}. As consultorias são exclusivas para os donos da empresa.\n\nVocê poderia compartilhar o WhatsApp do responsável para que possamos enviar as informações e alinhar uma conversa rápida?",
  "leadwizard.fields.contatoResponsavel.label":
    "WhatsApp do responsável",
  "leadwizard.fields.contatoResponsavel.placeholder":
    "+55 11 99999-0000",

  // Step: Resumo
  "leadwizard.steps.resumo.title":
    "Perfeito. Vamos apenas revisar as informações:",
  "leadwizard.steps.resumo.text":
    "Confira se está tudo correto antes de salvar este lead.",

  // Resumo – labels
  "leadwizard.summary.nome": "Nome",
  "leadwizard.summary.whatsapp": "WhatsApp",
  "leadwizard.summary.posicao": "Posição",
  "leadwizard.summary.siteInstagram": "Site / Instagram",
  "leadwizard.summary.faturamento": "Faturamento mensal",
  "leadwizard.summary.leadsSemana": "Leads por semana",
  "leadwizard.summary.investimento": "Investimento previsto",
  "leadwizard.summary.contatoResponsavel":
    "WhatsApp do responsável",

  // Botões
  "leadwizard.buttons.continuar": "Continuar",
  "leadwizard.buttons.voltar": "Voltar",
  "leadwizard.buttons.voltarEditar": "Voltar e editar",
  "leadwizard.buttons.salvarLead": "Confirmar",

  // Progresso
  "leadwizard.progress.label": "Etapa {current} de {total}",

  // Genéricos
  "leadwizard.generic.empty": "-",
  "leadwizard.generic.fallbackName": "tudo bem",

  // Erros
  "leadwizard.errors.whatsapp.invalid":
    "Número inválido. Por favor, tente novamente.",
  "leadwizard.errors.responsavel.invalid":
    "Invalid message. Please, try again.",

  // Status / origem / tags / observações
  "leadwizard.status.novo": "Novo",
  "leadwizard.origem.form": "Formulário de pré-qualificação",
  "leadwizard.ultimaAtividade.form":
    "Lead enviado pelo formulário IA",

  "leadwizard.tag.decisor": "Decisor",
  "leadwizard.tag.negocioInicial": "Negócio em estágio inicial",

  "leadwizard.observacoes.funcionario":
    "Funcionário enviou contato do responsável para consultoria.",
  "leadwizard.observacoes.iniciando":
    "Empreendedor iniciando o negócio, avaliando investimento em IA.",
  "leadwizard.observacoes.generica":
    "Lead qualificado pelo funil IA.",
};

const bundles: Record<LeadWizardLocale, Bundle> = {
  en: enLeadWizardMessages,
  pt: ptLeadWizardMessages,
};

export function createLeadWizardTranslator(
  locale: LeadWizardLocale = "en"
) {
  const messages = bundles[locale] ?? bundles.en;
  const fallback = bundles.en;

  return (
    key: LeadWizardMessageKey,
    vars?: Record<string, string | number>
  ): string => {
    let msg = (messages[key] ?? fallback[key] ?? (key as string)) as string;

    if (!vars) return msg;

    for (const [k, v] of Object.entries(vars)) {
      msg = msg.replace(new RegExp(`{${k}}`, "g"), String(v));
    }

    return msg;
  };
}
