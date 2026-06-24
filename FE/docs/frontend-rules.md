# ALTERA Frontend Rules

## Purpose

Tài liệu này định nghĩa các quy tắc frontend bắt buộc cho toàn bộ dự án ALTERA.

Mục tiêu:

* Code nhất quán
* Dễ maintain
* Dễ scale
* AI Agent không đi sai kiến trúc
* Thành viên nhóm code cùng style

---

# General Principles

## Ưu tiên

1. Reusable Components
2. Clean Code
3. Type Safety
4. Responsive Design
5. Accessibility
6. Performance

---

## Không được

❌ Duplicate UI

❌ Duplicate Logic

❌ Hardcode màu

❌ Hardcode spacing

❌ Hardcode API URL

❌ Inline CSS

❌ File quá lớn (>300 dòng)

❌ Component quá lớn (>200 dòng)

---

# Folder Rules

## Page

Page chỉ làm nhiệm vụ:

* Routing
* Layout
* Kết nối feature

Không chứa business logic.

Ví dụ:

```tsx
const ProductPage = () => {
  return <ProductList />
}
```

---

## Feature

Feature chứa:

* Business Logic
* API Call
* State

Ví dụ:

```txt
features/
└── product/
    ├── components/
    ├── hooks/
    ├── services/
    └── types/
```

---

## Shared Components

Shared component được dùng ở nhiều module.

Ví dụ:

```txt
Navbar
Footer
SearchBar
Pagination
```

---

## UI Components

UI chỉ chứa component generic.

Ví dụ:

```txt
Button
Input
Card
Modal
Table
Badge
```

Không viết business logic trong UI component.

---

# Naming Convention

## Component

PascalCase

```tsx
ProductCard.tsx
Navbar.tsx
AIRecommendation.tsx
```

---

## Hook

```tsx
useAuth.ts
useProducts.ts
useOrders.ts
```

Luôn bắt đầu bằng:

```txt
use
```

---

## Store

```tsx
authStore.ts
productStore.ts
cartStore.ts
```

---

## Service

```tsx
auth.api.ts
product.api.ts
order.api.ts
```

---

## Type

```tsx
user.types.ts
product.types.ts
order.types.ts
```

---

# Component Rules

## Một Component Một Nhiệm Vụ

Sai:

```tsx
ProductCard
+
Filter
+
Pagination
+
API Call
```

Đúng:

```tsx
ProductCard
```

chỉ render card.

---

## Props Interface

Luôn khai báo interface.

```tsx
interface ProductCardProps {
  product: Product;
}
```

---

## Export

Ưu tiên:

```tsx
export function ProductCard() {}
```

Thay vì:

```tsx
export default
```

---

# Styling Rules

## Bắt buộc

```txt
Tailwind CSS
```

---

## Không dùng

```css
style={{}}
```

trừ trường hợp đặc biệt.

---

## Theme Token

Không:

```tsx
text-red-500
```

Ưu tiên:

```tsx
text-primary
bg-background
```

---

# Color Rules

## Primary

```css
#000000
```

## Secondary

```css
#FFFFFF
```

## Accent

```css
#FF0000
```

## Neutral

```css
#F5F5F5
```

Không được tạo màu ngẫu nhiên.

---

# API Rules

## Không gọi API trực tiếp trong Page

Sai:

```tsx
useEffect(() => {
 axios.get(...)
})
```

---

Đúng:

```tsx
product.api.ts
```

```tsx
ProductService.getProducts()
```

---

# Axios Instance

Tạo duy nhất:

```tsx
utils/axios.ts
```

Ví dụ:

```tsx
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})
```

---

# State Management Rules

## Global State

Chỉ dùng Zustand.

Ví dụ:

```tsx
authStore
cartStore
userStore
```

---

## Local State

Dùng:

```tsx
useState
```

---

Không đưa mọi thứ vào Zustand.

---

# Form Rules

Bắt buộc:

```txt
react-hook-form
zod
```

---

Không validate thủ công.

Sai:

```tsx
if(email === "")
```

---

Đúng:

```tsx
zod schema
```

---

# Responsive Rules

Bắt buộc hỗ trợ:

```txt
Mobile
Tablet
Desktop
```

Breakpoints:

```txt
sm
md
lg
xl
```

---

# Image Rules

Dùng:

```tsx
loading="lazy"
```

cho ảnh sản phẩm.

---

Không upload ảnh quá lớn.

---

# Animation Rules

Chỉ dùng:

```txt
Framer Motion
```

---

Animation phải:

* Nhẹ
* Mượt
* Có mục đích

Không lạm dụng.

---

# AI Feature Rules

Frontend không được gọi OpenAI trực tiếp.

Luồng đúng:

```txt
Frontend
↓
Backend API
↓
OpenAI
```

---

# Git Rules

## Branch

```txt
main
develop
feature/*
bugfix/*
```

Ví dụ:

```txt
feature/product-list

feature/ai-stylist

feature/custom-shirt
```

---

## Commit

Format:

```txt
feat:
fix:
refactor:
style:
docs:
```

Ví dụ:

```txt
feat: add product detail page

fix: resolve login validation

refactor: optimize product card
```

---

# Pull Request Rules

Mỗi PR phải:

* Build thành công
* Không có lỗi TypeScript
* Không có warning nghiêm trọng
* Responsive hoạt động

---

# Design Rules

ALTERA phải luôn giữ:

```txt
Minimal
Premium
Fashion
Modern
Luxury
AI-first
```

Không được biến UI thành:

```txt
ERP
CRM
Accounting System
Hospital System
```

---

# Definition of Done

Một feature được xem là hoàn thành khi:

✅ Responsive

✅ TypeScript pass

✅ Reusable component

✅ API hoạt động

✅ Validation đầy đủ

✅ Loading state

✅ Error state

✅ Empty state

✅ Dark mode compatible (future)

✅ Code review pass

---

# AI Agent Instructions

Khi tạo code:

1. Ưu tiên tái sử dụng component hiện có.
2. Không tạo component trùng chức năng.
3. Tuân thủ Design System.
4. Tuân thủ Folder Structure.
5. Luôn dùng TypeScript.
6. Luôn responsive.
7. Ưu tiên shadcn/ui.
8. Ưu tiên Tailwind CSS.
9. Không dùng Material UI.
10. Không dùng Ant Design.
11. Không dùng Redux.
12. Không gọi OpenAI trực tiếp từ Frontend.
13. Mọi code phải production-ready.
14. Mọi component phải có type rõ ràng.
15. Mọi API phải đi qua service layer.
