import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader, Rating } from "@/components/app-ui";
import { EditableImage } from "@/components/editable-image";
import { bikeById, fa, includedPerks, reviews } from "@/lib/rental-data";

export const Route = createFileRoute("/bikes/$bikeId")({
  head: () => ({
    meta: [
      { title: "جزئیات دوچرخه | CycleX" },
      { name: "description", content: "مشخصات فنی، امکانات همراه و قیمت ساعتی اجاره دوچرخه." },
      { property: "og:title", content: "جزئیات دوچرخه | CycleX" },
      { property: "og:description", content: "مشخصات کامل و رزرو آنی دوچرخه انتخابی." },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BikeDetail,
});

function BikeDetail() {
  const { bikeId } = Route.useParams();
  const bike = bikeById(bikeId);

  if (!bike) {
    return (
      <main className="mx-auto max-w-md px-4 pb-32">
        <PageHeader title="یافت نشد" />
        <p className="text-sm text-muted-foreground">این دوچرخه در ناوگان موجود نیست.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-md px-4 pb-32">
      <PageHeader title={bike.name} />
      <EditableImage src={bike.image} alt={bike.name} className="aspect-4/3 w-full rounded-2xl" />

      <div className="mt-4 flex items-center justify-between">
        <Rating value={bike.rating} count={bike.reviews} />
        <span className="text-sm text-primary">
          {fa(bike.hourly)} <span className="text-muted-foreground text-xs">تومان/ساعت</span>
        </span>
      </div>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">{bike.description}</p>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {bike.specs.map((s) => (
          <div key={s.label} className="glass rounded-xl px-3 py-3 text-center">
            <p className="text-[0.6rem] text-muted-foreground">{s.label}</p>
            <p className="mt-1 text-xs text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-7 text-base font-medium">همراه اجاره</h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {includedPerks.map((p) => (
          <li key={p} className="rounded-full border border-border px-3 py-1.5 text-[0.7rem] text-muted-foreground">
            {p}
          </li>
        ))}
      </ul>

      <h2 className="mt-7 text-base font-medium">نظر رکاب‌زن‌ها</h2>
      <div className="mt-3 space-y-3">
        {reviews.map((r) => (
          <figure key={r.name} className="glass rounded-2xl p-4">
            <Rating value={r.rating} />
            <blockquote className="mt-2 text-sm leading-7 text-muted-foreground">{r.text}</blockquote>
            <figcaption className="mt-2 text-xs text-foreground">{r.name}</figcaption>
          </figure>
        ))}
      </div>

      <Link
        to="/"
        hash="booking"
        className="fixed inset-x-0 bottom-20 z-40 mx-auto flex min-h-12 w-[min(28rem,calc(100%-2rem))] items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground"
      >
        رزرو این دوچرخه
      </Link>
    </main>
  );
}
