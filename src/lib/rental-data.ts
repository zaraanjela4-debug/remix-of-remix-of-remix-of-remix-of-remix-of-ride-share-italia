import bikeAdult26 from "@/assets/bike-adult26.jpg";
import bikeAdult26g from "@/assets/bike-adult26g.jpg";
import bikeKid from "@/assets/bike-kid.jpg";
import bikeTandem from "@/assets/bike-tandem.jpg";
import bikeTrike from "@/assets/bike-trike.jpg";
import scooterElectric from "@/assets/scooter-electric.jpg";
import bikeElectric from "@/assets/bike-electric.jpg";
import bikeMountain from "@/assets/bike-mountain.jpg";
import bikeRoad from "@/assets/bike-road.jpg";
import cityTehran from "@/assets/city-tehran.jpg";
import cityIsfahan from "@/assets/city-isfahan.jpg";
import cityShiraz from "@/assets/city-shiraz.jpg";
import cityMashhad from "@/assets/city-mashhad.jpg";
import cityTabriz from "@/assets/city-tabriz.jpg";
import cityKish from "@/assets/city-kish.jpg";

export const fa = (n: number) => n.toLocaleString("fa-IR");

export type Bike = {
  id: string;
  name: string;
  category: string;
  hourly: number;
  image: string;
  rating: number;
  reviews: number;
  available: number;
  description: string;
  specs: { label: string; value: string }[];
};

export const bikes: Bike[] = [
  {
    id: "adult26",
    name: "دوچرخه بزرگسال ۲۶ معمولی",
    category: "بزرگسال",
    hourly: 60000,
    image: bikeAdult26,
    rating: 4.6,
    reviews: 128,
    available: 32,
    description: "دوچرخه شهری سبک و راحت برای گشت‌های روزانه و مسیرهای آسفالت.",
    specs: [
      { label: "سایز طوقه", value: "۲۶ اینچ" },
      { label: "دنده", value: "بدون دنده" },
      { label: "ترمز", value: "V-Brake" },
    ],
  },
  {
    id: "adult26g",
    name: "دوچرخه بزرگسال ۲۶ دنده‌ای",
    category: "بزرگسال",
    hourly: 85000,
    image: bikeAdult26g,
    rating: 4.8,
    reviews: 214,
    available: 24,
    description: "۲۱ سرعته با ترمز دیسکی، مناسب مسیرهای شیب‌دار و طولانی.",
    specs: [
      { label: "سایز طوقه", value: "۲۶ اینچ" },
      { label: "دنده", value: "۲۱ سرعته" },
      { label: "ترمز", value: "دیسکی" },
    ],
  },
  {
    id: "kid",
    name: "دوچرخه کودک",
    category: "کودک",
    hourly: 40000,
    image: bikeKid,
    rating: 4.9,
    reviews: 96,
    available: 18,
    description: "ایمن و سبک با چرخ کمکی اختیاری برای کودکان ۵ تا ۱۰ سال.",
    specs: [
      { label: "سایز طوقه", value: "۱۶ اینچ" },
      { label: "چرخ کمکی", value: "دارد" },
      { label: "ترمز", value: "دستی" },
    ],
  },
  {
    id: "tandem",
    name: "دوچرخه دونفره",
    category: "تفریحی",
    hourly: 130000,
    image: bikeTandem,
    rating: 4.7,
    reviews: 64,
    available: 8,
    description: "تجربه‌ی دونفره در ساحل و پارک؛ محبوب‌ترین گزینه‌ی آخر هفته.",
    specs: [
      { label: "ظرفیت", value: "۲ نفر" },
      { label: "دنده", value: "۷ سرعته" },
      { label: "ترمز", value: "دیسکی" },
    ],
  },
  {
    id: "trike",
    name: "سه‌چرخه بزرگسال",
    category: "تفریحی",
    hourly: 110000,
    image: bikeTrike,
    rating: 4.5,
    reviews: 41,
    available: 6,
    description: "پایداری کامل با سبد بار؛ مناسب خرید و سواری آرام.",
    specs: [
      { label: "چرخ", value: "۳ چرخ" },
      { label: "سبد", value: "دارد" },
      { label: "ترمز", value: "V-Brake" },
    ],
  },
  {
    id: "scooter",
    name: "اسکوتر برقی",
    category: "برقی",
    hourly: 150000,
    image: scooterElectric,
    rating: 4.8,
    reviews: 173,
    available: 15,
    description: "برد ۳۵ کیلومتر با شارژ کامل و سرعت تا ۲۵ کیلومتر بر ساعت.",
    specs: [
      { label: "برد", value: "۳۵ کیلومتر" },
      { label: "سرعت", value: "۲۵ km/h" },
      { label: "باتری", value: "۱۰ آمپر" },
    ],
  },
  {
    id: "ebike",
    name: "دوچرخه برقی",
    category: "برقی",
    hourly: 170000,
    image: bikeElectric,
    rating: 4.9,
    reviews: 152,
    available: 12,
    description: "موتور کمکی ۲۵۰ وات برای صعود بی‌زحمت از سربالایی‌ها.",
    specs: [
      { label: "موتور", value: "۲۵۰ وات" },
      { label: "برد", value: "۶۰ کیلومتر" },
      { label: "ترمز", value: "دیسکی هیدرولیک" },
    ],
  },
  {
    id: "mountain",
    name: "دوچرخه کوهستان",
    category: "کوهستان",
    hourly: 120000,
    image: bikeMountain,
    rating: 4.7,
    reviews: 187,
    available: 20,
    description: "کمک‌فنر جلو و لاستیک آجدار برای مسیرهای خاکی و کوهستانی.",
    specs: [
      { label: "سایز طوقه", value: "۲۷.۵ اینچ" },
      { label: "دنده", value: "۲۱ سرعته" },
      { label: "ترمز", value: "هیدرولیک" },
    ],
  },
  {
    id: "road",
    name: "دوچرخه کورسی",
    category: "جاده",
    hourly: 140000,
    image: bikeRoad,
    rating: 4.6,
    reviews: 79,
    available: 9,
    description: "بدنه‌ی کربن و وزن سبک برای رکاب‌زنی سریع در جاده.",
    specs: [
      { label: "بدنه", value: "کربن" },
      { label: "وزن", value: "۸.۴ کیلوگرم" },
      { label: "دنده", value: "۱۸ سرعته" },
    ],
  },
];

