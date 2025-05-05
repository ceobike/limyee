# 開發日誌 DEVLOG.md

## 2025-05-05  全棧重構骨架初始化

### 主要進度
- 使用 Next.js 15 + Shadcn UI + Prisma + PostgreSQL 創建新全棧工程，類 T3 Stack。
- 完成依賴安裝與現代目錄結構配置。
- 清除舊項目沉澱代碼與冗餘頁面。
- 預備新增首頁（Home）、產品（Products）、新聞（News）、聯繫我們（Contact）等主要路由骨架。
- 計劃各子頁按現代 UI/UX 標準組件化（用 Shadcn UI 設計卡片、表單、Nav、Footer 等）。
- Prisma 將建模產品/新聞/聯繫信息三大資料表，先本地 mock，後續接入真 DB。

### TODO
1. 實現主骨架頁面（Home, Products, News, Contact）於 src/app 目錄。
2. 裝配 Header、Footer 組件和基本路由分層。
3. 構建初級 Card、ContactForm、Tabs 組件骨架。
4. 設計 Prisma schema 並生成初始 DB 遷移。
5. 持續補全和遷移原項目核心功能。

---

## 2025-05-05  主流程分頁骨架搭建

### 主要進度
- 各主頁面骨架已創建（/products、/news、/contact），佔位內容明確未來組件分佈。
- 路由分層規範，方便後續各分頁 UI/數據功能對接。

### TODO
1. 裝配全域 Header/Footer，確保跨頁導航與體驗一致性。
2. 設計 Prisma schema，初步生成 Product/News/Contact 三大資料表。
3. 逐步引入 shadcn/ui 組件（卡片、表單、Tabs等），美化各主流程分頁。
4. 編寫首頁與分頁的假資料/初始 mock 資料顯示。
5. 完善 Contact 表單功能與驗證。

---

本日誌長期跟蹤重構流轉，後續每步進展都於此更新。
