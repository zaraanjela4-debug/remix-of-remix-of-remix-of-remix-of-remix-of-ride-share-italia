import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Menu,
  X,
  Search,
  MapPin,
  CalendarDays,
  User,
  Bike,
  Zap,
  Mountain,
  Gauge,
  Settings2,
  Star,
  Headphones,
  CalendarCheck,
  Navigation,
} from "lucide-react";

import heroBike from "@/assets/hero-bike.jpg";
import bikeRoad from "@/assets/bike-road.jpg";
import bikeElectric from "@/assets/bike-electric.jpg";
import bikeMountain from "@/assets/bike-mountain.jpg";
import { useReveal } from "@/hooks/use-reveal";
import { useParallax } from "@/hooks/use-parallax";
import { EditableImage } from "@/components/editable-image";
import { BookingWizard } from "@/components/booking-wizard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ولوسیتی | اجاره دوچرخه لوکس در تهران" },
      {
        name: "description",
        content:
          "اجاره دوچرخه جاده، برقی و کوهستان به‌صورت ساعتی و روزانه. رزرو آنلاین، تحویل در محل، بیمه کامل.",
      },
      { property: "og:title", content: "ولوسیتی | اجاره دوچرخه لوکس در تهران" },
      {
        property: "og:description",
        content: "اجاره دوچرخه جاده، برقی و کوهستان با رزرو آنلاین و تحویل در محل.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const navItems = [
  { label: "ناوگان", href: "#models" },
  { label: "مزایا", href: "#services" },
  { label: "نظرات", href: "#reviews" },
  { label: "رزرو", href: "#booking" },
];

const tabs = ["اجاره کوتاه‌مدت", "اجاره بلندمدت", "تحویل ویژه"];

const models = [
  {
    name: "Road S",
    tag: "جاده",
    image: bikeRoad,
    icon: Bike,
    price: "۹۵٬۰۰۰",
    stars: 4,
    featured: false,
    specs: [
      { icon: Gauge, label: "۷.۴ کیلوگرم" },
      { icon: Settings2, label: "۲۲ سرعته" },
      { icon: Bike, label: "بدنه کربن" },
      { icon: Navigation, label: "شهری / جاده" },
    ],
  },
  {
    name: "E-Turbo",
    tag: "برقی",
    image: bikeElectric,
    icon: Zap,
    price: "۱۶۰٬۰۰۰",
    stars: 5,
    featured: true,
    specs: [
      { icon: Zap, label: "موتور ۲۵۰ وات" },
      { icon: Gauge, label: "برد ۱۲۰ کیلومتر" },
      { icon: Settings2, label: "شارژ ۳ ساعته" },
      { icon: Navigation, label: "همه‌کاره" },
    ],
  },
  {
    name: "Trail GT",
    tag: "کوهستان",
    image: bikeMountain,
    icon: Mountain,
    price: "۱۲۰٬۰۰۰",
    stars: 4,
    featured: false,
    specs: [
      { icon: Mountain, label: "کمک ۱۴۰ میل" },
      { icon: Settings2, label: "دیسک هیدرولیک" },
      { icon: Gauge, label: "لاستیک ۲.۶" },
      { icon: Navigation, label: "آفرود" },
    ],
  },
];

const advantages = [
  {
    icon: Headphones,
    title: "پشتیبانی ۲۴ ساعته",
    note: "هر زمان تماس بگیرید",
  },
  {
    icon: CalendarCheck,
    title: "رزرو در هر ساعت",
    note: "رزرو آنلاین شبانه‌روزی",
  },
  {
    icon: MapPin,
    title: "نقاط تحویل متعدد",
    note: "بیش از ۲۵۰ نقطه",
  },
];

const reviews = [
  {
    name: "سارا محمدی",
    role: "رکابزن شهری",
    text: "رزرو در دو دقیقه انجام شد و دوچرخه سر ساعت دم در بود. تمیز و کاملاً سرویس‌شده.",
  },
  {
    name: "امیر رضایی",
    role: "کوهنورد",
    text: "Trail GT برای مسیر دربند عالی بود. تنظیم کمک‌فنر را هم قبل تحویل انجام داده بودند.",
  },
  {
    name: "نگار کریمی",
    role: "مسافر",
    text: "برای سه روز E-Turbo گرفتم؛ شارژ و برد دقیقاً همان چیزی بود که گفته بودند.",
  },
];

