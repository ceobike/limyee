export default function NewsPage() {
  return (
    <main className="min-h-screen max-w-2xl mx-auto flex flex-col gap-12 pt-16 px-4">
      <h1 className="text-3xl font-bold mb-6">新聞動態</h1>
      <div className="text-neutral-500">本頁展示公司新聞、產業資訊與推廣內容，將可連接資料庫。</div>
      {/* #TODO: 新聞動態卡片列表，資料源接 Prisma */}
    </main>
  );
}
