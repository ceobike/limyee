# Architecture Overview

## 1. Project Layered Structure
- **Frontend Components**: HeaderNav, Footer, FloatActionBar, SearchBox, Universal Card, Form, etc.
- **Page Templates**: Home, About, Product Center, Product Details, Solution, News Center, Service Center, Contact Us, etc.
- **Data Management**: Dynamic data for pages/components fetched from API; form submissions handled by API
- **Internationalization**: Supports Simplified Chinese/English toggle

## 2. Routing and Pages

| Path             | Content Overview      |
|------------------|----------------------|
| `/`              | Home/main            |
| `/about`         | About/Brand/History/Subpages|
| `/products`      | Product category list|
| `/products/:id`  | Product details      |
| `/solution`      | Industry solutions   |
| `/solution/:id`  | Solution details     |
| `/news`          | News list            |
| `/news/:id`      | News details         |
| `/service`       | Technical/Aftersales Service |
| `/contact`       | Contact Us           |

## 3. Core Global Components
- **HeaderNav**: LOGO, navigation menu (nested), language switch, search
- **Footer**: Contact information, secondary navigation
- **FloatActionBar**: Back to top, customer service/social links, floating display
- **SearchBox**: Popup search box, site-wide
- **Card List**: Business card reuse across pages

---

For further details on props and page functions, refer to page and component documentation.
