"use client";
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Instagram } from 'lucide-react';



export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [currentLoading, setCurrentLoading] = useState(false); // Fix: currentLoading was missing
  const [mounted, setMounted] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  // Memoize background elements to prevent re-rendering
  const backgroundElements = useMemo(() => {
    const particles = [...Array(20)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 4
    }));

    const orbs = [...Array(5)].map((_, i) => ({
      id: i,
      width: 100 + Math.random() * 200,
      height: 100 + Math.random() * 200,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 8 + Math.random() * 4
    }));

    return { particles, orbs };
  }, []); // Empty dependency array ensures this never changes

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');
    setCurrentLoading(true); // Fix: use setCurrentLoading instead of setIsLoading

    try {
      // TODO: Implement actual authentication logic here
      // Example: await login(email, password);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setError(errorMessage);
    } finally {
      setCurrentLoading(false); // Fix: use setCurrentLoading instead of setIsLoading
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };
  return (
     <div className="relative min-h-svh pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] flex items-center justify-center px-4 overflow-hidden">
      <div className="fixed inset-0 -z-10 bg-linear-to-br from-slate-900 via-slate-800 to-black" />
      {/* CSS Keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        html, body {
          overscroll-behavior: none;
          background-attachment: fixed;
        }

        
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.2);
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 0 40px rgba(34, 197, 94, 0.4);
            transform: scale(1.02);
          }
        }
        
        @keyframes slide-up {
          from {
            transform: translateY(40px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        @keyframes grid-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        
        .animate-grid-float {
          animation: grid-float 20s ease-in-out infinite;
        }
        
        .shimmer-border {
          background: linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.4), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        
        .input-focus-effect {
          transition: all 0.3s ease;
          position: relative;
        }
        
        .input-focus-effect::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 0.375rem;
          padding: 1px;
          background: linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.6), transparent);
          background-size: 200% 100%;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          animation: shimmer 2s infinite;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .input-focus-effect.focused::before {
          opacity: 1;
        }
        
        .ripple-effect {
          position: relative;
          overflow: hidden;
        }
        
        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(34, 197, 94, 0.3);
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        }
        
        .card-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-hover:hover {
          transform: translateY(-8px) rotateX(2deg);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(34, 197, 94, 0.1);
        }
        
        .logo-animation {
          transition: all 0.3s ease;
        }
        
        .logo-animation:hover {
          transform: scale(1.1) rotate(5deg);
          filter: drop-shadow(0 0 20px rgba(34, 197, 94, 0.5));
        }
        
        html, body {
          overscroll-behavior: none;
          background-attachment: fixed;
        }

      `}</style>

      {/* Animated Background Elements - Memoized to prevent re-rendering */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Enhanced floating particles */}
        {backgroundElements.particles.map((particle) => (
          <div
            key={`particle-${particle.id}`}
            className="absolute w-1 h-1 bg-green-400 rounded-full opacity-30 animate-float"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}
        
        {/* Larger glowing orbs */}
        {backgroundElements.orbs.map((orb) => (
          <div
            key={`orb-${orb.id}`}
            className="absolute rounded-full bg-linear-to-r from-green-400/10 to-blue-400/10 blur-xl animate-float"
            style={{
              width: `${orb.width}px`,
              height: `${orb.height}px`,
              left: `${orb.left}%`,
              top: `${orb.top}%`,
              animationDelay: `${orb.delay}s`,
              animationDuration: `${orb.duration}s`
            }}
          />
        ))}
        
        {/* Animated grid - separate animation to prevent reset */}
        <div 
          className="absolute inset-0 opacity-5 animate-grid-float" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322c55e' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Main Login Card */}
      <Card className={`w-full max-w-sm sm:max-w-md relative z-10 bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 card-hover ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-linear-to-r from-green-600/5 via-transparent to-blue-600/5 rounded-lg" />
        
        <CardHeader className="space-y-1 text-center relative">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              {/* Glow pulsante atrás */}
              <div className="absolute inset-0 rounded-lg blur-md animate-pulse-glow glow-bg" />

              {/* Container neutro apenas para posicionar e animar */}
              <div className="w-12 h-12 rounded-lg flex items-center justify-center logo-animation relative z-10">
                <img
                  src="/logo.webp"
                  alt="Conexão Direta"
                  className="w-full h-full object-contain select-none pointer-events-none drop-shadow-logo"
                  loading="lazy"
                />
                {/* Opcional: leve overlay para reforçar brilho (remova se não quiser) */}
                <div className="pointer-events-none absolute inset-0 rounded-lg mix-blend-overlay overlay-highlight" />
              </div>
            </div>
          </div>
          <CardTitle className={`text-2xl sm:text-3xl font-bold bg-linear-to-r from-white to-slate-300 bg-clip-text text-transparent ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>oi normal
          </CardTitle>
          <CardDescription className={`text-slate-400 ${mounted ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>ola
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <Alert variant="destructive" className="bg-red-900/20 border border-red-800/50 text-red-200 animate-slide-up backdrop-blur-sm">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {/* Email Field */}
            <div className={`space-y-2 ${mounted ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
              <Label htmlFor="email" className="text-slate-200 text-sm font-medium">
                Email
              </Label>
              <div className={`relative input-focus-effect ${focusedField === 'email' ? 'focused' : ''}`}>
                <Mail className={`absolute left-3 top-3 h-4 w-4 transition-colors duration-300 ${focusedField === 'email' ? 'text-green-400' : 'text-slate-400'}`} />
                <Input
                  id="email"
                  type="email"
                  placeholder="oi"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  onKeyPress={handleKeyPress}
                  required
                  disabled={currentLoading}
                  className="pl-10 pr-4 h-12 bg-slate-700/50 border border-slate-600/50 text-white placeholder:text-slate-400 focus:border-green-500/50 focus:bg-slate-700/70 transition-all duration-300 rounded-lg backdrop-blur-sm"
                />
              </div>
            </div>
            
            {/* Password Field */}
            <div className={`space-y-2 ${mounted ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
              <Label htmlFor="password" className="text-slate-200 text-sm font-medium">
                Senha
              </Label>
              <div className={`relative input-focus-effect ${focusedField === 'password' ? 'focused' : ''}`}>
                <Lock className={`absolute left-3 top-3 h-4 w-4 transition-colors duration-300 ${focusedField === 'password' ? 'text-green-400' : 'text-slate-400'}`} />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="oi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField('')}
                  onKeyPress={handleKeyPress}
                  required
                  disabled={currentLoading}
                  className="pl-10 pr-12 h-12 bg-slate-700/50 border border-slate-600/50 text-white placeholder:text-slate-400 focus:border-green-500/50 focus:bg-slate-700/70 transition-all duration-300 rounded-lg backdrop-blur-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 h-4 w-4 text-slate-400 hover:text-green-400 transition-colors duration-200"
                  disabled={currentLoading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className={`${mounted ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/25 ripple-effect relative overflow-hidden"
                disabled={currentLoading}
                onMouseDown={(e) => {
                  if (!currentLoading) {
                    const target = e.target as HTMLElement;
                    const rect = target.getBoundingClientRect();
                    const ripple = document.createElement('span');
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.style.width = ripple.style.height = size + 'px';
                    ripple.style.left = x + 'px';
                    ripple.style.top = y + 'px';
                    ripple.classList.add('ripple');
                    
                    target.appendChild(ripple);
                    
                    setTimeout(() => {
                      ripple.remove();
                    }, 600);
                  }
                }}
              >
                {currentLoading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Entrando...</span>
                  </div>
                ) : (
                  <span className="flex items-center justify-center">pi
                  </span>
                )}
              </Button>
            </div>
          </form>

          {/* Signup CTA */}
          <div className="text-center text-slate-300 text-sm">
            <a href="/signup" className="underline text-green-400 hover:text-green-300">Não tem conta? Cadastre-se</a>
          </div>
          
          <div className={`text-center text-xs text-slate-500 ${mounted ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
            Ao continuar, você concorda com nossos <a href="https://www.conexaodireta.com.br/terms-of-use" target="_blank" rel="noopener noreferrer" className="underline hover:text-green-400">Termos de Uso</a> e <a href="https://www.conexaodireta.com.br/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-green-400">Política de Privacidade</a>.
          </div>
        </CardContent>
      </Card>

      {/* Loading Overlay */}
      {currentLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-slate-800/90 rounded-lg p-6 flex items-center space-x-3 animate-pulse-glow">
            <Loader2 className="h-6 w-6 animate-spin text-green-400" />
            <span className="text-white">Autenticando...</span>
          </div>
        </div>
      )}

      {/* Social & Support Links */}
      <div className="absolute bottom-8 left-0 right-0 z-0 flex items-center justify-center gap-4 text-slate-300">

        {/* Instagram */}
        <a
          href="https://www.instagram.com/conexaodireta.ia/" 
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          title="Instagram"
          className="p-2 hover:opacity-100 opacity-80 transition"
        >
          <Instagram className="w-6 h-6 " />
        </a>

        <span className="select-none text-slate-600">|</span>

        {/* WhatsApp */}
        <a
          href="https://wa.me/5585996724660"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          title="WhatsApp"
          className="p-2 hover:opacity-100 opacity-80 transition"
        >
          <img
            src="https://cdn.simpleicons.org/whatsapp/CBD5E1"
            alt="WhatsApp"
            className="w-6 h-6"
            loading="lazy"
            
          />
        </a>
        

      <span className="select-none text-slate-600">|</span>

      {/* Email */}
      <a
        href="mailto:suporte@conexaodireta.com.br"
        aria-label="Email"
        title="Email"
        className="p-2 hover:opacity-100 opacity-80 transition"
      >
        <Mail className="w-6 h-6" />
      </a>
      </div>
    </div>
  );
};


