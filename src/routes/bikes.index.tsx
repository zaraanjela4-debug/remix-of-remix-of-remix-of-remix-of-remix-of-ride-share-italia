import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { PageHeader, BikeCard } from "@/components/app-ui";
import { bikes, categories } from "@/lib/rental-data";
import { useFavorites } from "@/hooks/use-favorites";

export const Route = createFileRoute("/bikes/")({
  head: () => ({
    meta: [
      { title: "ناوگان دوچرخه‌ها | CycleX" },
      { name: "description", content: "همه دوچرخه‌های کوهستان، برقی، جاده و کودک با اجاره ساعتی." },
      { property: "og:title", content: "ناوگان دوچرخه‌ها | CycleX" },
      { property: "og:description", content: "انتخاب از میان ده‌ها دوچرخه پریمیوم با رزرو آنی." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BikesPage,
});

function BikesPage() {
  const [cat, setCat] = useState("همه");
  const { toggle, has } = useFavorites();
  const list = cat === "همه" ? bikes : bikes.filter((b) => b.category === cat);

  return (
    <main className="mx-auto max-w-md px-4 pb-32">
      <PageHeader title="ناوگان دوچرخه‌ها" />
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-3">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-xs transition-colors duration-300 ${
              c === cat ? "border-primary text-primary glow-ring" : "border-border text-muted-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {list.map((b) => (
          <BikeCard key={b.id} bike={b} favorite={has(b.id)} onToggleFavorite={toggle} />
        ))}
      </div>
    </main>
  );
}
