import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { Mail, Lock, User, Phone, ArrowLeft } from 'lucide-react';
import { signIn, signUp, getCurrentUser, type User as SupabaseUser } from '@/lib/supabase';
import { toast } from 'sonner';

export const Route = createFileRoute('/auth')({
  component: AuthPage,
});

type AuthMode = 'signin' | 'signup';

function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
  });

  useEffect(() => {
    // Check if user is already logged in
    getCurrentUser().then(setUser);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'signin') {
        await signIn(formData.email, formData.password);
        toast.success('خوش آمدید!');
      } else {
        await signUp(formData.email, formData.password, formData.phone || undefined);
        toast.success('حساب کاربری ایجاد شد. لطفاً ایمیل خود را تأیید کنید.');
      }
    } catch (error: any) {
      toast.error(error.message || 'خطا در انجام عملیات');
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className="min-h-screen bg-background px-4 py-8">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-2xl font-bold text-foreground">شما وارد شده‌اید</h1>
          <p className="mt-2 text-muted-foreground">{user.email}</p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
          >
            <ArrowLeft className="size-4" />
            بازگشت به خانه
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <ArrowLeft className="size-4" />
          بازگشت
        </Link>

        <div className="mt-8 text-center">
          <h1 className="text-3xl font-bold text-foreground">
            {mode === 'signin' ? 'ورود به CycleX' : 'ایجاد حساب کاربری'}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === 'signin' 
              ? 'برای ادامه وارد حساب کاربری خود شوید' 
              : 'به جمع رکاب‌زن‌های CycleX بپیوندید'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {mode === 'signup' && (
            <div className="glass relative rounded-2xl p-4">
              <User className="absolute right-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="نام و نام خانوادگی"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                required={mode === 'signup'}
              />
            </div>
          )}

          <div className="glass relative rounded-2xl p-4">
            <Mail className="absolute right-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              placeholder="ایمیل"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              required
            />
          </div>

          {mode === 'signup' && (
            <div className="glass relative rounded-2xl p-4">
              <Phone className="absolute right-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="tel"
                placeholder="شماره موبایل (اختیاری)"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                dir="ltr"
              />
            </div>
          )}

          <div className="glass relative rounded-2xl p-4">
            <Lock className="absolute right-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="password"
              placeholder="رمز عبور"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-xl bg-primary py-4 text-sm font-bold text-primary-foreground transition-transform active:scale-95 disabled:opacity-50"
          >
            {loading ? 'در حال پردازش...' : mode === 'signin' ? 'ورود' : 'ایجاد حساب'}
          </button>
        </form>

        {/* Toggle mode */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            {mode === 'signin' ? 'حساب کاربری ندارید؟' : 'قبلاً ثبت‌نام کرده‌اید؟'}
            <button
              type="button"
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="mr-2 text-sm font-bold text-primary hover:underline"
            >
              {mode === 'signin' ? 'ایجاد حساب جدید' : 'وارد شوید'}
            </button>
          </p>
        </div>

        {/* Terms */}
        <p className="mt-8 text-center text-[0.65rem] text-muted-foreground">
          با ادامه، شرایط استفاده و حریم خصوصی CycleX را می‌پذیرید.
        </p>
      </div>
    </div>
  );
}
