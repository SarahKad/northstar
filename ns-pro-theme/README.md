# NS Pro Theme

A bold, dark-first design token theme for NS Pro products. Anchored to **NS Blue** (`#1A56DB`).

---

## Files in this package

| File | Purpose |
|---|---|
| `ns-pro.css` | All design tokens, primitives, semantic tokens, chart series, badge series |
| `tailwind-theme-snippet.css` | Tailwind v4 `@theme inline` block mapping CSS variables to utility classes |
| `README.md` | This file |

---

## Quick start

### 1. Import the theme CSS

Add the import to your `globals.css` (or equivalent entry CSS file) after your Tailwind import:

```css
@import "tailwindcss";
@import "./ns-pro.css";
```

### 2. Add the Tailwind token mappings

Copy the contents of `tailwind-theme-snippet.css` into your `@theme inline { … }` block in `globals.css`. This registers the CSS variables as Tailwind utility classes (`bg-primary`, `text-muted-foreground`, `bg-ns-badge-1`, etc.).

### 3. Activate the theme

Set `data-theme="ns-pro"` on your root `<html>` element (or any container element to scope it):

```html
<html data-theme="ns-pro">
```

To activate **light mode** within NS Pro, add both attributes:

```html
<html data-theme="ns-pro" class="light">
```

NS Pro defaults to **dark mode**. Light mode is the secondary variant.

---

## Token architecture

Tokens follow a three-tier hierarchy:

```
Primitive  →  Semantic  →  Component
#1A56DB    →  --brand   →  text-brand
```

**Never use primitive tokens directly in components.** Always reference semantic tokens (`--primary`, `--background`, etc.) or their Tailwind utility equivalents (`bg-primary`, `bg-background`).

---

## Semantic tokens

### Core

| Token | Dark default | Light override | Notes |
|---|---|---|---|
| `--background` | `#141414` | `#FAFAFA` | Page background |
| `--foreground` | `#E5E5E5` | `#141414` | Default text |
| `--card` | `#1F1F1F` | `#FFFFFF` | Card / elevated surface |
| `--card-foreground` | `#E5E5E5` | `#141414` | |
| `--popover` | `#1F1F1F` | `#FFFFFF` | Dropdown / popover bg |
| `--popover-foreground` | `#E5E5E5` | `#141414` | |
| `--primary` | `#E5E5E5` | `#1A56DB` | Primary action / CTA |
| `--primary-foreground` | `#1F1F1F` | `#FFFFFF` | Text on primary |
| `--secondary` | `#2A2A2A` | `#F5F5F5` | Secondary surface |
| `--secondary-foreground` | `#E5E5E5` | `#141414` | |
| `--muted` | `#2A2A2A` | `#F5F5F5` | Muted background |
| `--muted-foreground` | `#9E9E9E` | `#6B6B6B` | Muted / placeholder text |
| `--accent` | `#2A2A2A` | `#F5F5F5` | Hover / active state bg |
| `--accent-foreground` | `#E5E5E5` | `#141414` | |
| `--destructive` | `#F87171` | `#DC2626` | Error / destructive action |
| `--border` | `rgba(255,255,255,0.10)` | `#EBEBEB` | Default border |
| `--input` | `rgba(255,255,255,0.15)` | `#EBEBEB` | Input border |
| `--ring` | `#3D82F0` | `#1A56DB` | Focus ring |
| `--brand` | `#3D82F0` | `#1A56DB` | NS Blue, lightened for dark bg |
| `--radius` | `4px` | `4px` | Border radius base |

### Sidebar

| Token | Dark default | Light override |
|---|---|---|
| `--sidebar` | `#1F1F1F` | `#FFFFFF` |
| `--sidebar-foreground` | `#E5E5E5` | `#141414` |
| `--sidebar-primary` | `#E5E5E5` | `#1A56DB` |
| `--sidebar-primary-foreground` | `#1F1F1F` | `#FFFFFF` |
| `--sidebar-accent` | `#2A2A2A` | `#F5F5F5` |
| `--sidebar-accent-foreground` | `#E5E5E5` | `#141414` |
| `--sidebar-border` | `rgba(255,255,255,0.10)` | `#EBEBEB` |
| `--sidebar-ring` | `#3D82F0` | `#1A56DB` |

---

## Chart series

**For charts and graphs only.** Do not use these tokens in non-data-visualisation contexts.

7-slot series ordered by visual priority: blue → orange → purple → peach → red → dark-red → lavender.

| Token | Colour | Hex |
|---|---|---|
| `--chart-1` | NS Light Blue | `#60A5FA` |
| `--chart-2` | NS Orange | `#FB923C` |
| `--chart-3` | NS Purple | `#AC94FA` |
| `--chart-4` | NS Peach | `#FDBA8C` |
| `--chart-5` | NS Red | `#EF4444` |
| `--chart-6` | NS Dark Red | `#7F1D1D` |
| `--chart-7` | NS Lavender | `#DDD6FE` |

---

## Badge / tag series

**⚠️ RESTRICTED, badges and tags only. Never use elsewhere.**

These tokens are only defined when `[data-theme="ns-pro"]` is active. In any other theme context they are undefined/transparent.

| Token | Colour | Hex |
|---|---|---|
| `--ns-badge-1` | NS Light Blue | `#60A5FA` |
| `--ns-badge-2` | NS Purple | `#AC94FA` |
| `--ns-badge-3` | NS Lavender | `#DDD6FE` |
| `--ns-badge-4` | NS Orange | `#FB923C` |
| `--ns-badge-5` | NS Peach | `#FDBA8C` |
| `--ns-badge-6` | NS Dark Red | `#7F1D1D` |
| `--ns-badge-7` | NS Red | `#EF4444` |

### Gradient token

`--ns-accent-gradient`, a linear gradient from orange → red → NS blue. Badges and charts only.

```css
background: var(--ns-accent-gradient);
/* linear-gradient(to right, #FB923C, #EF4444, #788FFA) */
```

---

## Typography

NS Pro does not ship custom fonts. Recommended stack:

- **Body / UI:** [Atkinson Hyperlegible](https://fonts.google.com/specimen/Atkinson+Hyperlegible), optimised for legibility at small sizes
- **Display / headings (optional):** Any high-contrast serif or system font. NS Pro's dark-first palette works well with neutral weight display type.

Load fonts via your project's preferred method (Google Fonts, `next/font`, self-hosted) and assign them to `--font-sans` and optionally `--font-display` in your CSS.

---

## Rules summary

1. **Never use primitive tokens directly**, always go through semantic tokens.
2. **Accent / badge palette is restricted**, `--chart-*` for data viz only, `--ns-badge-*` for badges/tags only.
3. **Dark is the default**, NS Pro dark should be treated as the primary state, not an override.
4. **`--radius` is fixed at `4px`**, do not override per-component without explicit design approval.
5. **`--ns-badge-*` tokens are theme-scoped**, they are undefined outside `[data-theme="ns-pro"]`. Never reference them in shared/cross-theme components.
