import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Bike, MapPin, Calendar, Clock, CheckCircle, CreditCard, ArrowLeft, Plus } from 'lucide-react';
import { bikes, locations } from '@/lib/rental-data';
import { fa } from '@/lib/rental-data';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/booking')({
  component: BookingPage,
});

type Step = 'bike' | 'location' | 'datetime' | 'extras' | 'payment' | 'confirm';

const extras = [
  { id: 'helmet', name: 'کلاه ایمنی', price: 5000, icon: '🪖' },
  { id: 'lock', name: 'قفل امنیتی', price: 3000, icon: '🔒' },
  { id: 'light', name: 'چراغ جلو', price: 2000, icon: '💡' },
  { id: 'insurance', name: 'بیمه تکمیلی', price: 15000, icon: '🛡️' },
];

function BookingPage() {
  const [step, setStep] = useState<Step>('bike');
  const [selectedBike, setSelectedBike] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState(2); // hours
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const bike = bikes.find(b => b.id === selectedBike);
  const location = locations.find(l => l.id === selectedLocation);

  const basePrice = bike ? bike.hourly * duration : 0;
  const extrasPrice = selectedExtras.reduce((sum, id) => {
    const extra = extras.find(e => e.id === id);
    return sum + (extra ? extra.price * duration : 0);
  }, 0);
  const totalPrice = basePrice + extrasPrice;

  const steps: { id: Step; label: string; icon: any }[] = [
    { id: 'bike', label: 'دوچرخه', icon: Bike },
    { id: 'location', label: 'ایستگاه', icon: MapPin },
    { id: 'datetime', label: 'زمان', icon: Calendar },
    { id: 'extras', label: 'تجهیزات', icon: Plus },
    { id: 'payment', label: 'پرداخت', icon: CreditCard },
    { id: 'confirm', label: 'تأیید', icon: CheckCircle },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === step);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setStep(steps[currentStepIndex + 1].id);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setStep(steps[currentStepIndex - 1].id);
    }
  };

  const toggleExtra = (id: string) => {
    setSelectedExtras(prev => 
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const renderStep = () => {
    switch (step) {
      case 'bike':
        return (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">انتخاب دوچرخه</h2>
            <div className="grid grid-cols-2 gap-3">
              {bikes.map(b => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBike(b.id)}
                  className={`glass overflow-hidden rounded-2xl p-3 text-right transition-all ${
                    selectedBike === b.id ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <img src={b.image} alt={b.name} className="aspect-square w-full rounded-xl object-cover" />
                  <p className="mt-2 text-xs font-bold text-foreground">{b.name}</p>
                  <p className="text-[0.6rem] text-muted-foreground">{fa(b.hourly)} تومان / ساعت</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 'location':
        return (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">انتخاب ایستگاه</h2>
            <div className="space-y-3">
              {locations.map(l => (
                <button
                  key={l.id}
                  onClick={() => setSelectedLocation(l.id)}
                  className={`glass flex w-full items-center gap-3 rounded-2xl p-3 text-right transition-all ${
                    selectedLocation === l.id ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <img src={l.image} alt={l.city} className="size-16 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground">{l.city}</p>
                    <p className="text-[0.6rem] text-muted-foreground">{l.spot}</p>
                    <p className="mt-1 text-[0.6rem] text-primary">{fa(l.km)} کیلومتر تا شما</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'datetime':
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">انتخاب زمان</h2>
            
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">تاریخ</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="glass w-full rounded-xl p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">ساعت شروع</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="glass w-full rounded-xl p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">مدت اجاره</label>
              <div className="flex items-center justify-between glass rounded-xl p-3">
                <button
                  onClick={() => setDuration(Math.max(1, duration - 1))}
                  className="flex size-10 items-center justify-center rounded-lg bg-surface text-foreground"
                >
                  −
                </button>
                <span className="text-sm font-bold text-foreground">{fa(duration)} ساعت</span>
                <button
                  onClick={() => setDuration(Math.min(24, duration + 1))}
                  className="flex size-10 items-center justify-center rounded-lg bg-surface text-foreground"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        );

      case 'extras':
        return (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">تجهیزات جانبی</h2>
            <div className="space-y-2">
              {extras.map(extra => (
                <button
                  key={extra.id}
                  onClick={() => toggleExtra(extra.id)}
                  className={`glass flex w-full items-center justify-between rounded-2xl p-3 text-right transition-all ${
                    selectedExtras.includes(extra.id) ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{extra.icon}</span>
                    <div>
                      <p className="text-sm font-bold text-foreground">{extra.name}</p>
                      <p className="text-[0.6rem] text-muted-foreground">{fa(extra.price)} تومان / ساعت</p>
                    </div>
                  </div>
                  <div className={`size-5 rounded-full border-2 ${
                    selectedExtras.includes(extra.id) ? 'border-primary bg-primary' : 'border-border'
                  }`}>
                    {selectedExtras.includes(extra.id) && (
                      <CheckCircle className="size-4 text-primary-foreground" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">پرداخت</h2>
            
            <div className="glass rounded-2xl p-4">
              <h3 className="mb-3 text-sm font-bold text-foreground">خلاصه سفارش</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>دوچرخه</span>
                  <span>{bike?.name}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>ایستگاه</span>
                  <span>{location?.city}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>تاریخ</span>
                  <span>{date || '-'}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>ساعت</span>
                  <span>{time || '-'}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>مدت</span>
                  <span>{fa(duration)} ساعت</span>
                </div>
                {selectedExtras.length > 0 && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>تجهیزات</span>
                    <span>{fa(extrasPrice)} تومان</span>
                  </div>
                )}
                <div className="border-t border-border pt-2 text-base font-bold text-foreground">
                  <div className="flex justify-between">
                    <span>مجموع</span>
                    <span className="text-primary">{fa(totalPrice)} تومان</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">روش پرداخت</p>
              <div className="grid grid-cols-2 gap-2">
                <button className="glass flex flex-col items-center gap-2 rounded-xl p-4 text-center ring-2 ring-primary">
                  <CreditCard className="size-6 text-primary" />
                  <span className="text-[0.6rem] text-foreground">کارت بانکی</span>
                </button>
                <button className="glass flex flex-col items-center gap-2 rounded-xl p-4 text-center opacity-50">
                  <span className="text-xl">💳</span>
                  <span className="text-[0.6rem] text-foreground">کیف پول</span>
                </button>
              </div>
            </div>
          </div>
        );

      case 'confirm':
        return (
          <div className="text-center py-8">
            <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-primary/20">
              <CheckCircle className="size-10 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground">رزرو با موفقیت انجام شد!</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              کد رزرو: <span className="font-mono text-primary">#CYX{Date.now().toString().slice(-6)}</span>
            </p>
            <div className="mt-6 glass rounded-2xl p-4 text-right">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">دوچرخه</span>
                  <span className="text-foreground">{bike?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ایستگاه</span>
                  <span className="text-foreground">{location?.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">زمان</span>
                  <span className="text-foreground">{date} - {time}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-2">
                  <span className="text-muted-foreground">مبلغ پرداختی</span>
                  <span className="font-bold text-primary">{fa(totalPrice)} تومان</span>
                </div>
              </div>
            </div>
            <Link
              to="/bookings"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-primary py-4 text-sm font-bold text-primary-foreground"
            >
              مشاهده رزروها
            </Link>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-6 pb-32">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <button onClick={handleBack} className="p-2">
          <ArrowLeft className="size-5 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">رزرو دوچرخه</h1>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="relative flex items-center justify-between">
          <div className="absolute inset-x-0 top-1/2 h-0.5 bg-border" />
          {steps.map((s, i) => {
            const Icon = s.icon;
            const isActive = i <= currentStepIndex;
            return (
              <div
                key={s.id}
                className={`relative z-10 flex size-8 items-center justify-center rounded-full transition-colors ${
                  isActive ? 'bg-primary' : 'bg-surface'
                }`}
              >
                <Icon className="size-4 text-primary-foreground" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Content */}
      {renderStep()}

      {/* Footer CTA */}
      {step !== 'confirm' && (
        <div className="fixed bottom-[calc(env(safe-area-inset-bottom)+5rem)] inset-x-4">
          <div className="glass rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">مجموع</p>
                <p className="text-lg font-bold text-primary">{fa(totalPrice)} تومان</p>
              </div>
              <Button
                onClick={handleNext}
                disabled={!((step === 'bike' && selectedBike) || 
                          (step === 'location' && selectedLocation) ||
                          (step === 'datetime' && date && time) ||
                          step === 'extras' || step === 'payment')}
                className="min-h-12 px-8"
              >
                ادامه
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
