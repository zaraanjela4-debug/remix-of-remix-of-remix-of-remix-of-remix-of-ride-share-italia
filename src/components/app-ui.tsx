import { Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronLeft, Heart, Star } from "lucide-react";

import { EditableImage } from "@/components/editable-image";
import { fa, type Bike } from "@/lib/rental-data";

export function PageHeader({
  title,
  back = true,
  action,
}: {
  title: string;
  back?: boolean;
  action?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-40 -mx-4 mb-4 flex items-center gap-3 border-b border-border bg-background/80 px-4 py-3 backdrop-blur-xl">
      {back && (
        <Link
          to="/"
          aria-label="بازگشت"
          className="grid size-9 shrink-0 place-items-center rounded-full border border-border text-foreground transition-colors duration-300 hover:border-primary"
        >
          <ArrowLeft className="size-4 rotate-180" />
        </Link>
      )}
      <h1 className="min-w-0 flex-1 truncate text-base font-medium">{title}</h1>
      {action}
    </header>
  );
}

export function SectionTitle({
  title,
  linkTo,
  linkLabel = "مشاهده همه",
}: {
  title: string;
  linkTo?: "/bikes" | "/locations" | "/bookings";
  linkLabel?: string;
}) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <h2 className="min-w-0 truncate text-lg font-medium">{title}</h2>
      {linkTo && (
        <Link
          to={linkTo}
          className="flex shrink-0 items-center gap-1 text-xs text-primary transition-opacity duration-300 hover:opacity-80"
        >
          {linkLabel}
          <ChevronLeft className="size-3.5" />
        </Link>
      )}
    </div>
  );
}

export function Rating({ value, count }: { value: number; count?: number }) {
  return (
    <span className="flex items-center gap-1 text-xs text-muted-foreground">
      <Star className="size-3.5 fill-primary text-primary" />
      <span className="text-foreground">{fa(value)}</span>
      {count !== undefined && <span>({fa(count)} نظر)</span>}
    </span>
  );
}

export function BikeCard({
  bike,
  favorite,
  onToggleFavorite,
}: {
  bike: Bike;
  favorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}) {
  return (
    <div className="glass group relative overflow-hidden rounded-2xl transition-transform duration-500 hover:-translate-y-1">
      <Link to="/bikes/$bikeId" params={{ bikeId: bike.id }} className="block">
        <EditableImage
          src={bike.image}
          alt={bike.name}
          className="aspect-4/3 w-full"
          label={`تصویر ${bike.name}`}
        />
      </Link>
      {onToggleFavorite && (
        <button
          type="button"
          aria-label="افزودن به علاقه‌مندی"
          onClick={() => onToggleFavorite(bike.id)}
          className="glass absolute end-2 top-2 grid size-8 place-items-center rounded-full"
        >
          <Heart
            className={`size-4 ${favorite ? "fill-primary text-primary" : "text-foreground"}`}
          />
        </button>
      )}
      <div className="space-y-1.5 p-3">
        <Link
          to="/bikes/$bikeId"
          params={{ bikeId: bike.id }}
          className="block truncate text-sm font-medium"
        >
          {bike.name}
        </Link>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-primary">
            {fa(bike.hourly)} <span className="text-muted-foreground">تومان/ساعت</span>
          </span>
          <Rating value={bike.rating} />
        </div>
        <p className="text-[0.7rem] text-muted-foreground">{fa(bike.available)} دستگاه موجود</p>
      </div>
    </div>
  );
}
