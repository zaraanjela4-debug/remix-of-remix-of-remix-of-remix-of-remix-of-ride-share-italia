import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft, MapPin, Calendar, Clock, ChevronRight } from 'lucide-react';
import { bookings as mockBookings } from '@/lib/rental-data';
import { fa } from '@/lib/rental-data';
import { EditableImage } from '@/components/editable-image';

export const Route = createFileRoute('/booking/success')({
  component: BookingSuccessPage,
});

function BookingSuccessPage() {
  // In production, get booking details from URL params or Supabase
  const booking = {
    id: `CYX${Date.now().toString().slice(-6)}`,
    bikeName: 'دوچرخه کوهستان حرفه‌ای',
    location: 'تهران، پارک جمشیدیه',
    date: '1403/05/15',
    time: '09:00',
    duration: 3,
    totalPrice: 285000,
    status: 'confirmed' as const,
  };

  return (
    <div className="min-h-screen bg-background px-4 py-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <Link to="/" className="p-2">
          <ArrowLeft className="size-5 text-foreground" />
        </Link>
        <h1 className="text-lg font-bold text-foreground">تأیید رزرو</h1>
      </div>

      {/* Success Icon */}
      <div className="py-6 text-center">
        <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-primary/20">
          <svg className="size-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-foreground">رزرو با موفقیت انجام شد!</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          از رکاب زدن لذت ببرید
        </p>
      </div>

      {/* Booking ID */}
      <div className="glass mb-6 rounded-2xl p-4 text-center">
        <p className="text-xs text-muted-foreground">کد رزرو شما</p>
        <p className="mt-1 font-mono text-lg font-bold text-primary">{booking.id}</p>
      </div>

      {/* Booking Details */}
      <div className="space-y-3">
        <div className="glass flex items-center justify-between rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <MapPin className="size-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">ایستگاه</p>
              <p className="text-sm font-bold text-foreground">{booking.location}</p>
            </div>
          </div>
          <ChevronRight className="size-5 text-muted-foreground" />
        </div>

        <div className="glass flex items-center justify-between rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <Calendar className="size-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">تاریخ</p>
              <p className="text-sm font-bold text-foreground">{booking.date}</p>
            </div>
          </div>
          <ChevronRight className="size-5 text-muted-foreground" />
        </div>

        <div className="glass flex items-center justify-between rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <Clock className="size-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">ساعت شروع</p>
              <p className="text-sm font-bold text-foreground">{booking.time}</p>
            </div>
          </div>
          <ChevronRight className="size-5 text-muted-foreground" />
        </div>

        <div className="glass flex items-center justify-between rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <svg className="size-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-xs text-muted-foreground">مدت اجاره</p>
              <p className="text-sm font-bold text-foreground">{fa(booking.duration)} ساعت</p>
            </div>
          </div>
          <ChevronRight className="size-5 text-muted-foreground" />
        </div>
      </div>

      {/* Total Price */}
      <div className="glass mt-6 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">مبلغ پرداختی</span>
          <span className="text-lg font-bold text-primary">{fa(booking.totalPrice)} تومان</span>
        </div>
      </div>

      {/* Actions */}
      <div className="fixed bottom-[calc(env(safe-area-inset-bottom)+5rem)] inset-x-4 space-y-2">
        <Link
          to="/bookings"
          className="flex w-full items-center justify-center rounded-xl bg-primary py-4 text-sm font-bold text-primary-foreground"
        >
          مشاهده همه رزروها
        </Link>
        
        <button className="flex w-full items-center justify-center rounded-xl border border-border py-4 text-sm font-bold text-foreground">
          افزودن به تقویم
        </button>
      </div>
    </div>
  );
}
