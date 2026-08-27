import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/app-ui";
import { EditableImage } from "@/components/editable-image";
import { fa, locations } from "@/lib/rental-data";

export const Route = createFileRoute("/locations")({
  head: () => ({
    meta: [
      { title: "ایستگاه‌ها و شهرها | CycleX" },
      { name: "description", content: "ایستگاه‌های تحویل دوچرخه در تهران، اصفهان، شیراز، مشهد، تبریز و کیش." },
      { property: "og:title", content: "ایستگاه‌ها و شهرها | CycleX" },
      { property: "og:description", content: "نزدیک‌ترین ایستگاه تحویل دوچرخه را پیدا کنید." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LocationsPage,
});

function LocationsPage() {
  return (
    <main className="mx-auto max-w-md px-4 pb-32">
      <PageHeader title="ایستگاه‌ها" />
      <div className="space-y-3">
        {locations.map((l) => (
          <article key={l.id} className="glass flex items-center gap-3 overflow-hidden rounded-2xl p-2">
            <EditableImage src={l.image} alt={l.city} className="size-20 shrink-0 rounded-xl" />
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-sm font-medium">{l.city}</h2>
              <p className="truncate text-xs text-muted-foreground">{l.spot}</p>
              <p className="mt-1 text-[0.7rem] text-primary">
                {fa(l.bikes)} دوچرخه · {fa(l.km)} کیلومتر
              </p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