export const categories = ["همه", "بزرگسال", "کودک", "تفریحی", "برقی", "کوهستان", "جاده"];

export const locations = [
  { id: "tehran", city: "تهران", spot: "بوستان آب و آتش", image: cityTehran, bikes: 42, km: 1.2 },
  { id: "isfahan", city: "اصفهان", spot: "پل خواجو", image: cityIsfahan, bikes: 28, km: 2.5 },
  { id: "shiraz", city: "شیراز", spot: "دروازه قرآن", image: cityShiraz, bikes: 24, km: 3.1 },
  { id: "mashhad", city: "مشهد", spot: "بوستان کوهسنگی", image: cityMashhad, bikes: 31, km: 5.3 },
  { id: "tabriz", city: "تبریز", spot: "ائل‌گلی", image: cityTabriz, bikes: 19, km: 6.1 },
  { id: "kish", city: "کیش", spot: "ساحل مرجان", image: cityKish, bikes: 36, km: 8.4 },
];

export const packages = [
  { label: "۳۰ دقیقه", hours: 0.5 },
  { label: "۱ ساعت", hours: 1, popular: true },
  { label: "۱:۳۰", hours: 1.5 },
  { label: "۲ ساعت", hours: 2 },
  { label: "۳ ساعت", hours: 3 },
  { label: "۴ ساعت", hours: 4 },
  { label: "روزانه", hours: 8 },
];

export const times = [
  "۰۸:۰۰",
  "۰۹:۰۰",
  "۱۰:۰۰",
  "۱۱:۰۰",
  "۱۲:۰۰",
  "۱۴:۰۰",
  "۱۵:۰۰",
  "۱۶:۰۰",
  "۱۷:۰۰",
  "۱۸:۰۰",
  "۱۹:۰۰",
  "۲۰:۰۰",
];

export const reviews = [
  { name: "سارا محمدی", text: "دوچرخه تمیز و سالم بود، تحویل سریع انجام شد.", rating: 5 },
  { name: "امیر رستمی", text: "اسکوتر برقی عالی بود؛ شارژ کامل و بدون مشکل.", rating: 5 },
  { name: "نگار کریمی", text: "رزرو دونفره برای ساحل کیش تجربه‌ی فوق‌العاده‌ای بود.", rating: 4 },
];

export const stats = [
  { value: "+۱۰ هزار", label: "رکاب‌زن خوشحال" },
  { value: "+۵۰", label: "ایستگاه فعال" },
  { value: "+۲۰۰", label: "دوچرخه پریمیوم" },
  { value: "۴.۹", label: "امتیاز کاربران" },
];

export const includedPerks = [
  "کلاه ایمنی",
  "قفل ضدسرقت",
  "چراغ جلو و عقب",
  "بیمه حوادث",
  "پشتیبانی ۲۴ ساعته",
];

export const sampleBookings = [
  {
    id: "b1",
    bikeId: "mountain",
    when: "۵ شهریور — ۱۰:۰۰",
    place: "تهران، بوستان آب و آتش",
    status: "پیش‌رو" as const,
  },
  {
    id: "b2",
    bikeId: "ebike",
    when: "۸ شهریور — ۱۴:۰۰",
    place: "اصفهان، پل خواجو",
    status: "پیش‌رو" as const,
  },
  {
    id: "b3",
    bikeId: "scooter",
    when: "۲۹ مرداد — ۰۹:۰۰",
    place: "کیش، ساحل مرجان",
    status: "پایان‌یافته" as const,
  },
];

export const bikeById = (id: string) => bikes.find((b) => b.id === id);
