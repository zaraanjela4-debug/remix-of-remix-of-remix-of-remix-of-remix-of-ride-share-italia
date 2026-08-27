import { useMemo, useState } from "react";
import { Check, ChevronLeft, MapPin, Minus, Plus, ShoppingBasket } from "lucide-react";

import { EditableImage } from "@/components/editable-image";
import cityTehran from "@/assets/city-tehran.jpg";
import cityIsfahan from "@/assets/city-isfahan.jpg";
import cityShiraz from "@/assets/city-shiraz.jpg";
import cityMashhad from "@/assets/city-mashhad.jpg";
import cityTabriz from "@/assets/city-tabriz.jpg";
import cityKish from "@/assets/city-kish.jpg";
import bikeAdult26 from "@/assets/bike-adult26.jpg";
import bikeAdult26g from "@/assets/bike-adult26g.jpg";
import bikeKid from "@/assets/bike-kid.jpg";
import bikeTandem from "@/assets/bike-tandem.jpg";
import bikeTrike from "@/assets/bike-trike.jpg";
import scooterElectric from "@/assets/scooter-electric.jpg";

const cities = [
  { name: "تهران", spot: "بوستان آب و آتش", image: cityTehran },
  { name: "اصفهان", spot: "پل خواجو", image: cityIsfahan },
  { name: "شیراز", spot: "دروازه قرآن", image: cityShiraz },
  { name: "مشهد", spot: "بوستان کوهسنگی", image: cityMashhad },
  { name: "تبریز", spot: "ائل‌گلی", image: cityTabriz },
  { name: "کیش", spot: "ساحل مرجان", image: cityKish },
];

const times = [
  "۰۸:۰۰",
  "۰۹:۰۰",
  "۱۰:۰۰",
  "۱۱:۰۰",
  "۱۲:۰۰",
  "۱۴:۰۰",
  "۱۵:۰۰",
  "۱۶:۰۰",
  "۱۷:۰۰",
  "۱۸:۰۰",
  "۱۹:۰۰",
  "۲۰:۰۰",
];

const packages = [
  { label: "۳۰ دقیقه", hours: 0.5 },
  { label: "۱ ساعت", hours: 1 },
  { label: "۱:۳۰", hours: 1.5 },
  { label: "۲ ساعت", hours: 2 },
  { label: "۳ ساعت", hours: 3 },
  { label: "۴ ساعت", hours: 4 },
  { label: "روزانه", hours: 8 },
];

const bikes = [
  { id: "adult26", name: "دوچرخه بزرگسال ۲۶ معمولی", hourly: 60000, image: bikeAdult26 },
  { id: "adult26g", name: "دوچرخه بزرگسال ۲۶ دنده‌ای", hourly: 85000, image: bikeAdult26g },
  { id: "kid", name: "دوچرخه کودک", hourly: 40000, image: bikeKid },
  { id: "tandem", name: "دوچرخه دونفره", hourly: 130000, image: bikeTandem },
  { id: "trike", name: "سه‌چرخه بزرگسال", hourly: 110000, image: bikeTrike },
  { id: "scooter", name: "اسکوتر برقی", hourly: 150000, image: scooterElectric },
];

const fa = (n: number) => n.toLocaleString("fa-IR");

function upcomingDays(count = 10) {
  const out: { key: string; weekday: string; day: string; month: string }[] = [];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    out.push({
      key: d.toISOString().slice(0, 10),
      weekday: new Intl.DateTimeFormat("fa-IR", { weekday: "short" }).format(d),
      day: new Intl.DateTimeFormat("fa-IR", { day: "numeric" }).format(d),
      month: new Intl.DateTimeFormat("fa-IR", { month: "long" }).format(d),
    });
  }
  return out;
}

