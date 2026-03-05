import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { Eye, EyeOff, Wrench, Mail, Lock, User, Phone, Briefcase, ChevronRight, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { IMGS } from '../data/mockData';

type AuthView = 'login' | 'register-user' | 'register-pro';

export function AuthPage({ initialView }: { initialView?: AuthView }) {
  const [view, setView] = useState<AuthView>(initialView || 'login');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setRole } = useApp();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setRole('usuario');
      navigate('/panel/usuario');
    }, 1200);
  };

  const handleRegisterUser = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setRole('usuario');
      navigate('/panel/usuario');
    }, 1400);
  };

  const handleRegisterPro = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setRole('profesional');
      navigate('/panel/profesional');
    }, 1400);
  };

  return (
    <div className="min-h-screen flex pt-16">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src={IMGS.city} alt="Popayán" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F2460]/90 to-[#1E40AF]/80" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-16">
              <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
                <Wrench className="w-5 h-5 text-[#1E40AF]" />
              </div>
              <span className="text-2xl font-bold text-white">By<span className="text-[#34D399]">Me</span></span>
            </Link>
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
              {view === 'register-pro'
                ? 'Haz crecer tu negocio con ByMe'
                : 'Los mejores profesionales de Popayán, a un clic'}
            </h2>
            <p className="text-blue-200 leading-relaxed">
              {view === 'register-pro'
                ? 'Únete a nuestra red y conecta con cientos de clientes. Sin comisiones los primeros 3 meses.'
                : 'Servicios verificados, precios justos y garantía de satisfacción. Tu hogar en buenas manos.'}
            </p>
          </div>
          <div className="space-y-4">
            {(view === 'register-pro' ? [
              'Perfil profesional gratuito',
              'Gestiona tu calendario y disponibilidad',
              'Pagos seguros y protegidos',
              'Soporte dedicado 24/7',
            ] : [
              'Más de 500 profesionales verificados',
              'Calificaciones y reseñas reales',
              'Reservas en línea en minutos',
              'Pago seguro y garantizado',
            ]).map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#34D399] flex-shrink-0" />
                <span className="text-white/80 text-sm">{item}</span>
              </div>
            ))}
            {/* Mini professional card */}
            <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <img src={IMGS.man1} alt="" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-white text-sm font-semibold">Carlos Ramírez</p>
                  <p className="text-blue-200 text-xs">⭐ 4.9 · 283 trabajos completados</p>
                </div>
              </div>
              <p className="text-white/70 text-xs mt-2 italic">"ByMe me ayudó a conseguir el doble de clientes en tres meses."</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-white">
        <div className="w-full max-w-sm">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#111827] mb-6 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Volver al inicio
          </Link>

          {view === 'login' && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#111827]">Bienvenido de vuelta</h1>
                <p className="text-[#6B7280] mt-1">Ingresa a tu cuenta de ByMe</p>
              </div>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">Correo electrónico</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                    <input
                      type="email"
                      defaultValue="felipe@email.com"
                      className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-xl text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20 focus:border-[#1E40AF] transition-all"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">Contraseña</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                    <input
                      type={showPass ? 'text' : 'password'}
                      defaultValue="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 border border-[#E5E7EB] rounded-xl text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20 focus:border-[#1E40AF] transition-all"
                      placeholder="••••••••"
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2">
                      {showPass ? <EyeOff className="w-4 h-4 text-[#9CA3AF]" /> : <Eye className="w-4 h-4 text-[#9CA3AF]" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-[#D1D5DB]" defaultChecked />
                    <span className="text-sm text-[#6B7280]">Recordarme</span>
                  </label>
                  <a href="#" className="text-sm text-[#1E40AF] hover:underline">¿Olvidaste tu contraseña?</a>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1E40AF] hover:bg-[#1D3FA0] text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Iniciar sesión <ChevronRight className="w-4 h-4" /></>
                  )}
                </button>
              </form>

              <div className="my-6 flex items-center gap-3">
                <div className="flex-1 h-px bg-[#E5E7EB]" />
                <span className="text-sm text-[#9CA3AF]">o</span>
                <div className="flex-1 h-px bg-[#E5E7EB]" />
              </div>

              <p className="text-center text-sm text-[#6B7280]">
                ¿No tienes cuenta?{' '}
                <button onClick={() => setView('register-user')} className="text-[#1E40AF] font-medium hover:underline">
                  Regístrate gratis
                </button>
              </p>
              <p className="text-center text-sm text-[#6B7280] mt-2">
                ¿Eres profesional?{' '}
                <button onClick={() => setView('register-pro')} className="text-[#10B981] font-medium hover:underline">
                  Únete como profesional
                </button>
              </p>
            </>
          )}

          {view === 'register-user' && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#111827]">Crear cuenta de usuario</h1>
                <p className="text-[#6B7280] mt-1">Encuentra profesionales en minutos</p>
              </div>
              <form onSubmit={handleRegisterUser} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">Nombre</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                      <input type="text" placeholder="Felipe" className="w-full pl-9 pr-3 py-2.5 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20 focus:border-[#1E40AF] transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">Apellido</label>
                    <input type="text" placeholder="Arango" className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20 focus:border-[#1E40AF] transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">Correo electrónico</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                    <input type="email" placeholder="tu@email.com" className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20 focus:border-[#1E40AF] transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">Teléfono</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                    <input type="tel" placeholder="+57 300 000 0000" className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20 focus:border-[#1E40AF] transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">Contraseña</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                    <input type={showPass ? 'text' : 'password'} placeholder="Mínimo 8 caracteres" className="w-full pl-10 pr-10 py-2.5 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20 focus:border-[#1E40AF] transition-all" />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2">
                      {showPass ? <EyeOff className="w-4 h-4 text-[#9CA3AF]" /> : <Eye className="w-4 h-4 text-[#9CA3AF]" />}
                    </button>
                  </div>
                </div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" className="mt-0.5 rounded border-[#D1D5DB]" required />
                  <span className="text-sm text-[#6B7280]">
                    Acepto los <a href="#" className="text-[#1E40AF] hover:underline">términos y condiciones</a> y la <a href="#" className="text-[#1E40AF] hover:underline">política de privacidad</a>
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1E40AF] hover:bg-[#1D3FA0] text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Crear cuenta <ChevronRight className="w-4 h-4" /></>}
                </button>
              </form>
              <p className="text-center text-sm text-[#6B7280] mt-5">
                ¿Ya tienes cuenta?{' '}
                <button onClick={() => setView('login')} className="text-[#1E40AF] font-medium hover:underline">Iniciar sesión</button>
              </p>
              <p className="text-center text-sm text-[#6B7280] mt-2">
                ¿Eres profesional?{' '}
                <button onClick={() => setView('register-pro')} className="text-[#10B981] font-medium hover:underline">Regístrate aquí</button>
              </p>
            </>
          )}

          {view === 'register-pro' && (
            <>
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 bg-[#ECFDF5] text-[#10B981] text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  <Briefcase className="w-3.5 h-3.5" /> Cuenta Profesional
                </div>
                <h1 className="text-2xl font-bold text-[#111827]">Únete como profesional</h1>
                <p className="text-[#6B7280] mt-1">Expande tu negocio en Popayán</p>
              </div>
              <form onSubmit={handleRegisterPro} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">Nombre</label>
                    <input type="text" placeholder="Carlos" className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981] transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">Apellido</label>
                    <input type="text" placeholder="Ramírez" className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981] transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">Correo electrónico</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                    <input type="email" placeholder="carlos@email.com" className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981] transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">Teléfono</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                    <input type="tel" placeholder="+57 310 000 0000" className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981] transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">Especialidad principal</label>
                  <select className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-xl text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981] bg-white transition-all">
                    <option value="">Selecciona tu especialidad</option>
                    <option>Plomería</option>
                    <option>Electricidad</option>
                    <option>Pintura</option>
                    <option>Carpintería</option>
                    <option>Limpieza</option>
                    <option>Cerrajería</option>
                    <option>Jardinería</option>
                    <option>Climatización</option>
                    <option>Mudanzas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">Descripción breve</label>
                  <textarea
                    rows={2}
                    placeholder="Cuéntanos sobre tu experiencia..."
                    className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981] resize-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">Contraseña</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                    <input type={showPass ? 'text' : 'password'} placeholder="Mínimo 8 caracteres" className="w-full pl-10 pr-10 py-2.5 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981] transition-all" />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2">
                      {showPass ? <EyeOff className="w-4 h-4 text-[#9CA3AF]" /> : <Eye className="w-4 h-4 text-[#9CA3AF]" />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#10B981] hover:bg-[#0EA875] text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Crear cuenta profesional <ChevronRight className="w-4 h-4" /></>}
                </button>
              </form>
              <p className="text-center text-sm text-[#6B7280] mt-5">
                ¿Ya tienes cuenta?{' '}
                <button onClick={() => setView('login')} className="text-[#1E40AF] font-medium hover:underline">Iniciar sesión</button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
