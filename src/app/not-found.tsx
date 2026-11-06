import BackHomeCta from "@/components/BackHomeCta";

export default function NotFound() {
  return (
    <div className="py-10">
      <p className="mb-2 text-center text-6xl font-bold text-primary">৪০৪</p>
      <BackHomeCta title="পাতাটি খুঁজে পাওয়া যায়নি" text="আপনি যে লিংকে এসেছেন সেটি ভুল বা মুছে ফেলা হয়েছে।" />
    </div>
  );
}
