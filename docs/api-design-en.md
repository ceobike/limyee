# API Design

## 1. Product Category
### Get Product Category List
- `GET /api/products/categories`
- Response: `[{ id, label, children }]`

### Product Card List
- `GET /api/products?categoryId=xx&page=1`
- Response: `[{ id, name, img, desc }]`

### Product Details
- `GET /api/products/:id`
- Response:
```json
{
  "id": "35",
  "name": "Embedded Motherboard EMDS-1232A",
  "model": "EMDS-1232A",
  "images": [ {"src": "/img/xxx.jpg", "alt": "Main image" } ],
  "specs": [ { "label": "CPU", "value": "Intel Core i5" } ],
  "features": ["Supports wide temperature industrial work"],
  "related": [ {"id": "36", "title": "Embedded Motherboard EMDS-5678", "img": "/img/rel1.jpg", "link": "/products/emds-1232a"} ]
}
```

## 2. Solution/News/Service Category
### Solution List
- `GET /api/solutions?categoryId=xx`

### Solution Details
- `GET /api/solutions/:id`
- Response: `{ id, title, desc, img, sections: [{title, content}] }`

### News List/Details
- `GET /api/news?categoryId=xx&page=1`
- `GET /api/news/:id`

## 3. Contact & Forms
### Contact Form Submission
- `POST /api/contact`
- Request:
```json
{ "name": "John Doe", "phone": "13888888888", "email": "xx", "message": "content" }
```
- Response: `{ "success": true }` or error message

### After-sales/Technical Request Submission
- `POST /api/service/request`

## 4. Common
### Site-wide Search
- `GET /api/search?kw=xxx`
- Response: Mixed results containing products/solutions/news, etc.