function StepHeader({ index, title }: { index: number; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-xs text-primary-foreground">
        {fa(index)}
      </span>
      <h3 className="min-w-0 truncate text-base font-bold text-foreground">{title}</h3>
    </div>
  );
}

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-11 rounded-xl border px-4 text-sm transition-colors duration-300 ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-foreground hover:border-bronze"
      }`}
    >
      {children}
    </button>
  );
}

export function BookingWizard() {
  const days = useMemo(() => upcomingDays(), []);
  const [city, setCity] = useState<string | null>(null);
  const [day, setDay] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [pack, setPack] = useState<string | null>(null);
  const [qty, setQty] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);

  const hours = packages.find((p) => p.label === pack)?.hours ?? 0;
  const items = bikes
    .map((b) => ({ ...b, count: qty[b.id] ?? 0 }))
    .filter((b) => b.count > 0)
    .map((b) => ({ ...b, total: Math.round(b.hourly * hours) * b.count }));
  const grand = items.reduce((s, i) => s + i.total, 0);
  const ready = Boolean(city && day && time && pack && items.length);

  const selectedDay = days.find((d) => d.key === day);

  return (
    <div className="space-y-4">
      {/* 1. City */}
      <div className="rounded-2xl bg-card p-5 shadow-soft">
        <StepHeader index={1} title="انتخاب شهر" />
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          {cities.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setCity(c.name)}
              className={`flex min-h-14 flex-col items-start justify-center rounded-xl border px-3 text-start transition-colors duration-300 ${
                city === c.name
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-bronze"
              }`}
            >
              <span className="flex items-center gap-1.5 text-sm">
                <MapPin className="size-3.5 shrink-0" />
                {c.name}
              </span>
              <span
                className={`mt-0.5 text-[0.7rem] ${city === c.name ? "text-primary-foreground/75" : "text-foreground/55"}`}
              >
                {c.spot}
              </span>
            </button>
          ))}
        </div>
      </div>

      {city && (
        <div className="animate-fade-in space-y-4">
          {/* City panel */}
          <div className="overflow-hidden rounded-2xl bg-card shadow-soft">
            <EditableImage
              src={cities.find((c) => c.name === city)?.image}
              alt={`ایستگاه اجاره در ${city}`}
              className="aspect-16/9 w-full"
              label={`تصویر ایستگاه ${city}`}
            />
            <div className="flex items-center justify-between gap-3 p-4">
              <p className="min-w-0 truncate text-sm text-foreground">
                ایستگاه {city} — {cities.find((c) => c.name === city)?.spot}
              </p>
              <button
                type="button"
                onClick={() => setCity(null)}
                className="shrink-0 text-xs text-bronze"
              >
                تغییر شهر
              </button>
            </div>
          </div>

          {/* 2. Day */}
          <div className="rounded-2xl bg-card p-5 shadow-soft">
            <StepHeader index={2} title="انتخاب روز" />
            <div className="mt-4 -mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1">
              {days.map((d) => (
                <button
                  key={d.key}
                  type="button"
                  onClick={() => setDay(d.key)}
                  className={`flex min-w-18 shrink-0 snap-start flex-col items-center gap-0.5 rounded-xl border px-3 py-3 transition-colors duration-300 ${
                    day === d.key
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:border-bronze"
                  }`}
                >
                  <span className="text-[0.7rem] opacity-70">{d.weekday}</span>
                  <span className="text-lg font-bold">{d.day}</span>
                  <span className="text-[0.65rem] opacity-70">{d.month}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Time */}
          <div className="rounded-2xl bg-card p-5 shadow-soft">
            <StepHeader index={3} title="انتخاب ساعت حرکت" />
            <div className="mt-4 grid grid-cols-3 gap-2.5 sm:grid-cols-4">
              {times.map((t) => (
                <Chip key={t} active={time === t} onClick={() => setTime(t)}>
                  {t}
                </Chip>
              ))}
            </div>
          </div>

          {/* 4. Package */}
          <div className="rounded-2xl bg-card p-5 shadow-soft">
            <StepHeader index={4} title="انتخاب پکیج" />
            <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {packages.map((p) => (
                <Chip key={p.label} active={pack === p.label} onClick={() => setPack(p.label)}>
                  {p.label}
                </Chip>
              ))}
            </div>
          </div>

          {/* 5. Bikes */}
          <div className="rounded-2xl bg-card p-5 shadow-soft">
            <StepHeader index={5} title="انتخاب دوچرخه" />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {bikes.map((b) => {
                const count = qty[b.id] ?? 0;
                return (
                  <div
                    key={b.id}
                    className="overflow-hidden rounded-xl border border-border bg-card"
                  >
                    <EditableImage
                      src={b.image}
                      alt={b.name}
                      className="aspect-4/3 w-full"
                      label={`تصویر ${b.name}`}
                    />
                    <div className="p-3">
                      <p className="text-sm text-foreground">{b.name}</p>
                      <p className="mt-1 text-xs text-foreground/60">
                        {fa(b.hourly)} تومان / ساعت
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <button
                          type="button"
                          aria-label={`کاهش ${b.name}`}
                          onClick={() =>
                            setQty((q) => ({ ...q, [b.id]: Math.max(0, (q[b.id] ?? 0) - 1) }))
                          }
                          className="grid size-10 place-items-center rounded-lg border border-border text-foreground transition-colors duration-300 hover:border-bronze disabled:opacity-40"
                          disabled={count === 0}
                        >
                          <Minus className="size-4" />
                        </button>
                        <span className="text-base font-bold text-foreground">{fa(count)}</span>
                        <button
                          type="button"
                          aria-label={`افزایش ${b.name}`}
                          onClick={() => setQty((q) => ({ ...q, [b.id]: (q[b.id] ?? 0) + 1 }))}
                          className="grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground transition-opacity duration-300 hover:opacity-90"
                        >
                          <Plus className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 6. Cart */}
          <div className="rounded-2xl border border-bronze/40 bg-card p-5 shadow-soft">
            <StepHeader index={6} title="سبد اجاره" />
            <div className="mt-4 space-y-3">
              <div className="flex flex-wrap gap-2 text-xs text-foreground/70">
                <span className="rounded-lg bg-secondary px-3 py-1.5">شهر: {city}</span>
                <span className="rounded-lg bg-secondary px-3 py-1.5">
                  روز: {selectedDay ? `${selectedDay.day} ${selectedDay.month}` : "—"}
                </span>
                <span className="rounded-lg bg-secondary px-3 py-1.5">ساعت: {time ?? "—"}</span>
                <span className="rounded-lg bg-secondary px-3 py-1.5">پکیج: {pack ?? "—"}</span>
              </div>

              {items.length === 0 ? (
                <p className="flex items-center gap-2 py-4 text-sm text-foreground/55">
                  <ShoppingBasket className="size-4" />
                  هنوز دوچرخه‌ای انتخاب نشده است.
                </p>
              ) : (
                <ul className="divide-y divide-border">
                  {items.map((i) => (
                    <li key={i.id} className="flex items-center justify-between gap-3 py-3">
                      <span className="min-w-0 text-sm text-foreground">
                        {i.name}
                        <span className="text-foreground/55"> × {fa(i.count)}</span>
                      </span>
                      <span className="shrink-0 text-sm font-bold text-foreground">
                        {fa(i.total)} تومان
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex items-center justify-between border-t border-border pt-3">
                <span className="text-sm text-foreground/70">جمع کل</span>
                <span className="text-lg font-bold text-foreground">{fa(grand)} تومان</span>
              </div>
            </div>

            <button
              type="button"
              disabled={!ready}
              onClick={() => setDone(true)}
              className="mt-5 flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-primary text-base text-primary-foreground transition-opacity duration-300 hover:opacity-90 disabled:opacity-40"
            >
              پرداخت و اجاره
              <ChevronLeft className="size-4" />
            </button>
            {done && (
              <p className="mt-3 flex items-center justify-center gap-2 text-sm text-primary">
                <Check className="size-4" />
                رزرو ثبت شد؛ برای تأیید نهایی تماس می‌گیریم.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
