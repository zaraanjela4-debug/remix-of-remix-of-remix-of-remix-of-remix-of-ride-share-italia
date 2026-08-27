import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ChevronLeft, MapPin, Menu } from "lucide-react";

import heroDark from "@/assets/hero-dark.jpg";
import heroBike from "@/assets/hero-bike.jpg";
import bikeMountain from "@/assets/bike-mountain.jpg";
import bikeRoad from "@/assets/bike-road.jpg";
import bikeElectric from "@/assets/bike-electric.jpg";
import promoDark from "@/assets/promo-dark.jpg";

/** 12 storyboard beats — labels shown in the cinematic progress readout. */
const beats = [
  { p: 0, label: "نمای باز" },
  { p: 10, label: "نزدیک شدن دوربین" },
  { p: 20, label: "رکابزن نزدیک می‌شود" },
  { p: 30, label: "تمرکز روی دوچرخه" },
  { p: 45, label: "چرخش سه‌بعدی" },
  { p: 60, label: "جزئیات نزدیک" },
  { p: 70, label: "عبور دوربین" },
  { p: 80, label: "گشایش منظره" },
  { p: 88, label: "ناوگان دوچرخه" },
  { p: 94, label: "لایه‌های رابط" },
  { p: 97, label: "آماده رزرو" },
  { p: 100, label: "ورود به اپلیکیشن" },
];

const categories = ["کوهستان", "برقی", "جاده", "کودک", "بیشتر"];

