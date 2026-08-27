import { Link } from "@tanstack/react-router";
import { Bike, CalendarCheck, Heart, Home, User } from "lucide-react";

const items = [
  { to: "/", label: "خانه", icon: Home },
  { to: "/bikes", label: "دوچرخه‌ها", icon: Bike },
  { to: "/bookings", label: "رزروها", icon: CalendarCheck },
  { to: "/favorites", label: "علاقه‌مندی", icon: Heart },
  { to: "/profile", label: "پروفایل", icon: User },
] as const;

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[env(safe-area-inset-bottom)]">
      <div className="glass mx-auto mb-3 flex max-w-md items-center justify-between rounded-2xl px-2 py-2">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            activeOptions={{ exact: item.to === "/" }}
            className="group flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl px-1 py-1.5 text-muted-foreground transition-colors duration-300 data-[status=active]:text-primary"
          >
            <item.icon className="size-5 shrink-0 transition-transform duration-300 group-active:scale-90" />
            <span className="truncate text-[0.6rem]">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
