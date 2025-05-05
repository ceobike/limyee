# News Center Page

## Structure Overview
- News category tabs/list
- News card list (title, summary, date)
- Click items to enter news detail page (title, full content, images, author, time)
- Pagination or Load More

## Main Components and Props
### NewsTab
```tsx
<NewsTab tabs: Array<{ label:string, id:string }> current: string onTabChange: (id:string)=>void />
```
### NewsList
```tsx
<NewsList items: NewsCardProps[] />
```
### Pagination
```tsx
<Pagination current: number total: number onPageChange: (p:number)=>void />
```
### NewsDetailPage
```tsx
<NewsDetailPage newsId: string />
```

## Interaction Flow
- Clicking tab/category refreshes news list accordingly
- Click card to jump to detail
- Pagination supported
- Inside details, return to list, content annotated, share button
