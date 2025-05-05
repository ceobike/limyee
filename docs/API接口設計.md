# API接口設計

## 1. 產品類
### 獲取產品分類列表
- `GET /api/products/categories`
- 回傳: `[{ id, label, children }]`

### 產品卡片列表
- `GET /api/products?categoryId=xx&page=1`
- 回傳: `[{ id, name, img, desc }]`

### 產品詳情
- `GET /api/products/:id`
- 回傳:
```json
{
  "id": "35",
  "name": "嵌入式主板EMDS-1232A",
  "model": "EMDS-1232A",
  "images": [ {"src": "/img/xxx.jpg", "alt": "主視圖" } ],
  "specs": [ { "label": "CPU", "value": "Intel Core i5" } ],
  "features": ["支持寬溫工作"],
  "related": [ {"id": "36", "title": "嵌入式主板EMDS-5678", "img": "/img/rel1.jpg", "link": "/products/emds-1232a"} ]
}
```

## 2. 方案/新聞/服務類
### 方案列表
- `GET /api/solutions?categoryId=xx`

### 方案詳情
- `GET /api/solutions/:id`
- 回傳: `{ id, title, desc, img, sections: [{title, content}] }`

### 新聞列表/詳情
- `GET /api/news?categoryId=xx&page=1`
- `GET /api/news/:id`

## 3. 聯絡&表單
### 聯絡表單提交
- `POST /api/contact`
- 請求:
```json
{ "name": "張三", "phone": "13888888888", "email": "xx", "message": "內容" }
```
- 回應: `{ "success": true }` 或錯誤訊息

### 售後/技術申請提交
- `POST /api/service/request`

## 4. 通用
### 全站搜尋
- `GET /api/search?kw=xxx`
- 回傳: 包含產品/解決方案/新聞等項目的混合結果
