import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft, Bike, MapPin, Calendar, Clock, ChevronRight, Phone, Info } from 'lucide-react';
import { locations } from '@/lib/rental-data';
import { fa } from '@/lib/rental-data';
import { EditableImage } from '@/components/editable-image';

export const Route = createFileRoute('/about')({
  component: AboutPage,
});

const team = [
  { name: 'علی محمدی', role: 'بنیان‌گذار و CEO', avatar: '🚴' },
  { name: 'سارا احمدی', role: 'مدیر عملیات', avatar: '🗺️' },
  { name: 'رضا کریمی', role: 'مدیر فنی', avatar: '⚙️' },
  { name: 'مریم حسینی', role: 'پشتیبانی مشتریان', avatar: '💬' },
];

const values = [
  { icon: '🌱', title: 'محیط زیست', desc: 'ترویج حمل‌ونقل پاک و دوستدار محیط زیست' },
  { icon: '💪', title: 'سلامتی', desc: 'تشویق به سبک زندگی فعال و سالم' },
  { icon: '🤝', title: 'اعتماد', desc: 'شفافیت کامل در قیمت و خدمات' },
  { icon: '🚀', title: 'نوآوری', desc: 'استفاده از最新‌ترین تکنولوژی‌ها' },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background px-4 py-6 pb-32">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <Link to="/" className="p-2">
          <ArrowLeft className="size-5 text-foreground" />
        </Link>
        <h1 className="text-lg font-bold text-foreground">درباره CycleX</h1>
      </div>

      {/* Hero */}
      <section className="mb-8 text-center">
        <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-primary/20">
          <Bike className="size-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">داستان ما</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          CycleX در سال ۱۴۰۲ با هدف ایجاد یک پلتفرم اجاره دوچرخه پریمیوم و دسترسی‌پذیر در ایران تأسیس شد. 
          ما معتقدیم که هر کسی باید بتواند به راحتی و با قیمتی مناسب، از دوچرخه‌های باکیفیت برای گشت‌وگذار 
          در شهر استفاده کند.
        </p>
      </section>

      {/* Stats */}
      <section className="mb-8 grid grid-cols-2 gap-3">
        <div className="glass rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-primary">{fa(6)}</p>
          <p className="mt-1 text-[0.6rem] text-muted-foreground">شهر فعال</p>
        </div>
        <div className="glass rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-primary">{fa(200)}</p>
          <p className="mt-1 text-[0.6rem] text-muted-foreground">دوچرخه پریمیوم</p>
        </div>
        <div className="glass rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-primary">{fa(10000)}</p>
          <p className="mt-1 text-[0.6rem] text-muted-foreground">رکابزن خوشحال</p>
        </div>
        <div className="glass rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-primary">۴.۹</p>
          <p className="mt-1 text-[0.6rem] text-muted-foreground">امتیاز کاربران</p>
        </div>
      </section>

      {/* Values */}
      <section className="mb-8">
        <h2 className="mb-4 text-sm font-bold text-foreground">ارزش‌های ما</h2>
        <div className="grid grid-cols-2 gap-3">
          {values.map((v) => (
            <div key={v.title} className="glass rounded-2xl p-4 text-center">
              <span className="text-2xl">{v.icon}</span>
              <p className="mt-2 text-xs font-bold text-foreground">{v.title}</p>
              <p className="mt-1 text-[0.6rem] text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="mb-8">
        <h2 className="mb-4 text-sm font-bold text-foreground">تیم ما</h2>
        <div className="space-y-3">
          {team.map((member) => (
            <div key={member.name} className="glass flex items-center gap-3 rounded-2xl p-4">
              <div className="flex size-12 items-center justify-center rounded-full bg-surface text-2xl">
                {member.avatar}
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Locations Preview */}
      <section className="mb-8">
        <h2 className="mb-4 text-sm font-bold text-foreground">ایستگاه‌های ما</h2>
        <div className="space-y-3">
          {locations.slice(0, 3).map((l) => (
            <Link
              key={l.id}
              to="/locations"
              className="glass flex items-center gap-3 rounded-2xl p-3 transition-transform active:scale-95"
            >
              <EditableImage src={l.image} alt={l.city} className="size-16 rounded-xl object-cover" />
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground">{l.city}</p>
                <p className="text-xs text-muted-foreground">{l.spot}</p>
                <p className="mt-1 flex items-center gap-1 text-[0.6rem] text-primary">
                  <MapPin className="size-3" />
                  {fa(l.km)} کیلومتر
                </p>
              </div>
              <ChevronRight className="size-5 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="glass rounded-2xl p-5 text-center">
        <Phone className="mx-auto size-6 text-primary" />
        <h3 className="mt-3 text-sm font-bold text-foreground">سؤالی دارید؟</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          تیم پشتیبانی ما همیشه آماده پاسخگویی است
        </p>
        <Link
          to="/support"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
        >
          تماس با پشتیبانی
        </Link>
      </section>
    </div>
  );
}