export function HeroSequence({ onBook }: { onBook: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el || typeof window === "undefined") return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPower =
      (navigator.hardwareConcurrency ?? 8) <= 2 ||
      (navigator as unknown as { deviceMemory?: number }).deviceMemory === 0.5;
    if (prefersReduced || lowPower) {
      setReduced(true);
      return;
    }

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const q = gsap.utils.selector(el);
        const readout = el.querySelector<HTMLElement>("[data-readout]");
        const pct = el.querySelector<HTMLElement>("[data-pct]");
        const bar = el.querySelector<HTMLElement>("[data-bar]");

        gsap.set(q("[data-layer]"), { willChange: "transform, opacity" });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom bottom",
            pin: q("[data-stage]")[0]!,
            pinSpacing: false,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const v = Math.round(self.progress * 100);
              if (pct) pct.textContent = `${v.toLocaleString("fa-IR")}٪`;
              if (bar) bar.style.transform = `scaleX(${self.progress})`;
              const beat = [...beats].reverse().find((b) => v >= b.p) ?? beats[0]!;
              if (readout && readout.textContent !== beat.label) readout.textContent = beat.label;
            },
          },
        });

        // 0 → 30%  camera push-in, rider approaches
        tl.fromTo("[data-layer='bg']", { scale: 1.05, yPercent: 0 }, { scale: 1.45, yPercent: -6 }, 0)
          .fromTo("[data-layer='mid']", { scale: 1, yPercent: 4, opacity: 1 }, { scale: 1.9, yPercent: -10 }, 0)
          .fromTo("[data-layer='rider']", { scale: 0.55, yPercent: 14, opacity: 0.9 }, { scale: 1.5, yPercent: -4, opacity: 1 }, 0)
          .to("[data-layer='fg']", { yPercent: 30, scale: 1.6 }, 0)
          .fromTo("[data-layer='headline']", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 8 }, 2)

          // 30 → 45%  bike in focus, camera slides sideways
          .to("[data-layer='rider']", { xPercent: -18, scale: 2.1 }, 30)
          .to("[data-layer='bg']", { scale: 1.6, xPercent: 6 }, 30)

          // 45 → 60%  dynamic 3D rotation + extreme close-up
          .fromTo(
            "[data-layer='bike']",
            { opacity: 0, rotateY: -55, rotateX: 8, scale: 0.85, z: -260 },
            { opacity: 1, rotateY: 6, rotateX: 0, scale: 1.25, z: 60, duration: 15 },
            42,
          )
          .to("[data-layer='rider']", { opacity: 0, scale: 2.6, duration: 10 }, 44)
          .to("[data-layer='bike']", { scale: 2.1, rotateY: 18, z: 220, duration: 10 }, 58)

          // 70 → 80%  camera passes the bike, world opens up
          .to("[data-layer='bike']", { xPercent: -70, opacity: 0, scale: 3, duration: 8 }, 68)
          .fromTo(
            "[data-layer='vista']",
            { opacity: 0, scale: 1.35, yPercent: 6 },
            { opacity: 1, scale: 1.05, yPercent: 0, duration: 14 },
            68,
          )
          .to("[data-layer='bg']", { opacity: 0.25, duration: 10 }, 70)
          .to("[data-layer='headline']", { opacity: 0, y: -30, duration: 6 }, 72)

          // 80 → 88%  floating bike collection on the podium
          .fromTo(
            "[data-layer='title2']",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 6 },
            80,
          )
          .fromTo(
            "[data-layer='podium']",
            { opacity: 0, scale: 0.7, yPercent: 22, rotateX: 26 },
            { opacity: 1, scale: 1, yPercent: 0, rotateX: 10, duration: 10 },
            80,
          )
          .fromTo(
            q("[data-bike-item]"),
            { opacity: 0, yPercent: 40, scale: 0.8 },
            { opacity: 1, yPercent: 0, scale: 1, duration: 8, stagger: 1.6 },
            82,
          )

          // 88 → 97%  UI layers fade in
          .fromTo(
            q("[data-chip]"),
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 4, stagger: 0.6 },
            88,
          )
          .fromTo("[data-layer='price']", { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 4 }, 92)
          .fromTo("[data-layer='place']", { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 4 }, 94)
          .fromTo("[data-layer='cta']", { scale: 0.9, opacity: 0.6 }, { scale: 1, opacity: 1, duration: 3 }, 96)
          .fromTo("[data-layer='scrollhint']", { opacity: 1 }, { opacity: 0, duration: 4 }, 18)

          // 97 → 100%  seamless hand-off to the app
          .to("[data-layer='vista']", { opacity: 0.35, scale: 1, duration: 3 }, 97)
          .fromTo("[data-layer='outro']", { opacity: 0 }, { opacity: 1, duration: 3 }, 97);
      }, el);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={root} className="relative h-[900svh] bg-background" data-hero>
      <div
        data-stage
        className="sticky top-0 h-[100svh] w-full overflow-hidden [perspective:1200px] [transform-style:preserve-3d]"
      >
        {/* background landscape */}
        <img
          data-layer="bg"
          src={heroDark}
          alt="مسیر کوهستانی در سپیده‌دم"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* midground haze */}
        <div
          data-layer="mid"
          className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_20%,transparent,var(--background)_78%)]"
        />
        {/* rider */}
        <img
          data-layer="rider"
          src={heroBike}
          alt="رکابزن در مسیر"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover mix-blend-lighten opacity-90"
        />
        {/* hero bike (3D rotation stage) */}
        <div
          data-layer="bike"
          className="absolute inset-0 flex items-center justify-center opacity-0 [transform-style:preserve-3d]"
        >
          <img
            src={bikeMountain}
            alt="دوچرخه کوهستان پریمیوم"
            decoding="async"
            className="h-[46svh] w-[92%] rounded-3xl object-cover glow-ring"
          />
        </div>
        {/* revealed vista */}
        <img
          data-layer="vista"
          src={promoDark}
          alt="منظره شهر از بالای تپه"
          decoding="async"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-0"
        />
        {/* foreground vignette */}
        <div
          data-layer="fg"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,var(--background)_4%,transparent_55%)]"
        />
        <div className="pointer-events-none absolute inset-0 bg-foreground/10" />

        {/* ——— real HTML/UI layers ——— */}
        <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 pt-[calc(env(safe-area-inset-top)+1rem)]">
          <span className="text-sm font-bold tracking-[0.25em] text-foreground">
            CYCLE<span className="text-primary">X</span>
          </span>
          <Menu className="size-5 text-foreground" />
        </header>

        {/* progress readout */}
        <div className="absolute inset-x-5 top-[calc(env(safe-area-inset-top)+3.2rem)] z-30">
          <div className="flex items-center justify-between text-[0.6rem] text-muted-foreground text-wide">
            <span data-readout>نمای باز</span>
            <span data-pct className="text-primary">
              ۰٪
            </span>
          </div>
          <div className="mt-2 h-px w-full bg-border">
            <div data-bar className="h-px origin-right bg-primary" style={{ transform: "scaleX(0)" }} />
          </div>
        </div>

        {/* act one headline */}
        <div
          data-layer="headline"
          className="absolute inset-x-6 bottom-32 z-20 md:inset-x-14"
        >
          <h1 className="text-5xl leading-[1.05] font-bold text-foreground">
            بی‌مرز
            <br />
            رکاب
            <br />
            <span className="text-primary">بزن</span>
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">دوچرخه‌های پریمیوم برای هر ماجراجویی</p>
          <div data-layer="scrollhint" className="mt-7 flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <ArrowDown className="size-4" />
            </span>
            <span className="text-[0.65rem] text-foreground/80 text-wide">برای کشف اسکرول کنید</span>
          </div>
        </div>

        {/* act two — collection + interface */}
        <div className="pointer-events-none absolute inset-x-5 bottom-0 z-20 pb-[calc(env(safe-area-inset-bottom)+1.25rem)]">
          <div data-layer="title2" className="opacity-0">
            <h2 className="text-2xl font-bold text-foreground">دوچرخه‌های پریمیوم</h2>
            <p className="mt-1 text-sm text-primary">برای هر رکابزن</p>
          </div>

          <div
            data-layer="podium"
            className="relative mt-5 flex h-[26svh] items-end justify-center gap-3 opacity-0 [transform-style:preserve-3d]"
          >
            {[bikeMountain, bikeElectric, bikeRoad].map((src, i) => (
              <img
                key={src}
                data-bike-item
                src={src}
                alt="دوچرخه ناوگان"
                loading="lazy"
                decoding="async"
                className={`h-full flex-1 rounded-2xl object-cover ${i === 1 ? "scale-110" : "opacity-90"}`}
              />
            ))}
            <div className="absolute inset-x-6 bottom-0 h-6 rounded-[50%] bg-primary/25 blur-xl" />
          </div>

          <div className="mt-5 flex items-center justify-between gap-2">
            {categories.map((c, i) => (
              <div key={c} data-chip className="flex flex-1 flex-col items-center gap-1.5 opacity-0">
                <span
                  className={`flex size-9 items-center justify-center rounded-full border text-[0.6rem] ${
                    i === 0
                      ? "border-primary text-primary glow-ring"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {i === 4 ? "···" : "🚲"}
                </span>
                <span className="text-[0.55rem] text-muted-foreground">{c}</span>
              </div>
            ))}
          </div>

          <div data-layer="price" className="glass pointer-events-auto mt-4 flex items-center justify-between rounded-2xl px-4 py-3 opacity-0">
            <p className="text-xs text-muted-foreground">
              از
              <span className="ms-2 text-xl font-bold text-foreground">۶۰٬۰۰۰</span>
              <span className="ms-1 text-[0.65rem]">تومان / ساعت</span>
            </p>
            <button
              type="button"
              data-layer="cta"
              onClick={onBook}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground"
            >
              رزرو کن
              <ArrowLeft className="size-4" />
            </button>
          </div>

          <button
            type="button"
            data-layer="place"
            onClick={onBook}
            className="glass pointer-events-auto mt-3 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-right opacity-0"
          >
            <MapPin className="size-4 shrink-0 text-primary" />
            <span className="flex-1">
              <span className="block text-xs text-muted-foreground">انتخاب شهر</span>
              <span className="block text-sm text-foreground">۶ شهر فعال</span>
            </span>
            <ChevronLeft className="size-4 text-muted-foreground" />
          </button>
        </div>

        <div
          data-layer="outro"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-background to-transparent opacity-0"
        />
      </div>

      {reduced && (
        <div className="sr-only">حالت کم‌مصرف: انیمیشن سینمایی غیرفعال است.</div>
      )}
    </div>
  );
}
