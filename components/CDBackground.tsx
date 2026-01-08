"use client";

import React, { useEffect, useState } from "react";

type Particle = {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
};

type Orb = {
  id: number;
  width: number;
  height: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
};

interface CDBackgroundProps {
  children: React.ReactNode;
}

export default function CDBackground({ children }: CDBackgroundProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [orbs, setOrbs] = useState<Orb[]>([]);

  // IMPORTANTE: só gera os números aleatórios DEPOIS de montar no cliente
  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 20 }, (_, id) => ({
      id,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 4,
    }));

    const newOrbs: Orb[] = Array.from({ length: 5 }, (_, id) => ({
      id,
      width: 100 + Math.random() * 200,
      height: 100 + Math.random() * 200,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 8 + Math.random() * 4,
    }));

    setParticles(newParticles);
    setOrbs(newOrbs);
  }, []);

  return (
    <div className="relative min-h-[100vh] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] flex items-center justify-center px-4 overflow-hidden">
      {/* Fundo base */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-800 to-black" />

      {/* Suas @keyframes e classes auxiliares ficam aqui,
          pode reaproveitar exatamente o <style>{` ... `}</style> que você já tinha */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes grid-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-grid-float {
          animation: grid-float 20s ease-in-out infinite;
        }
      `}</style>

      {/* Elementos animados – só aparecem depois do useEffect,
          então não existe diferença entre SSR e primeiro render do cliente */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <div
            key={`particle-${p.id}`}
            className="absolute w-1 h-1 bg-emerald-400 rounded-full opacity-40 animate-float"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}

        {orbs.map((o) => (
          <div
            key={`orb-${o.id}`}
            className="absolute rounded-full bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 blur-xl animate-float"
            style={{
              width: o.width,
              height: o.height,
              left: `${o.left}%`,
              top: `${o.top}%`,
              animationDelay: `${o.delay}s`,
              animationDuration: `${o.duration}s`,
            }}
          />
        ))}

        {/* grid fixo (sem random) */}
        <div
          className="absolute inset-0 opacity-5 animate-grid-float"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322c55e' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Conteúdo (login, wizard, dashboard, etc.) */}
      <div className="relative z-10 w-full max-w-5xl">{children}</div>
    </div>
  );
}
