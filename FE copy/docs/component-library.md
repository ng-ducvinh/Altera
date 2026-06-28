# component-library.md

## Purpose

Danh sách component chuẩn của ALTERA.

AI Agent phải ưu tiên tái sử dụng component trong file này trước khi tạo component mới.

---

# UI Components

## Button

### Location

```txt
components/ui/Button
```

### Variants

```txt
primary
secondary
outline
ghost
danger
```

### Usage

```tsx
<Button variant="primary">
  Buy Now
</Button>
```

---

## Card

### Location

```txt
components/ui/Card
```

### Usage

```tsx
<Card>
  Product Content
</Card>
```

---

## Modal

### Location

```txt
components/ui/Modal
```

### Usage

```tsx
<Modal />
```

---

## DataTable

### Location

```txt
components/admin/DataTable
```

### Features

* Sorting
* Search
* Pagination
* Loading
* Empty State

---

# Shared Components

## Navbar

### Location

```txt
components/shared/Navbar
```

### Used In

* Landing
* Product
* Outfit
* Profile

---

## Footer

### Location

```txt
components/shared/Footer
```

### Used In

All public pages.

---

# Fashion Components

## ProductCard

### Location

```txt
components/fashion/ProductCard
```

### Props

```ts
interface ProductCardProps {
  id: string
  name: string
  image: string
  price: number
}
```

### Features

* Product Image
* Product Name
* Price
* Wishlist Button
* Quick View

---

## ProductGrid

### Location

```txt
components/fashion/ProductGrid
```

### Features

Render multiple ProductCard.

---

## OutfitCard

### Location

```txt
components/fashion/OutfitCard
```

### Features

* Outfit Image
* Match Score
* Save Outfit
* Mix & Match

---

# AI Components

## AIRecommendation

### Location

```txt
components/ai/AIRecommendation
```

### Features

* Outfit Suggestion
* Match Percentage
* Suggested Products

---

## AIChat

### Location

```txt
components/ai/AIChat
```

### Features

* Chat Window
* User Message
* AI Message
* Loading State
* Error State

---

# Studio Components

## ShirtCanvas

### Location

```txt
components/studio/ShirtCanvas
```

### Features

* 3D Preview
* Rotate
* Zoom

---

## ColorPicker

### Location

```txt
components/studio/ColorPicker
```

### Features

* Select Color
* Live Preview

---

## UploadPanel

### Location

```txt
components/studio/UploadPanel
```

### Features

* Upload PNG
* Upload SVG
* Preview

---

# States Standard

Mọi component gọi API phải hỗ trợ:

## Loading State

```tsx
<Skeleton />
```

---

## Error State

```tsx
<ErrorMessage />
```

Hiển thị:

"Unable to load data. Please try again."

---

## Empty State

```tsx
<EmptyState />
```

Hiển thị:

"No data available."

---

# API Pattern

Không gọi API trong component.

Sai:

```tsx
useEffect(() => {
 axios.get(...)
})
```

Đúng:

```tsx
ProductService.getProducts()
```

---

# New Component Rule

AI chỉ được tạo component mới khi:

* Không tồn tại trong Component Library.
* Không thể mở rộng component hiện tại.

Nếu có thể tái sử dụng thì bắt buộc tái sử dụng.
