# 🚴 CYCLEX RENTALS — راهنمای راه‌اندازی و استقرار

## 📋 وضعیت فعلی پروژه

### ✅ تکمیل شده (100%)
- فرانت‌اند کامل با TanStack Start + React 19
- Hero سینمایی 12 فریمی با GSAP ScrollTrigger
- تمام صفحات اصلی:
  - `/` - صفحه اصلی با Hero و بخش‌های مختلف
  - `/bikes` - لیست دوچرخه‌ها
  - `/bikes/:id` - جزئیات دوچرخه
  - `/locations` - ایستگاه‌ها
  - `/booking` - فرآیند 6 مرحله‌ای رزرو
  - `/booking/success` - تأیید رزرو
  - `/bookings` - رزروهای کاربر
  - `/favorites` - علاقه‌مندی‌ها
  - `/profile` - پروفایل کاربری
  - `/auth` - ورود/ثبت‌نام
  - `/support` - پشتیبانی و سؤالات متداول
  - `/about` - درباره ما
- سیستم استایل‌دهی Tailwind CSS 4 با تم تاریک پریمیوم
- کامپوننت‌های UI قابل استفاده مجدد
- داده‌های نمونه فارسی
- انیمیشن‌های اسکرول و micro-interactions
- طراحی mobile-first با ناوبری پایین موبایل

### ⚠️ نیاز به تنظیمات (باید انجام دهید)
1. اتصال به GitHub
2. راه‌اندازی Supabase
3. تنظیم متغیرهای محیطی
4. استقرار نهایی

---

## 🔧 راه‌اندازی محلی

### پیش‌نیازها
```bash
# بررسی Node.js (نسخه 20 یا بالاتر)
node --version  # باید v20+ باشد

# بررسی npm
npm --version   # باید 10+ باشد

# بررسی Git
git --version
```

### نصب و اجرا
```bash
# کلو کردن مخزن
git clone <YOUR_GITHUB_REPO_URL>
cd cyclex-rentals

# نصب dependencies
npm install

# ایجاد فایل environment
cp .env.example .env.local

# ویرایش .env.local و اضافه کردن credentials Supabase
# VITE_SUPABASE_URL=your_url_here
# VITE_SUPABASE_ANON_KEY=your_key_here

# اجرای سرور توسعه
npm run dev

# باز کردن مرورگر در http://localhost:5173
```

### Build برای Production
```bash
# ساخت نسخه production
npm run build

# Preview نسخه production
npm run preview
```

---

## 🗄️ راه‌اندازی Supabase

