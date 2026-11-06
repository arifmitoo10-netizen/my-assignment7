# 🛒 বাজার দর (BazarDor)

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দৈনিক বাজার দর এক নজরে দেখার একটি রেসপন্সিভ ওয়েব অ্যাপ। পণ্যের আজকের দাম, দামের ওঠানামা এবং ১২টি বাজারের সর্বনিম্ন–সর্বোচ্চ দাম দেখা যায়।

**Live:** _add your link_ · **Repo:** _add your link_

## 🛠 Technologies
- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS 3 + daisyUI 4
- Better Auth (Email/Password, Google, GitHub)
- MongoDB (Better Auth adapter)
- react-hot-toast, lucide-react

## ✨ Key Features
1. **লাইভ প্রাইস টিকার** – নেভবারের নিচে অসীম স্ক্রলিং স্ট্রিপে পণ্যের দাম ও ▲/▼ পরিবর্তন।
2. **আজ দাম বেড়েছে / কমেছে** – সবচেয়ে বেশি বাড়া ও কমা ৬টি করে পণ্য, বাংলা সংখ্যায়।
3. **ক্যাটাগরি পেজ** – স্কেলিটন লোডার, এবং সংখ্যাগত মান ধরে দাম অনুযায়ী সাজানো (কম→বেশি / বেশি→কম)।
4. **প্রোটেক্টেড পণ্য বিস্তারিত** – লগইন ছাড়া ঢোকা যায় না; সর্বনিম্ন/সর্বোচ্চ/গড় দাম ও বিভাগভিত্তিক বাজারের দামের টেবিল।
5. **Better Auth** – ইমেইল/পাসওয়ার্ড, Google ও GitHub লগইন, টোস্ট নোটিফিকেশন সহ।
6. **প্রোফাইল আপডেট** – নাম (ও ছবির লিংক) আপডেট করার সুবিধা।
7. সম্পূর্ণ রেসপন্সিভ, কাস্টম ৪০৪ পেজ, রিলোড-সেফ ডায়নামিক রুট।

## 🚀 Getting Started
```bash
npm install
cp .env.example .env.local   # fill in the values
npm run dev                  # http://localhost:3000
```

### Environment variables
| Key | Purpose |
| --- | --- |
| `MONGODB_URI`, `MONGODB_DB` | MongoDB connection |
| `BETTER_AUTH_SECRET` | Random secret (`openssl rand -base64 32`) |
| `BETTER_AUTH_URL` | App URL (`http://localhost:3000` or your Vercel URL) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth |

OAuth redirect URIs: `<BETTER_AUTH_URL>/api/auth/callback/google` and `<BETTER_AUTH_URL>/api/auth/callback/github`.

Replace `public/logo.png` and `public/banner.png` with your own images.

## 🔌 API
`https://openapi.programming-hero.com/api/bazardor` → `/products`, `/products/:id`, `/categories` (the two alternative base URLs are used automatically as fallbacks).
