import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, CreditCard, Headphones, MapPin, Shield, User } from "lucide-react";

import { PageHeader } from "@/components/app-ui";
import { stats } from "@/lib/rental-data";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "پروفایل و پشتیبانی | CycleX" },
      { name: "description", content: "حساب کاربری، روش پرداخت، اعلان‌ها و پشتیبانی ۲۴ ساعته." },
      { property: "og:title", content: "پروفایل و پشتیبانی | CycleX" },
      { property: "og:description", content: "مدیریت حساب و ارتباط با پشتیبانی CycleX." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfilePage,
});

const rows = [
  { icon: CreditCard, label: "روش پرداخت", note: "کارت بانکی · کیف پول" },
  { icon: MapPin, label: "آدرس‌های من", note: "۲ آدرس ذخیره‌شده" },
  { icon: Bell, label: "اعلان‌ها", note: "فعال" },
  { icon: Shield, label: "بیمه و قوانین", note: "پوشش کامل حوادث" },
];

function ProfilePage() {
  return (
    <main className="mx-auto max-w-md px-4 pb-32">
      <PageHeader title="پروفایل" />

      <div className="glass flex items-center gap-3 rounded-2xl p-4">
        <span className="grid size-14 place-items-center rounded-full border border-primary text-primary">
          <User className="size-6" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">مهمان CycleX</p>
          <p className="truncate text-xs text-muted-foreground">۰۹۱۲ ··· ۴۵۶۷</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="glass rounded-2xl p-4 text-center">
            <p className="text-lg font-bold text-primary">{s.value}</p>
            <p className="mt-1 text-[0.7rem] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <ul className="mt-4 space-y-2">
        {rows.map((r) => (
          <li key={r.label} className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
            <r.icon className="size-4 shrink-0 text-primary" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm">{r.label}</span>
              <span className="block truncate text-[0.7rem] text-muted-foreground">{r.note}</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="glass mt-4 rounded-2xl p-5 text-center">
        <Headphones className="mx-auto size-6 text-primary" />
        <p className="mt-3 text-sm">پشتیبانی ۲۴ ساعته</p>
        <p className="mt-1 text-xs text-muted-foreground">هر ساعت از شبانه‌روز پاسخگوی شما هستیم.</p>
        <a
          href="tel:02122004567"
          className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground"
        >
          تماس با پشتیبانی
        </a>
      </div>

      <Link to="/bookings" className="mt-4 block text-center text-sm text-primary">
        مشاهده رزروها
      </Link>
    </main>
  );
}
