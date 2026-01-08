// app/login/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import CDBackground from "@/components/CDBackground";
import { useAuth } from "@/contexts/AuthContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loading = submitting || authLoading;

  // Depois que autenticar, vai para o dashboard
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setError("");
    setSubmitting(true);

    try {
      await login(email, password);
      // redirect é feito pelo useEffect acima
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Falha ao fazer login. Tente novamente.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      void handleSubmit(e as any);
    }
  };

  return (
    <CDBackground>
      <div className="min-h-[100vh] flex items-center justify-center px-4">
        <Card className="w-full max-w-md bg-slate-900/90 border border-slate-700/80 shadow-2xl shadow-black/60 backdrop-blur-xl">
          <CardHeader className="space-y-2 text-center">
            <div className="flex justify-center mb-3">
              <div className="relative w-16 h-16 rounded-2xl bg-slate-900 border border-emerald-500/70 shadow-[0_0_35px_rgba(16,185,129,0.5)] overflow-hidden">
                <Image
                  src="/logo.webp"
                  alt="Conexão Direta"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <CardTitle className="text-2xl font-semibold text-slate-50">
              Login do painel
            </CardTitle>
            <CardDescription className="text-slate-400 text-sm">
              Acesse o dashboard de leads da Conexão Direta.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Email */}
              <div className="space-y-1">
                <Label htmlFor="email" className="text-xs text-slate-200">
                  E-mail
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    placeholder="seuemail@conexaodireta.com.br"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyPress}
                    disabled={loading}
                    className="pl-9 bg-slate-900/80 border-slate-700 text-slate-50 placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500/40"
                    required
                  />
                </div>
              </div>

              {/* Senha */}
              <div className="space-y-1">
                <Label htmlFor="password" className="text-xs text-slate-200">
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder="Sua senha"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyPress}
                    disabled={loading}
                    className="pl-9 pr-9 bg-slate-900/80 border-slate-700 text-slate-50 placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500/40"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-emerald-400"
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-10 bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-sm font-semibold"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Autenticando...
                  </span>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </CDBackground>
  );
}
