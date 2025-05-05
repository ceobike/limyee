export default function ContactPage() {
  return (
    <main className="min-h-screen max-w-2xl mx-auto flex flex-col gap-12 pt-16 px-4">
      <h1 className="text-3xl font-bold mb-6">聯繫我們</h1>
      <div className="text-neutral-500 mb-4">歡迎諮詢或合作，我們將在收到表單後主動聯繫您。</div>
      {/* #TODO: ContactForm 表單待組件化與驗證邏輯，支持動態存檔 */}
    </main>
  );
}
