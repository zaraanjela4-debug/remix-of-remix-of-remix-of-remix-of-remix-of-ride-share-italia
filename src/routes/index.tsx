import { createFileRoute, Link } from "@tanstack/react-router";
import { Bike, Headphones, MapPin, Percent, ShieldCheck, Zap } from "lucide-react";

import { HeroSequence } from "@/components/hero-sequence";
import { BikeCard, Rating, SectionTitle } from "@/components/app-ui";
import { EditableImage } from "@/components/editable-image";
import { BookingWizard } from "@/components/booking-wizard";
import { useFavorites } from "@/hooks/use-favorites";
import { bikes, categories, fa, locations, reviews, stats } from "@/lib/rental-data";
import promoDark from "@/assets/promo-dark.jpg";
import storyboardHero from "@/assets/storyboard-hero.png";
import storyboardFrames from "@/assets/storyboard-frames.png";
import appShowcase from "@/assets/app-showcase.png";

const gallery = [
  { src: storyboardHero, alt: "استوری‌بورد کامل هیرو اسکرول CycleX در ۱۲ فریم" },
  { src: storyboardFrames, alt: "فریم‌های سکانس سینمایی هیرو CycleX" },
  { src: appShowcase, alt: "نمای کلی رابط کاربری اپلیکیشن اجاره دوچرخه CycleX" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CycleX | اجاره دوچرخه پریمیوم، ساعتی و روزانه" },
      {
        name: "description",
        content:
          "اجاره دوچرخه کوهستان، برقی و جاده در ۶ شهر ایران. رزرو آنلاین، تحویل در ایستگاه، بیمه کامل.",
      },
      { property: "og:title", content: "CycleX | اجاره دوچرخه پریمیوم" },
      {
        property: "og:description",
        content: "تجربه‌ی سینمایی انتخاب و رزرو دوچرخه؛ ساعتی، روزانه و در ۶ شهر.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const perks = [
  { icon: ShieldCheck, title: "بیمه کامل", note: "پوشش حوادث در تمام مسیرها" },
  { icon: Headphones, title: "پشتیبانی ۲۴/۷", note: "همیشه در دسترس" },
  { icon: Zap, title: "تحویل سریع", note: "کمتر از ۱۵ دقیقه" },
];

function Index() {
  const { toggle, has } = useFavorites();
  const goBooking = () =>
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="min-h-screen bg-background">
      <HeroSequence onBook={goBooking} />

      <main className="relative z-10 mx-auto max-w-md bg-background px-4 pb-32">
        {/* Categories */}
        <section className="pt-10">
          <SectionTitle title="دسته‌بندی‌ها" linkTo="/bikes" />
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
            {categories.map((c) => (
              <Link
                key={c}
                to="/bikes"
                className="shrink-0 rounded-full border border-border px-4 py-2 text-xs text-muted-foreground transition-colors duration-300 hover:border-primary hover:text-primary"
              >
                {c}
              </Link>
            ))}
          </div>
        </section>

        {/* Fleet */}
        <section className="pt-8">
          <SectionTitle title="پرطرفدارترین دوچرخه‌ها" linkTo="/bikes" />
          <div className="grid grid-cols-2 gap-3">
            {bikes.slice(0, 4).map((b) => (
              <BikeCard key={b.id} bike={b} favorite={has(b.id)} onToggleFavorite={toggle} />
            ))}
          </div>
        </section>

        {/* Locations */}
        <section className="pt-10">
          <SectionTitle title="ایستگاه‌های نزدیک" linkTo="/locations" />
          <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
            {locations.map((l) => (
              <Link
                key={l.id}
                to="/locations"
                className="glass w-40 shrink-0 overflow-hidden rounded-2xl"
              >
                <EditableImage src={l.image} alt={l.city} className="aspect-4/3 w-full" />
                <div className="p-3">
                  <p className="truncate text-sm">{l.city}</p>
                  <p className="truncate text-[0.7rem] text-muted-foreground">{l.spot}</p>
                  <p className="mt-1 flex items-center gap-1 text-[0.7rem] text-primary">
                    <MapPin className="size-3" />
                    {fa(l.km)} کیلومتر
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Promotion */}
        <section className="pt-10">
          <div className="glass relative overflow-hidden rounded-3xl">
            <img
              src={promoDark}
              alt="پیشنهاد ویژه اجاره دوچرخه"
              loading="lazy"
              decoding="async"
              className="h-44 w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 flex flex-col justify-center gap-2 p-5">
              <span className="inline-flex w-fit items-center gap-1 rounded-full bg-primary px-3 py-1 text-[0.65rem] font-bold text-primary-foreground">
                <Percent className="size-3" /> ۳۰٪ تخفیف آخر هفته
              </span>
              <h3 className="text-xl font-bold">دو ساعت رکاب، یک ساعت مهمان ما</h3>
              <button
                type="button"
                onClick={goBooking}
                className="mt-2 inline-flex w-fit min-h-10 items-center rounded-xl border border-primary px-4 text-xs text-primary"
              >
                استفاده از پیشنهاد
              </button>
            </div>
          </div>
        </section>

        {/* Perks */}
        <section className="grid grid-cols-3 gap-2 pt-10">
          {perks.map((p) => (
            <div key={p.title} className="glass rounded-2xl p-4 text-center">
              <p.icon className="mx-auto size-5 text-primary" />
              <p className="mt-2 text-[0.75rem]">{p.title}</p>
              <p className="mt-1 text-[0.6rem] text-muted-foreground">{p.note}</p>
            </div>
          ))}
        </section>

        {/* Booking */}
        <section id="booking" className="scroll-mt-6 pt-10">
          <SectionTitle title="رزرو دوچرخه" />
          <BookingWizard />
        </section>

        {/* Reviews */}
        <section className="pt-10">
          <SectionTitle title="نظر رکاب‌زن‌ها" />
          <div className="space-y-3">
            {reviews.map((r) => (
              <figure key={r.name} className="glass rounded-2xl p-4">
                <Rating value={r.rating} />
                <blockquote className="mt-2 text-sm leading-7 text-muted-foreground">
                  {r.text}
                </blockquote>
                <figcaption className="mt-2 text-xs">{r.name}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Stats + support */}
        <section className="grid grid-cols-2 gap-3 pt-10">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-4 text-center">
              <p className="text-lg font-bold text-primary">{s.value}</p>
              <p className="mt-1 text-[0.7rem] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </section>

        <section className="glass mt-6 rounded-2xl p-5 text-center">
          <Bike className="mx-auto size-6 text-primary" />
          <p className="mt-3 text-sm">سؤالی دارید؟</p>
          <p className="mt-1 text-xs text-muted-foreground">
            تیم پشتیبانی CycleX شبانه‌روز پاسخگوی شماست.
          </p>
          <Link to="/profile" className="mt-4 inline-block text-sm text-primary">
            رفتن به پشتیبانی
          </Link>
        </section>
      </main>
    </div>
  );
}
