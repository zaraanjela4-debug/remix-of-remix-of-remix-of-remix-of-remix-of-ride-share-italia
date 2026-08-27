import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/app-ui";
import { EditableImage } from "@/components/editable-image";
import { bikeById, sampleBookings } from "@/lib/rental-data";

export const Route = createFileRoute("/bookings")({
  head: () => ({
    meta: [
      { title: "رزروهای من | CycleX" },
      { name: "description", content: "پیگیری رزروهای پیش‌رو و سوابق اجاره دوچرخه." },
      { property: "og:title", content: "رزروهای من | CycleX" },
      { property: "og:description", content: "وضعیت رزروهای فعال و گذشته شما." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BookingsPage,
});

function BookingsPage() {
  return (
    <main className="mx-auto max-w-md px-4 pb-32">
      <PageHeader title="رزروهای من" />
      <div className="space-y-3">
        {sampleBookings.map((b) => {
          const bike = bikeById(b.bikeId);
          return (
            <article key={b.id} className="glass flex items-center gap-3 rounded-2xl p-2">
              <EditableImage
                src={bike?.image}
                alt={bike?.name ?? "دوچرخه"}
                className="size-20 shrink-0 rounded-xl"
              />
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-sm font-medium">{bike?.name}</h2>
                <p className="truncate text-xs text-muted-foreground">{b.when}</p>
                <p className="truncate text-[0.7rem] text-muted-foreground">{b.place}</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-3 py-1 text-[0.65rem] ${
                  b.status === "پیش‌رو"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground"
                }`}
              >
                {b.status}
              </span>
            </article>
          );
        })}
      </div>
    </main>
  );
}
