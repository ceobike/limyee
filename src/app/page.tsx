import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen max-w-2xl mx-auto flex flex-col gap-16 pt-16 px-4">
      <header className="flex flex-col gap-3 items-center border-b pb-8">
        <h1 className="text-4xl font-bold">MYEE 智能官網</h1>
        <p className="text-neutral-500">全棧現代重構 · Next.js + Shadcn UI</p>
        <nav className="flex gap-6 mt-4 text-lg">
          <Link href="/" className="hover:text-primary">首頁</Link>
          <Link href="/products" className="hover:text-primary">產品</Link>
          <Link href="/news" className="hover:text-primary">新聞</Link>
          <Link href="/contact" className="hover:text-primary">聯繫我們</Link>
        </nav>
      </header>
      <section>
        <h2 className="text-2xl font-semibold mb-2">歡迎體驗全新現代化全棧官網！</h2>
        <p>現支持頁面組件化/資料模型化/未來動態 API/響應式設計等業界最佳實踐。</p>
      </section>
      <section className="text-neutral-500">
        <p className="mb-1">頁面快速入口：</p>
        <ul className="grid gap-2 list-disc pl-5">
          <li><Link href="/products" className="underline hover:text-primary">產品中心（Products）</Link></li>
          <li><Link href="/news" className="underline hover:text-primary">新聞動態（News）</Link></li>
          <li><Link href="/contact" className="underline hover:text-primary">聯繫表單（Contact）</Link></li>
        </ul>
      </section>
    </main>
  );
}
