"use client";

import { Suspense, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import CDBackground from "@/components/CDBackground";

declare global {
  interface Window {
    Cal?: any;
  }
}

function ObrigadoContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") ?? "";
  const phone = searchParams.get("phone") ?? "";
  const email = searchParams.get("email") ?? ""; // opcional

  // Link base do evento
  const calBaseLink = "conexao.direta/reuniao";

  // Adiciona querystring com os dados já preenchidos
  const calLinkWithPrefill = (() => {
    const params = new URLSearchParams();

    if (name) params.set("name", name);
    if (email) params.set("email", email);
    // AQUI ESTÁ A MUDANÇA IMPORTANTE:
    // Em vez de "phone", usamos "whatsapp", que é o parâmetro reconhecido pelo Cal.
    if (phone) params.set("whatsapp", phone);

    const qs = params.toString();
    return qs ? `${calBaseLink}?${qs}` : calBaseLink;
  })();

  useEffect(() => {
    // Bootstrap padrão da Cal
    (function (C: any, A: string, L: string) {
      const p = function (a: any, ar: any) {
        a.q.push(ar);
      };
      const d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          const cal = C.Cal;
          const ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            const s = d.createElement("script");
            s.src = A;
            s.async = true;
            d.head.appendChild(s);
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: any = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else {
              p(cal, ar);
            }
            return;
          }
          p(cal, ar);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    window.Cal("init", "reuniao", { origin: "https://app.cal.com" });
    window.Cal.ns.reuniao("ui", {
      theme: "dark",
      hideEventTypeDetails: false,
      layout: "week_view",
    });

    const openTimeout = setTimeout(() => {
      const trigger = document.querySelector<HTMLButtonElement>(
        "[data-cal-trigger='true']"
      );
      trigger?.click();
    }, 800);

    return () => clearTimeout(openTimeout);
  }, []);

  return (
    <CDBackground>
      <div className="min-h-[100vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl bg-slate-950/90 border border-slate-800 shadow-2xl shadow-black/70 backdrop-blur-xl p-6 md:p-8 text-center space-y-6">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-emerald-500/60 flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.4)] overflow-hidden">
              <Image
                src="/logo.webp"
                alt="Conexão Direta"
                width={48}
                height={48}
                className="rounded-xl object-contain"
              />
            </div>
          </div>

          {/* Texto principal */}
          <div className="space-y-2">
            <h1 className="text-xl md:text-2xl font-semibold text-slate-50">
              Obrigado pelo contato!
            </h1>
            <p className="text-sm text-slate-400">
              Recebemos suas informações e o time da Conexão Direta vai entrar em
              contato em breve. Se quiser, você já pode agendar um horário com
              nosso time ou visitar o site oficial.
            </p>
          </div>

          {/* Botão “fantasma” usado pela Cal para abrir o popup */}
          <button
            type="button"
            data-cal-trigger="true"
            data-cal-link={calLinkWithPrefill}
            data-cal-namespace="reuniao"
            data-cal-config='{"layout":"week_view","theme":"dark"}'
            className="hidden"
          >
            Abrir agenda
          </button>

          {/* Ações */}
          <div className="flex flex-col gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                const trigger =
                  document.querySelector<HTMLButtonElement>(
                    "[data-cal-trigger='true']"
                  );
                trigger?.click();
              }}
              className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-sm font-semibold transition shadow-lg shadow-emerald-500/20"
            >
              Abrir agenda novamente
            </button>

            <Link
              href="https://www.conexaodireta.com.br/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-xl border border-slate-700 text-slate-200 text-sm font-medium hover:bg-slate-800 transition"
            >
              Visitar o site da Conexão Direta
            </Link>
          </div>
        </div>
      </div>
    </CDBackground>
  );
}

export default function ObrigadoPage() {
  return (
    <Suspense
      fallback={
        <CDBackground>
          <div className="min-h-[100vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-3xl bg-slate-950/90 border border-slate-800 shadow-2xl shadow-black/70 backdrop-blur-xl p-6 md:p-8 text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-emerald-500/60 flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.4)] overflow-hidden">
                  <Image
                    src="/logo.webp"
                    alt="Conexão Direta"
                    width={48}
                    height={48}
                    className="rounded-xl object-contain"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <h1 className="text-xl md:text-2xl font-semibold text-slate-50">
                  Carregando...
                </h1>
              </div>
            </div>
          </div>
        </CDBackground>
      }
    >
      <ObrigadoContent />
    </Suspense>
  );
}