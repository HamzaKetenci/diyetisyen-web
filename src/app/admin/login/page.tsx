'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from 'lucide-react';
import { useAdminStore } from '@/lib/store/admin-store';
import { siteConfig } from '@/lib/site-config';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAdminStore();

  const [email, setEmail] = useState('admin@diyetisyen.com');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Realistic login delay (400ms)
    setTimeout(() => {
      login();
      setIsLoading(false);
      router.push('/admin/appointments');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-bold text-xl mx-auto shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-neutral-900 tracking-tight">
            Yönetim Paneli Girişi
          </h1>
          <p className="text-sm text-neutral-700">
            {siteConfig.name} &bull; Randevu ve İçerik Yönetimi
          </p>
        </div>

        {/* Login Form Card */}
        <Card className="bg-white border border-neutral-200/80 p-6 sm:p-8 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="admin-email"
              type="email"
              label="E-posta Adresi"
              required
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@diyetisyen.com"
            />

            <div className="relative">
              <Input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                label="Şifre"
                required
                disabled={isLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Şifrenizi giriniz"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
                className="absolute right-3.5 top-[38px] text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                loading={isLoading}
                loadingText="Giriş yapılıyor..."
              >
                Giriş Yap
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
