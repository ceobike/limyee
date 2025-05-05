export default function ProductsPage() {
  return (
    <main className="min-h-screen max-w-2xl mx-auto flex flex-col gap-12 pt-16 px-4">
      <h1 className="text-3xl font-bold mb-6">產品中心</h1>
      <div className="text-neutral-500">本頁將展示全部可選解決方案與產品明細，後續對接資料庫。</div>
      {/* #TODO: 產品卡片陣列，資料來源於 Prisma 資料表 */}
    </main>
  );
}