function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useReveal<HTMLElement>();
  return (
    <section id={id} ref={ref} className={`reveal ${className}`}>
      {children}
    </section>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={`size-3.5 ${i < count ? "fill-bronze text-bronze" : "text-border"}`}
        />
      ))}
    </div>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tab, setTab] = useState(tabs[0]!);
  const [, setModel] = useState<string>(models[0]!.name);
  useParallax();

  const goToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };


  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
          <a href="#top" className="text-xl font-bold tracking-tight text-background">
            velocity
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-background/85 transition-colors duration-300 hover:text-background"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4 text-background">
            <Search className="hidden size-5 md:block" />
            <User className="hidden size-5 md:block" />
            <button
              type="button"
              aria-label={menuOpen ? "بستن منو" : "باز کردن منو"}
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden"
            >
              {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="mx-5 rounded-2xl bg-card shadow-elevated md:hidden">
            <ul className="divide-y divide-border">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block px-6 py-4 text-base text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      {/* Hero */}
      <section id="top" className="relative">
        <div className="relative mx-auto max-w-6xl md:px-8 md:pt-4">
          <div className="relative overflow-hidden md:rounded-3xl">
            <EditableImage
              src={heroBike}
              alt="رکاب زدن در مسیر ساحلی"
              label="تصویر هدر"
              className="h-[78svh] w-full md:h-[62vh]"
            />
            <div className="pointer-events-none absolute inset-0 bg-foreground/45" />
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-center px-6 pt-16 md:px-14">
              <h1 className="max-w-xl text-4xl leading-tight font-bold text-background md:text-6xl">
                دوچرخه‌ات منتظرِ توست
              </h1>
              <a
                href="#models"
                className="pointer-events-auto mt-6 inline-flex w-fit items-center gap-2 border-b border-background/60 pb-1 text-sm text-background"
              >
                اطلاعات بیشتر
                <span aria-hidden>←</span>
              </a>
              <div className="pointer-events-auto mt-10 flex flex-wrap gap-5 md:mt-14">
                {tabs.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTab(t)}
                    className={`pb-1 text-sm transition-colors duration-300 ${
                      tab === t
                        ? "border-b-2 border-bronze text-background"
                        : "border-b-2 border-transparent text-background/70"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={goToBooking}
                className="pointer-events-auto mt-10 inline-flex min-h-13 w-full max-w-xs items-center justify-center gap-2 rounded-xl bg-primary px-8 text-base text-primary-foreground shadow-elevated transition-opacity duration-300 hover:opacity-90 active:opacity-80"
              >
                اجاره دوچرخه
                <span aria-hidden>↓</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search card */}
        <div className="mx-auto -mt-8 max-w-5xl px-5 md:-mt-10 md:px-8">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="grid gap-3 rounded-2xl bg-card p-4 shadow-elevated md:grid-cols-[1.4fr_1fr_1fr_auto] md:items-center md:gap-0 md:p-3"
          >
            <label className="flex items-center gap-3 px-2 py-2 md:border-e md:border-border">
              <MapPin className="size-4 shrink-0 text-bronze" />
              <input
                placeholder="محل تحویل"
                aria-label="محل تحویل"
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/50"
              />
            </label>
            <label className="flex items-center gap-3 px-2 py-2 md:border-e md:border-border">
              <CalendarDays className="size-4 shrink-0 text-foreground/60" />
              <input
                type="date"
                aria-label="تاریخ تحویل"
                className="w-full bg-transparent text-sm text-foreground outline-none"
              />
            </label>
            <label className="flex items-center gap-3 px-2 py-2">
              <CalendarDays className="size-4 shrink-0 text-foreground/60" />
              <input
                type="date"
                aria-label="تاریخ بازگشت"
                className="w-full bg-transparent text-sm text-foreground outline-none"
              />
            </label>
            <a
              href="#models"
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 text-sm font-medium text-primary-foreground transition-opacity duration-300 hover:opacity-90"
            >
              جست‌وجوی دوچرخه
              <Search className="size-4" />
            </a>
          </form>
        </div>
      </section>

      {/* Fleet */}
      <Section id="models" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <h2 className="text-center text-2xl text-foreground md:text-3xl">
          ناوگان <span className="font-bold">ما</span>
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {models.map((m) => (
            <article
              key={m.name}
              data-reveal
              data-parallax="1"
              className={`reveal rounded-2xl bg-card p-6 transition-shadow duration-500 will-change-transform ${
                m.featured ? "shadow-elevated md:-mt-4 md:pb-9" : "shadow-soft hover:shadow-elevated"
              }`}
            >
              <EditableImage
                src={m.image}
                alt={`دوچرخه ${m.name}`}
                label={`تصویر ${m.name}`}
                className="mx-auto aspect-4/3 w-full rounded-xl"
              />
              <h3 className="mt-6 text-center text-lg font-bold text-card-foreground">{m.name}</h3>
              <p className="mt-1 text-center text-xs text-bronze text-wide">{m.tag}</p>

              <ul className="mt-5 grid grid-cols-2 gap-2">
                {m.specs.map((s) => (
                  <li
                    key={s.label}
                    className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-xs text-foreground/80"
                  >
                    <s.icon className="size-3.5 shrink-0 text-foreground/60" />
                    {s.label}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center justify-between">
                <Stars count={m.stars} />
                <p className="text-lg font-bold text-card-foreground">
                  {m.price}
                  <span className="ms-1 text-[0.7rem] font-normal text-foreground/60">
                    تومان / روز
                  </span>
                </p>
              </div>

              <a
                href="#booking"
                onClick={() => setModel(m.name)}
                className={`mt-5 flex min-h-11 items-center justify-center gap-2 rounded-lg text-sm transition-colors duration-300 ${
                  m.featured
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                رزرو دوچرخه
                <span aria-hidden>←</span>
              </a>
            </article>
          ))}
        </div>
      </Section>

      {/* Advantages */}
      <Section id="services" className="bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <h2 className="text-center text-2xl font-bold text-foreground md:text-3xl">مزایا</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {advantages.map((a, i) => (
              <div
                key={a.title}
                data-reveal
                data-parallax="0.6"
                className={`reveal flex flex-col items-center px-6 py-12 text-center ${
                  i === 1 ? "bg-foreground text-background" : "bg-card text-foreground"
                }`}
              >
                <a.icon className={`size-8 ${i === 1 ? "text-bronze" : "text-bronze"}`} />
                <h3 className="mt-6 text-base leading-7">{a.title}</h3>
                <p className={`mt-3 text-xs ${i === 1 ? "text-background/70" : "text-foreground/60"}`}>
                  {a.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Reviews */}
      <Section id="reviews" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <h2 className="text-center text-2xl text-foreground md:text-3xl">
          مشتریان <span className="font-bold">چه می‌گویند</span>
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <figure
              key={r.name}
              data-reveal
              data-parallax="0.6"
              className="reveal rounded-2xl bg-card p-7 shadow-soft"
            >
              <Stars count={5} />
              <blockquote className="mt-4 text-sm leading-8 text-foreground/80">{r.text}</blockquote>
              <figcaption className="mt-5 border-t border-border pt-4">
                <span className="block text-sm font-bold text-foreground">{r.name}</span>
                <span className="block text-xs text-foreground/60">{r.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* Booking */}
      <Section id="booking" className="bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <h2 className="text-center text-2xl font-bold text-foreground md:text-3xl">
            رزرو دوچرخه
          </h2>
          <p className="mt-3 text-center text-sm text-foreground/60">
            مرحله به مرحله شهر، روز، ساعت، پکیج و دوچرخه‌ها را انتخاب کنید.
          </p>

          <div className="mt-10">
            <BookingWizard />
          </div>
        </div>
      </Section>


      <footer className="bg-foreground px-5 pt-14 pb-28 text-background md:px-8 md:pb-14">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <span className="text-lg font-bold">velocity</span>
          <p className="text-xs text-background/70">
            تهران، خیابان ولیعصر · ۰۲۱ ۲۲۰۰ ۴۵۶۷ · هر روز ۸ تا ۲۲
          </p>
        </div>
      </footer>

      {/* Mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/90 px-5 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
        <a
          href="#booking"
          className="flex min-h-13 w-full items-center justify-center rounded-xl bg-primary text-base text-primary-foreground transition-opacity duration-300 active:opacity-80"
        >
          رزرو دوچرخه
        </a>
      </div>
    </div>
  );
}
