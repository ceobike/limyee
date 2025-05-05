# Homepage Sections & Components

## Structure Overview
- Banner main recommendation area (promo slogan, CTA button)
- Product/business highlight cards (multi-card horizontal display)
- Industry solution highlights (image+link)
- Company intro/data advantage area
- News Center highlights (horizontal cards)
- Footer
- Right-side floating action bar

## Main Components and Props
Header (navigation), Footer, Banner (multi-set interactions), etc. are all global components—content is not hardcoded, but managed from backend or database (e.g. "site settings" data list). Frontend loads dynamically.

Correct approach:
Header/Footer/Banner content (menus, contact, copyright, branding, etc.) is managed via backend.
Prisma Schema creates WebsiteConfig, Menu, FooterInfo (etc.).
API routes (/api/config, /api/menu, /api/footer-info) supply Header, Footer, Banner content.
Frontend only writes dynamic rendering components, not hardcoded text/URLs.

## Typical Interactions
- CTA button with primary/hover effect
- Card hover with floating shadow
- Clicking product/solution/news card enters detail page
