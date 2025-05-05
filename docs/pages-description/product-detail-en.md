# Product Detail Page

## Main Components
- ProductDetailPage (page wrapper)
- ProductHeader (title/model/breadcrumb)
- ProductImagesCarousel (image carousel)
- ProductSpecs (specs table)
- ProductFeatures (feature highlights)
- RelatedProducts (recommendations)
- ContactQuickForm (simple contact form)

## Props
```tsx

```

## Data and Interaction Flow
1. Request `/api/products/:id` based on productId to load data
2. Image carousel switches left/right or previews on thumbnail click
3. "Consult Now" form (validate → submit → result)
4. Clicking recommended product jumps to its details

## API Data Sample
```json
{
  "id": "35",
  "name": "Embedded Motherboard EMDS-1232A",
  "model": "EMDS-1232A",
  "images": [
    {"src": "/img/xxx.jpg", "alt": "Main image"},
    {"src": "/img/yyy.jpg", "alt": "Back"}
  ],
  "specs": [
    {"label": "CPU", "value": "Intel Core i5"},
    {"label": "Memory", "value": "8GB DDR4"}
  ],
  "features": [
    "Supports wide temperature operation","Multiple rich interfaces"
  ],
  "related": [
    {"id": "36", "title": "Embedded Motherboard EMDS-5678", "img": "/img/rel1.jpg", "link": "/products/emds-1232a"}
  ]
}
```
