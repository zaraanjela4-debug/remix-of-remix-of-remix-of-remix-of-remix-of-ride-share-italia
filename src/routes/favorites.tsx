import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader, BikeCard } from "@/components/app-ui";
import { bikes } from "@/lib/rental-data";
import { useFavorites } from "@/hooks/use-favorites";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "علاقه‌مندی‌ها | CycleX" },
      { name: "description", content: "دوچرخه‌های ذخیره‌شده برای رزرو سریع در سفرهای بعدی." },
      { property: "og:title", content: "علاقه‌مندی‌ها | CycleX" },
      { property: "og:description", content: "لیست دوچرخه‌های مورد علاقه شما." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { ids, toggle, has } = useFavorites();
  const list = bikes.filter((b) => ids.includes(b.id));

  return (
    <main className="mx-auto max-w-md px-4 pb-32">
      <PageHeader title="علاقه‌مندی‌ها" />
      {list.length === 0 ? (
        <div className="glass rounded-2xl p-8 text-center">
          <p className="text-sm text-muted-foreground">هنوز دوچرخه‌ای ذخیره نکرده‌اید.</p>
          <Link to="/bikes" className="mt-4 inline-block text-sm text-primary">
            مشاهده ناوگان
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {list.map((b) => (
            <BikeCard key={b.id} bike={b} favorite={has(b.id)} onToggleFavorite={toggle} />
          ))}
        </div>
      )}
    </main>
  );
}
