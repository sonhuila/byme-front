import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import {
  Menu, X, ChevronDown, User, Settings, LogOut, Wrench, Shield,
  BriefcaseBusiness, Bell, Palette, GitBranch
} from 'lucide-react';
import { useApp, DemoRole } from '../context/AppContext';

export function Navbar() {
  const { role, setRole, userName, userPhoto, isLoggedIn } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isTransparent = location.pathname === '/' && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location]);

  const handleRoleChange = (newRole: DemoRole) => {
    setRole(newRole);
    setDemoOpen(false);
    if (newRole === 'usuario') navigate('/panel/usuario');
    else if (newRole === 'profesional') navigate('/panel/profesional');
    else if (newRole === 'admin') navigate('/panel/admin');
    else navigate('/');
  };

  const getDashboardLink = () => {
    if (role === 'usuario') return '/panel/usuario';
    if (role === 'profesional') return '/panel/profesional';
    if (role === 'admin') return '/panel/admin';
    return '/';
  };

  const roleLabels: Record<DemoRole, string> = {
    visitor: 'Vista Visitante',
    usuario: 'Como Usuario',
    profesional: 'Como Profesional',
    admin: 'Como Administrador',
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent'
          : 'bg-white shadow-sm border-b border-[#E5E7EB]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-[#1E40AF] rounded-lg flex items-center justify-center">
              <Wrench className="w-4 h-4 text-white" />
            </div>
            <span
              className={`text-xl font-bold tracking-tight transition-colors ${
                isTransparent ? 'text-white' : 'text-[#111827]'
              }`}
            >
              By<span className="text-[#10B981]">Me</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/buscar"
              className={`text-sm font-medium transition-colors hover:text-[#1E40AF] ${
                isTransparent ? 'text-white/90 hover:text-white' : 'text-[#374151]'
              }`}
            >
              Buscar Servicios
            </Link>
            <Link
              to="/#como-funciona"
              className={`text-sm font-medium transition-colors hover:text-[#1E40AF] ${
                isTransparent ? 'text-white/90 hover:text-white' : 'text-[#374151]'
              }`}
            >
              Cómo funciona
            </Link>
            {isLoggedIn && role === 'profesional' && (
              <Link
                to="/panel/profesional"
                className={`text-sm font-medium transition-colors hover:text-[#1E40AF] ${
                  isTransparent ? 'text-white/90 hover:text-white' : 'text-[#374151]'
                }`}
              >
                Mi Panel Pro
              </Link>
            )}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Demo Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setDemoOpen(!demoOpen)}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all ${
                  isTransparent
                    ? 'border-white/30 text-white hover:bg-white/10'
                    : 'border-[#E5E7EB] text-[#6B7280] hover:bg-[#F9FAFB]'
                }`}
              >
                <span className="hidden lg:inline">Demo:</span>
                <span className="font-medium">{roleLabels[role]}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {demoOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-[#E5E7EB] py-1 z-50">
                  <div className="px-3 py-2 border-b border-[#E5E7EB]">
                    <p className="text-xs text-[#6B7280] font-medium">MODO DEMOSTRACIÓN</p>
                  </div>
                  {([
                    { role: 'visitor', icon: User, label: 'Vista Visitante', desc: 'Sin sesión iniciada' },
                    { role: 'usuario', icon: User, label: 'Como Usuario', desc: 'Felipe Arango' },
                    { role: 'profesional', icon: BriefcaseBusiness, label: 'Como Profesional', desc: 'Carlos Ramírez' },
                    { role: 'admin', icon: Shield, label: 'Como Admin', desc: 'Panel de control' },
                  ] as { role: DemoRole; icon: any; label: string; desc: string }[]).map(item => (
                    <button
                      key={item.role}
                      onClick={() => handleRoleChange(item.role)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-[#F9FAFB] transition-colors ${
                        role === item.role ? 'bg-blue-50' : ''
                      }`}
                    >
                      <item.icon className={`w-4 h-4 ${role === item.role ? 'text-[#1E40AF]' : 'text-[#9CA3AF]'}`} />
                      <div>
                        <p className={`text-sm font-medium ${role === item.role ? 'text-[#1E40AF]' : 'text-[#111827]'}`}>{item.label}</p>
                        <p className="text-xs text-[#9CA3AF]">{item.desc}</p>
                      </div>
                      {role === item.role && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#1E40AF]" />}
                    </button>
                  ))}
                  <div className="border-t border-[#E5E7EB] mt-1 pt-1">
                    <Link
                      to="/design-system"
                      onClick={() => setDemoOpen(false)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#F9FAFB] transition-colors"
                    >
                      <Palette className="w-4 h-4 text-[#7C3AED]" />
                      <div>
                        <p className="text-sm font-medium text-[#111827]">Design System</p>
                        <p className="text-xs text-[#9CA3AF]">Tokens y componentes</p>
                      </div>
                    </Link>
                    <Link
                      to="/flujo"
                      onClick={() => setDemoOpen(false)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#F9FAFB] transition-colors"
                    >
                      <GitBranch className="w-4 h-4 text-[#10B981]" />
                      <div>
                        <p className="text-sm font-medium text-[#111827]">User Flow</p>
                        <p className="text-xs text-[#9CA3AF]">Diagrama de flujos y navegación</p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <button className={`p-2 rounded-full transition-colors ${isTransparent ? 'text-white hover:bg-white/10' : 'text-[#6B7280] hover:bg-[#F3F4F6]'}`}>
                  <Bell className="w-5 h-5" />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className={`flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border transition-all ${
                      isTransparent ? 'border-white/30 hover:bg-white/10' : 'border-[#E5E7EB] hover:bg-[#F9FAFB]'
                    }`}
                  >
                    <img
                      src={userPhoto}
                      alt={userName}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className={`text-sm font-medium max-w-24 truncate ${isTransparent ? 'text-white' : 'text-[#111827]'}`}>
                      {userName.split(' ')[0]}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 ${isTransparent ? 'text-white' : 'text-[#6B7280]'}`} />
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-[#E5E7EB] py-1 z-50">
                      <div className="px-4 py-3 border-b border-[#E5E7EB]">
                        <p className="text-sm font-semibold text-[#111827]">{userName}</p>
                        <p className="text-xs text-[#6B7280] capitalize">{role}</p>
                      </div>
                      <Link to={getDashboardLink()} className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#374151] hover:bg-[#F9FAFB]">
                        <Settings className="w-4 h-4 text-[#9CA3AF]" /> Mi Panel
                      </Link>
                      <button
                        onClick={() => { setRole('visitor'); navigate('/'); setProfileOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" /> Cerrar sesión
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                    isTransparent
                      ? 'text-white hover:bg-white/10'
                      : 'text-[#374151] hover:bg-[#F3F4F6]'
                  }`}
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/registro"
                  className="text-sm font-medium px-4 py-2 bg-[#1E40AF] text-white rounded-lg hover:bg-[#1D3FA0] transition-colors"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${isTransparent ? 'text-white' : 'text-[#374151]'}`}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#E5E7EB] px-4 py-4 space-y-1">
          <Link to="/buscar" className="block px-3 py-2.5 text-sm font-medium text-[#374151] rounded-lg hover:bg-[#F9FAFB]">Buscar Servicios</Link>
          <Link to="/#como-funciona" className="block px-3 py-2.5 text-sm font-medium text-[#374151] rounded-lg hover:bg-[#F9FAFB]">Cómo funciona</Link>
          <div className="pt-2 border-t border-[#E5E7EB] mt-2">
            <p className="text-xs text-[#9CA3AF] px-3 mb-2 font-medium">MODO DEMO</p>
            {(['visitor', 'usuario', 'profesional', 'admin'] as DemoRole[]).map(r => (
              <button
                key={r}
                onClick={() => handleRoleChange(r)}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg mb-1 ${role === r ? 'bg-blue-50 text-[#1E40AF] font-medium' : 'text-[#374151] hover:bg-[#F9FAFB]'}`}
              >
                {roleLabels[r]}
              </button>
            ))}
          </div>
          {!isLoggedIn && (
            <div className="pt-2 flex flex-col gap-2">
              <Link to="/login" className="block text-center px-4 py-2.5 text-sm font-medium text-[#374151] border border-[#E5E7EB] rounded-lg">Iniciar sesión</Link>
              <Link to="/registro" className="block text-center px-4 py-2.5 text-sm font-medium text-white bg-[#1E40AF] rounded-lg">Registrarse</Link>
            </div>
          )}
        </div>
      )}

      {/* Overlay to close dropdowns */}
      {(profileOpen || demoOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => { setProfileOpen(false); setDemoOpen(false); }}
        />
      )}
    </nav>
  );
}