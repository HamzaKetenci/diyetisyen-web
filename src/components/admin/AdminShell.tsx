'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  CalendarDays,
  Briefcase,
  HelpCircle,
  MessageSquare,
  FileText,
  ExternalLink,
  LogOut,
  Menu,
  X,
  User,
  ShieldCheck,
} from 'lucide-react';
import { useAdminStore } from '@/lib/store/admin-store';
import { siteConfig } from '@/lib/site-config';

interface AdminShellProps {
  children: React.ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const { isAuthenticated, logout, appointments, adminName } = useAdminStore();

  // If on login page, don't show the dashboard shell
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const newAppointmentsCount = appointments.filter((a) => a.status === 'yeni').length;

  const navItems = [
    {
      label: 'Randevu Talepleri',
      href: '/admin/appointments',
      icon: CalendarDays,
      badge: newAppointmentsCount > 0 ? newAppointmentsCount : undefined,
    },
    {
      label: 'Hizmetler',
      href: '/admin/services',
      icon: Briefcase,
    },
    {
      label: 'Sıkça Sorulan Sorular',
      href: '/admin/faqs',
      icon: HelpCircle,
    },
    {
      label: 'Danışan Yorumları',
      href: '/admin/testimonials',
      icon: MessageSquare,
    },
    {
      label: 'Blog & Tarifler',
      href: '/admin/blog',
      icon: FileText,
    },
  ];

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col md:flex-row">
      {/* Mobile Header Bar */}
      <div className="md:hidden bg-neutral-900 text-white px-4 py-3 flex items-center justify-between border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary-light font-bold text-sm">
            D
          </div>
          <span className="font-heading font-bold text-base tracking-tight">
            Yönetim Paneli
          </span>
        </div>

        <button
          type="button"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          aria-label={mobileSidebarOpen ? 'Menüyü Kapat' : 'Menüyü Aç'}
          className="w-10 h-10 rounded-lg flex items-center justify-center text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-neutral-900 text-neutral-300 flex flex-col justify-between transition-transform duration-200 md:static md:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Brand / Admin Profile */}
          <div className="p-6 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 text-primary-light flex items-center justify-center font-bold font-heading">
                {adminName.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <h2 className="text-sm font-bold text-white font-body truncate">
                  {adminName}
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-primary-light mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Yönetici</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 flex-1" aria-label="Yönetim Menüsü">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href === '/admin/appointments' && pathname === '/admin');

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-white font-semibold'
                      : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-error text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-neutral-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              <span>Siteyi Görüntüle</span>
            </div>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-error hover:bg-error/10 transition-colors text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Çıkış Yap</span>
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-neutral-900/60 z-30 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
        {children}
      </main>
    </div>
  );
}
