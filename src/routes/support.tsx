import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft, MapPin, Calendar, Clock, ChevronRight, Phone, Mail, MessageCircle } from 'lucide-react';

export const Route = createFileRoute('/support')({
  component: SupportPage,
});

const faqs = [
  {
    question: 'چطور می‌توانم دوچرخه رزرو کنم؟',
    answer: 'کافیست از صفحه اصلی، روی دکمه "رزرو کن" کلیک کنید و مراحل انتخاب دوچرخه، ایستگاه و زمان را طی کنید.',
  },
  {
    question: 'آیا بیمه دوچرخه شامل می‌شود؟',
    answer: 'بله، تمام دوچرخه‌های CycleX تحت پوشش بیمه حوادث هستند. بیمه تکمیلی نیز به صورت اختیاری قابل افزودن است.',
  },
  {
    question: 'چه مدارکی برای تحویل دوچرخه نیاز است؟',
    answer: 'کد رزرو و یک شناسنامه معتبر برای احراز هویت کافی است.',
  },
  {
    question: 'آیا می‌توانم رزرو خود را لغو کنم؟',
    answer: 'بله، تا ۲ ساعت قبل از شروع رزرو می‌توانید بدون جریمه لغو کنید.',
  },
];

function SupportPage() {
  return (
    <div className="min-h-screen bg-background px-4 py-6 pb-32">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <Link to="/" className="p-2">
          <ArrowLeft className="size-5 text-foreground" />
        </Link>
        <h1 className="text-lg font-bold text-foreground">پشتیبانی</h1>
      </div>

      {/* Contact Methods */}
      <section className="mb-8">
        <h2 className="mb-4 text-sm font-bold text-foreground">ارتباط با ما</h2>
        <div className="space-y-3">
          <a
            href="tel:02112345678"
            className="glass flex items-center gap-3 rounded-2xl p-4 transition-transform active:scale-95"
          >
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/20">
              <Phone className="size-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-foreground">تماس تلفنی</p>
              <p className="text-xs text-muted-foreground">021-12345678</p>
            </div>
            <ChevronRight className="size-5 text-muted-foreground" />
          </a>

          <a
            href="mailto:support@cyclex.ir"
            className="glass flex items-center gap-3 rounded-2xl p-4 transition-transform active:scale-95"
          >
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/20">
              <Mail className="size-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-foreground">ایمیل</p>
              <p className="text-xs text-muted-foreground">support@cyclex.ir</p>
            </div>
            <ChevronRight className="size-5 text-muted-foreground" />
          </a>

          <a
            href="#"
            className="glass flex items-center gap-3 rounded-2xl p-4 transition-transform active:scale-95"
          >
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/20">
              <MessageCircle className="size-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-foreground">چت آنلاین</p>
              <p className="text-xs text-muted-foreground">پاسخ در کمتر از ۵ دقیقه</p>
            </div>
            <ChevronRight className="size-5 text-muted-foreground" />
          </a>
        </div>
      </section>

      {/* Working Hours */}
      <section className="mb-8">
        <h2 className="mb-4 text-sm font-bold text-foreground">ساعات کاری</h2>
        <div className="glass rounded-2xl p-4">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">شنبه تا چهارشنبه</span>
              <span className="text-foreground">۸ صبح تا ۱۰ شب</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">پنجشنبه</span>
              <span className="text-foreground">۸ صبح تا ۸ شب</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">جمعه</span>
              <span className="text-foreground">۱۰ صبح تا ۶ شب</span>
            </div>
            <div className="border-t border-border pt-2 text-xs text-primary">
              پشتیبانی اضطراری ۲۴/۷
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section>
        <h2 className="mb-4 text-sm font-bold text-foreground">سؤالات متداول</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="glass group rounded-2xl p-4 [&_summary]:list-none"
            >
              <summary className="flex cursor-pointer items-center justify-between text-sm font-bold text-foreground">
                {faq.question}
                <ChevronRight className="size-4 text-muted-foreground transition-transform group-open:-rotate-90" />
              </summary>
              <p className="mt-3 text-xs leading-6 text-muted-foreground">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