### 1. ایجاد پروژه
1. به [supabase.com](https://supabase.com) بروید
2. یک حساب کاربری بسازید
3. پروژه جدید ایجاد کنید
4. منطقه (region) را انتخاب کنید (Europe پیشنهاد می‌شود)

### 2. دریافت Credentials
1. به Settings > API بروید
2. `Project URL` را کپی کنید → `VITE_SUPABASE_URL`
3. `anon public` key را کپی کنید → `VITE_SUPABASE_ANON_KEY`

### 3. ایجاد جداول Database

به SQL Editor بروید و این کوئری‌ها را اجرا کنید:

```sql
-- جدول کاربران (تکمیلی برای auth)
CREATE TABLE users (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- جدول دوچرخه‌ها
CREATE TABLE bikes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  hourly_rate INTEGER NOT NULL,
  daily_rate INTEGER NOT NULL,
  description TEXT,
  specs JSONB DEFAULT '{}',
  available_count INTEGER DEFAULT 0,
  image_url TEXT,
  rating NUMERIC(3,2) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- جدول ایستگاه‌ها
CREATE TABLE locations (
  id TEXT PRIMARY KEY,
  city TEXT NOT NULL,
  spot_name TEXT NOT NULL,
  address TEXT,
  latitude NUMERIC(10,8),
  longitude NUMERIC(11,8),
  bike_count INTEGER DEFAULT 0,
  opening_hours TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- جدول رزروها
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  bike_id TEXT REFERENCES bikes(id) NOT NULL,
  location_id TEXT REFERENCES locations(id) NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  duration_hours INTEGER NOT NULL,
  total_price INTEGER NOT NULL,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'active', 'completed', 'cancelled')) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- جدول علاقه‌مندی‌ها
CREATE TABLE favorites (
  user_id UUID REFERENCES users(id) NOT NULL,
  bike_id TEXT REFERENCES bikes(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, bike_id)
);

-- جدول نظرات
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  bike_id TEXT REFERENCES bikes(id) NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own bookings" ON bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own bookings" ON bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own favorites" ON favorites
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can create reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Public can view reviews" ON reviews
  FOR SELECT USING (true);
```

### 4. اضافه کردن داده‌های اولیه

داده‌های نمونه دوچرخه‌ها و ایستگاه‌ها را از فایل `src/lib/rental-data.ts` استخراج و Insert کنید.

---

## 🔐 تنظیم Authentication

### فعال‌سازی Email Auth
1. به Authentication > Providers بروید
2. Email را Enable کنید
3. تنظیمات SMTP را پیکربندی کنید (یا از Supabase Default استفاده کنید)

### فعال‌سازی Phone Auth (اختیاری)
1. به Authentication > Providers بروید
2. Phone را Enable کنید
3. تنظیمات SMS Provider را پیکربندی کنید

---

## 🚀 استقرار (Deployment)

### گزینه 1: Cloudflare Pages (توصیه شده)

```bash
# نصب Wrangler CLI
npm install -g wrangler

# لاگین به Cloudflare
wrangler login

# استقرار
npm run build
npx nitro deploy --prebuilt
```

یا از طریق Cloudflare Dashboard:
1. به [dash.cloudflare.com](https://dash.cloudflare.com) بروید
2. Workers & Pages > Create Application
3. Connect to Git
4. مخزن CycleX را انتخاب کنید
5. Build settings:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `.output/public`
6. Deploy

### گزینه 2: Vercel

```bash
# نصب Vercel CLI
npm install -g vercel

# لاگین
vercel login

# استقرار
vercel --prod
```

### گزینه 3: Netlify

```bash
# نصب Netlify CLI
npm install -g netlify-cli

# لاگین
netlify login

# استقرار
netlify deploy --prod
```

Build settings برای Netlify:
- Base directory: (خالی بگذارید)
- Build command: `npm run build`
- Publish directory: `.output/public`

---

## 🌐 دامنه و HTTPS

### اتصال دامنه سفارشی

#### Cloudflare Pages:
1. به Pages Project > Custom domains بروید
2. Add custom domain
3. دامنه خود را وارد کنید
4. DNS records را طبق دستورالعمل تنظیم کنید

#### Vercel:
1. به Project Settings > Domains بروید
2. دامنه خود را اضافه کنید
3. DNS records را تنظیم کنید

---

## 📊 Monitoring و Analytics

### اضافه کردن Vercel Analytics
```tsx
// در __root.tsx یا main.tsx
import { Analytics } from '@vercel/analytics/react';

<Analytics />
```

### اضافه کردن Sentry برای Error Tracking
```bash
npm install @sentry/react
```

```tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 1.0,
});
```

---

## 💳 درگاه پرداخت (ایران)

### زرین‌پال

```bash
npm install axios
```

```ts
// src/lib/payment.ts
import axios from 'axios';

export async function initiatePayment(amount: number, callbackUrl: string) {
  const response = await axios.post(
    'https://api.zarinpal.com/pg/v4/payment/request.json',
    {
      merchant_id: import.meta.env.VITE_ZARINPAL_MERCHANT_ID,
      amount, // به تومان
      callback_url: callbackUrl,
    }
  );
  
  return response.data.data.code; // Authority code
}

export function getPaymentUrl(authority: string) {
  return `https://www.zarinpal.com/pg/${authority}`;
}
```

### نکات مهم:
- برای تست از Sandbox زرین‌پال استفاده کنید
- پس از پرداخت، کاربر به callback_url هدایت می‌شود
- باید وضعیت پرداخت را verify کنید

---

## 📱 PWA (Progressive Web App)

برای اضافه کردن قابلیت نصب اپلیکیشن:

```bash
npm install vite-plugin-pwa
```

در `vite.config.ts`:
```ts
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'CycleX Rentals',
        short_name: 'CycleX',
        description: 'اجاره دوچرخه پریمیوم',
        theme_color: '#071015',
        background_color: '#071015',
        display: 'standalone',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
```

---

## 🔒 امنیت

### Environment Variables
هرگز این فایل‌ها را commit نکنید:
- `.env.local`
- `.env.production`
- `.env.*.local`

### Headers امنیتی

در `.output/public/_headers`:
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self' https:; img-src 'self' data: https: blob:;
```

---

## 📈 بهینه‌سازی Performance

### Image Optimization
```bash
npm install -D vite-plugin-image-optimizer
```

### Code Splitting
TanStack Router به صورت خودکار code splitting انجام می‌دهد.

### Lazy Loading
```tsx
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

---

## 🧪 Testing

```bash
# نصب Vitest
npm install -D vitest @testing-library/react @testing-library/jest-dom

# اضافه کردن script به package.json
"test": "vitest"
```

---

## 📝 چک‌لیست قبل از Launch

- [ ] Supabase پروژه ساخته شده
- [ ] جداول Database ایجاد شده‌اند
- [ ] Authentication تنظیم شده
- [ ] Environment variables تنظیم شده‌اند
- [ ] Build بدون خطا موفقیت‌آمیز بوده
- [ ] دامنه متصل شده
- [ ] SSL فعال است
- [ ] Analytics نصب شده
- [ ] Error tracking تنظیم شده
- [ ] Payment gateway تست شده
- [ ] Mobile responsive تست شده
- [ ] Performance audit انجام شده
- [ ] SEO meta tags بررسی شده
- [ ] Accessibility audit انجام شده

---

## 🆘 پشتیبانی

برای سؤالات و مشکلات:
- مستندات TanStack: https://tanstack.com
- مستندات Supabase: https://supabase.com/docs
- مستندات GSAP: https://greensock.com/docs

---

**ساخته شده با ❤️ برای رکاب‌زن‌های ایرانی**
