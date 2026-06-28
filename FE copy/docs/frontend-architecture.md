# ALTERA Frontend Architecture Guide

## Project Overview

ALTERA là nền tảng thời trang ứng dụng AI dành cho Gen Z.

Core Features:

* Landing Page
* Authentication
* Product Catalog
* Product Detail
* Custom Shirt Designer
* AI Outfit Recommendation
* Shopping Cart
* Orders
* User Profile
* Admin Dashboard

Mục tiêu:

* UI hiện đại
* Premium Fashion Style
* Dễ mở rộng
* Component tái sử dụng cao
* React Enterprise Structure
* MVP trước, Scale sau

---

# Technology Stack

## Core

```bash
React
TypeScript
Vite
```

## Styling

```bash
Tailwind CSS
shadcn/ui
```

## State Management

```bash
Zustand
```

## API

```bash
Axios
```

## Form

```bash
react-hook-form
zod
```

## Notification

```bash
sonner
```

## Icons

```bash
lucide-react
```

## Animation

```bash
framer-motion
```

## Carousel

```bash
embla-carousel-react
```

## 3D Shirt Designer

```bash
three.js
react-three-fiber
@react-three/drei
```

---

# Design Philosophy

ALTERA không được thiết kế giống:

* ERP
* CRM
* Dashboard System

ALTERA phải mang cảm giác:

* Fashion Brand
* Premium
* Clean
* Minimal
* Modern
* Apple Style
* Zara Style
* Nike Style

Ưu tiên:

* White Space
* Large Images
* Clean Typography
* Smooth Animation

---

# Design System

## Color Palette

### Primary

```css
#000000
```

### Secondary

```css
#FFFFFF
```

### Accent

```css
#FF0000
```

### Neutral Background

```css
#F5F5F5
```

### Success

```css
#22C55E
```

### Warning

```css
#F59E0B
```

### Error

```css
#EF4444
```

---

# Typography

## Heading

```txt
Inter
Montserrat
Archivo
```

Weight:

```txt
700
800
```

## Body

```txt
Inter
Roboto
```

Size:

```txt
16px minimum
```

---

# Border Radius

```txt
8px
12px
```

---

# Shadow

Chỉ sử dụng shadow nhẹ.

Không dùng shadow quá mạnh.

---

# Project Structure

```txt
src/

├── assets/
│
├── theme/
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   ├── radius.ts
│   └── shadows.ts
│
├── router/
│
├── layouts/
│   ├── MainLayout.tsx
│   └── AdminLayout.tsx
│
├── pages/
│
├── features/
│   ├── auth/
│   ├── product/
│   ├── outfit/
│   ├── design/
│   ├── order/
│   └── profile/
│
├── components/
│
│   ├── ui/
│   │
│   │   ├── Button
│   │   ├── Input
│   │   ├── Select
│   │   ├── Card
│   │   ├── Modal
│   │   ├── Table
│   │   ├── Badge
│   │   ├── Tabs
│   │   └── Pagination
│   │
│   ├── shared/
│   │
│   │   ├── Navbar
│   │   ├── Footer
│   │   ├── Sidebar
│   │   └── SearchBar
│   │
│   ├── fashion/
│   │
│   │   ├── ProductCard
│   │   ├── ProductGrid
│   │   ├── OutfitCard
│   │   └── LookbookCard
│   │
│   ├── ai/
│   │
│   │   ├── AIChat
│   │   ├── AIRecommendation
│   │   └── StyleSuggestion
│   │
│   ├── studio/
│   │
│   │   ├── ShirtCanvas
│   │   ├── DesignToolbar
│   │   ├── ColorPicker
│   │   └── UploadPanel
│   │
│   └── admin/
│       ├── DataTable
│       └── DashboardCard
│
├── hooks/
│
├── services/
│
├── store/
│
├── types/
│
├── utils/
│
├── App.tsx
│
└── main.tsx
```

---

# Reusable Components Rules

Luôn tái sử dụng:

* Button
* Input
* Modal
* Card
* Table
* Pagination
* Badge

Không được viết lại cùng một UI nhiều lần.

Nếu UI được dùng từ 2 lần trở lên:

=> tạo component riêng.

---

# Product Components

```txt
ProductCard
ProductGrid
ProductFilter
ProductGallery
ProductReview
```

---

# AI Components

```txt
AIChat
AIRecommendation
StyleSuggestion
OutfitResult
```

---

# Shirt Studio Components

```txt
ShirtCanvas
ColorPicker
SizeSelector
PatternSelector
UploadDesign
DesignToolbar
```

---

# Admin Components

```txt
DataTable
DashboardCard
StatCard
```

---

# Landing Page Sections

1. Hero Section
2. Sustainable Fashion Section
3. AI Stylist Section
4. Custom Design Studio Section
5. Featured Products
6. Testimonials
7. CTA Section
8. Footer

---

# AI Stylist Page

Layout:

```txt
Sidebar Filters

+
Outfit Recommendation Grid
```

Card:

```txt
Image
Name
Match Score
Mix & Match Button
Save Outfit Button
```

---

# Interactive Design Studio

Layout:

```txt
Left Sidebar
Center 3D Canvas
Right Property Panel
```

Sidebar:

```txt
Upload Image
Choose Color
Choose Size
Patterns
Text Design
```

Center:

```txt
3D Shirt Preview
```

---

# Coding Rules

Always:

* TypeScript strict mode
* Functional Components
* Custom Hooks
* Reusable Components
* Clean Architecture

Avoid:

* Inline Styles
* Hardcoded Colors
* Hardcoded Sizes
* Duplicate Components

---

# Figma Prompt

Design a high-fidelity Web UI for ALTERA, an AI-powered fashion platform for Gen Z. The style is modern, minimalist, premium, and inspired by luxury fashion brands. Include:

1. Landing Page with immersive photography and sustainable fashion messaging.
2. Interactive Design Studio with a large center canvas for customizing 3D T-shirt models.
3. AI Stylist page displaying outfit recommendations in a clean grid layout.
4. Product Catalog and Product Detail pages.
5. Admin Dashboard.

Use React + Tailwind CSS friendly layouts.

Follow shadcn/ui design standards:

* Rounded corners
* Subtle shadows
* Clean spacing
* Accessible navigation

Color Palette:

* Black (#000000)
* White (#FFFFFF)
* Red Accent (#FF0000)
* Light Gray (#F5F5F5)

Typography:

* Inter
* Montserrat

Target Audience:

* Gen Z
* Fashion Lovers
* Online Shoppers

Visual Style:

* Minimal
* Premium
* Fashion Tech
* AI-powered Experience
* High-end Brand Aesthetic

```
```
