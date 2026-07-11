# Project North Star, Vibe Coding Reference

Complete token, typography, and CSS reference for building new products with the Project North Star.

---

## Table of Contents

1. [Project Setup](#1-project-setup)
2. [Fonts](#2-fonts)
3. [Typography Scale](#3-typography-scale)
4. [Color Tokens, Semantic](#4-color-tokens--semantic)
5. [Color Tokens, Primitive](#5-color-tokens--primitive)
6. [Spacing Scale](#6-spacing-scale)
7. [Border Radius](#7-border-radius)
8. [Dark Mode](#8-dark-mode)
9. [Themes](#9-themes)
10. [Component Patterns](#10-component-patterns)
11. [Rules, Never Do](#11-rules--never-do)

---

## 1. Project Setup

### Install dependencies
```bash
npx create-next-app@latest my-app --typescript --tailwind --app
cd my-app
npx shadcn@latest init
npm install @phosphor-icons/react
```

### Copy theme files
Add these files to your project (copy from the North Star registry):
- `src/app/globals.css`, token definitions + Tailwind config
- `src/themes/ag-core.css`, NS brand primitives + semantic tokens
- `src/themes/navy.css`, Peacock theme (optional)
- `src/themes/ns-pro.css`, NS Pro theme (optional)

Or install via registry:
```bash
npx shadcn@latest add https://YOUR_REGISTRY_URL/r/ag-globals
```

### globals.css imports (required order)
```css
@import "tailwindcss";
@import "tw-animate-css";
@import "../themes/ag-core.css";
/* @import "../themes/navy.css";, add if using Peacock theme */
/* @import "../themes/ns-pro.css";, add if using NS Pro theme */
```

### Root layout setup
```tsx
import { Atkinson_Hyperlegible_Next, Atkinson_Hyperlegible_Mono, Bitter } from "next/font/google"

const fontSans = Atkinson_Hyperlegible_Next({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-sans",
})
const fontDisplay = Bitter({
  subsets: ["latin"],
  weight: "400",         // ← only load weight 400, no 500 or 700 exists
  variable: "--font-display",
})
const fontMono = Atkinson_Hyperlegible_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
})

// Apply variables + default theme to <html>
<html
  lang="en"
  suppressHydrationWarning
  data-theme="ag"
  className={`h-full antialiased font-sans light ${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`}
>
```

---

## 2. Fonts

| Font | CSS Variable | Tailwind Class | Weights | Use for |
|------|-------------|----------------|---------|---------|
| Bitter | `--font-display` | `font-heading` | 400 only | h1–h6, display text |
| Atkinson Hyperlegible Next | `--font-sans` | `font-sans` | 300, 400, 700 | Body, UI |
| Atkinson Hyperlegible Mono | `--font-mono` | `font-mono` | variable | Code blocks |

**Critical rules:**
- Bitter only loads at weight `400`. Never apply `font-medium`, `font-semibold`, or `font-bold` to headings, the browser will fall back to system sans-serif.
- h1–h6 get Bitter automatically via the CSS base layer, no class needed.
- **NS Pro:** headings adopt `var(--brand)` color.

---

## 3. Typography Scale

### Heading defaults (CSS base layer, auto-applied)

| Element | Size | Font | Class equivalent |
|---------|------|------|-----------------|
| `<h1>` | 36px | Bitter | `text-4xl tracking-tight` |
| `<h2>` | 30px | Bitter | `text-3xl tracking-tight` |
| `<h3>` | 24px | Bitter | `text-2xl tracking-tight` |
| `<h4>` | 20px | Bitter | `text-xl` |
| `<h5>` | 18px | Bitter | `text-lg` |
| `<h6>` | 16px | Bitter | `text-base` |

### Type scale utilities

| Class | Size | Use |
|-------|------|-----|
| `text-xs` | 12px | Captions, labels, badges |
| `text-sm` | 14px | Secondary body, table cells |
| `text-base` | 16px | Default body copy |
| `text-lg` | 18px | Lead text, intro paragraphs |
| `text-xl` | 20px | h4 equivalent |
| `text-2xl` | 24px | h3 equivalent |
| `text-3xl` | 30px | h2 equivalent |
| `text-4xl` | 36px | h1 |
| `text-5xl` | 48px | Hero headings |
| `text-display-60` | 60px | Editorial / display (Bitter) |
| `text-display-78` | 78px | Largest display (Bitter) |

### Usage examples
```tsx
<h1>Page Title</h1>                          {/* auto: 36px Bitter */}
<h2>Section Heading</h2>                     {/* auto: 30px Bitter */}
<h3>Subsection</h3>                          {/* auto: 24px Bitter */}
<p className="text-sm text-muted-foreground">Helper text</p>
<p className="text-display-60">Hero copy</p> {/* 60px Bitter */}
```

---

## 4. Color Tokens, Semantic

Use **only** these tokens in component code. Never use primitive token names or raw hex values directly.

### NS Core, Light Mode (default)

| Token | Hex | Tailwind Utility | Use |
|-------|-----|-----------------|-----|
| `--background` | `#F8F7F4` | `bg-background` | Page / app background |
| `--foreground` | `#0C0A09` | `text-foreground` | Default body text |
| `--card` | `#FFFEFD` | `bg-card` | Card and panel surface |
| `--card-foreground` | `#0C0A09` | `text-card-foreground` | Text inside cards |
| `--popover` | `#FFFEFD` | `bg-popover` | Dropdown / tooltip surface |
| `--popover-foreground` | `#0C0A09` | `text-popover-foreground` | Text in popovers |
| `--brand` | `#72B0AB` | `bg-brand` / `text-brand` | Sapphire, highlights, active states, decorative |
| `--primary` | `#1D1816` | `bg-primary` / `text-primary` | Primary CTA button surface |
| `--primary-foreground` | `#FBFAF9` | `text-primary-foreground` | Text on primary buttons |
| `--secondary` | `#F4F2EF` | `bg-secondary` | Secondary button / surface |
| `--secondary-foreground` | `#1D1816` | `text-secondary-foreground` | Text on secondary surface |
| `--muted` | `#F4F2EF` | `bg-muted` | Subtle backgrounds, code blocks, skeletons |
| `--muted-foreground` | `#544F4D` | `text-muted-foreground` | Captions, placeholders, helper text |
| `--accent` | `#F4F2EF` | `bg-accent` | Hover highlight backgrounds |
| `--accent-foreground` | `#1D1816` | `text-accent-foreground` | Text on accent backgrounds |
| `--destructive` | `#DA2919` | `bg-destructive` / `text-destructive` | Errors, delete actions |
| `--border` | `#E5E3DF` | `border-border` | Component borders and dividers |
| `--input` | `#E5E3DF` | `border-input` | Input field border |
| `--ring` | `#72B0AB` | `ring-ring` | Focus ring (rendered at 50% opacity) |

### Chart tokens (NS light mode, dark → light)

| Token | Hex | Series |
|-------|-----|--------|
| `--chart-1` | `#544F4D` | 1st series (darkest) |
| `--chart-2` | `#676361` | 2nd series |
| `--chart-3` | `#7B7776` | 3rd series |
| `--chart-4` | `#938F8D` | 4th series |
| `--chart-5` | `#ABA7A6` | 5th series (lightest) |

### NS Core, Dark Mode

| Token | Hex |
|-------|-----|
| `--background` | `#0C0A09` |
| `--foreground` | `#FBFAF9` |
| `--card` | `#1D1816` |
| `--card-foreground` | `#FBFAF9` |
| `--primary` | `#E8E4E3` |
| `--primary-foreground` | `#1D1816` |
| `--muted` | `#2B2422` |
| `--muted-foreground` | `#ABA09C` |
| `--border` | `rgba(255,255,255,0.10)` |
| `--input` | `rgba(255,255,255,0.15)` |
| `--brand` | `#E54E3C` |
| `--ring` | `#E54E3C` |

### Sidebar tokens

| Token | Light | Dark |
|-------|-------|------|
| `--sidebar` | `#FFFEFD` | `#1D1816` |
| `--sidebar-foreground` | `#0C0A09` | `#FBFAF9` |
| `--sidebar-primary` | `#1D1816` | `#E8E4E3` |
| `--sidebar-primary-foreground` | `#FBFAF9` | `#1D1816` |
| `--sidebar-accent` | `#F4F2EF` | `#2B2422` |
| `--sidebar-accent-foreground` | `#1D1816` | `#FBFAF9` |
| `--sidebar-border` | `#E5E3DF` | `rgba(255,255,255,0.10)` |
| `--sidebar-ring` | `#72B0AB` | `#9CC9C5` |

---

## 5. Color Tokens, Primitive

Primitives are the raw building blocks. **Never use these directly in components**, only in theme CSS files to define semantic tokens.

### Neutral, warm grays (shared across all themes)

| Token | Hex | Approximate role |
|-------|-----|-----------------|
| `--primitive-neutral-950` | `#0C0A09` | Near-black |
| `--primitive-neutral-900` | `#1D1816` | Dark brown |
| `--primitive-neutral-800` | `#2B2422` | Dark muted |
| `--primitive-neutral-600` | `#544F4D` | Muted anchor |
| `--primitive-neutral-500` | `#7C6D67` | Mid brown |
| `--primitive-neutral-400` | `#ABA09C` | Light-medium |
| `--primitive-neutral-200` | `#E5E3DF` | Border |
| `--primitive-neutral-150` | `#E8E4E3` | Near-white warm |
| `--primitive-neutral-100` | `#F4F2EF` | Subtle bg |
| `--primitive-neutral-50` | `#F8F7F4` | Page background |
| `--primitive-neutral-25` | `#FBFAF9` | Near-white |
| `--primitive-neutral-0` | `#FFFEFD` | Card / white |

### NS Brand

| Token | Hex |
|-------|-----|
| `--primitive-brand-500` | `#72B0AB` |
| `--primitive-brand-400` | `#E54E3C` |

---

## 6. Spacing Scale

Based on Tailwind's 4px base. Use these utilities consistently, never use arbitrary pixel values.

| Class | Size | Use |
|-------|------|-----|
| `p-1` / `gap-1` | 4px | Tightest, icon padding, inline chips |
| `p-2` / `gap-2` | 8px | Compact UI, button padding, small gaps |
| `p-3` / `gap-3` | 12px | Default control padding |
| `p-4` / `gap-4` | 16px | Standard section padding |
| `p-6` / `gap-6` | 24px | Card content, form fields |
| `p-8` / `gap-8` | 32px | Page section spacing |
| `p-10` / `gap-10` | 40px | Large section gaps |
| `p-12` / `gap-12` | 48px | Hero / display spacing |
| `p-16` / `gap-16` | 64px | Full-bleed section padding |

---

## 7. Border Radius

The system uses near-zero radius (`--radius: 4px` base). All radius utilities derive from this:

| Class | Size | Use |
|-------|------|-----|
| `rounded-sm` | ~2px | Subtle rounding, chips, badges |
| `rounded-md` | ~3px | Standard, buttons, inputs, cards |
| `rounded-lg` | 4px | Panels, dropdowns |
| `rounded-xl` | ~6px | Modals, dialogs |

> Never use `rounded-full` on non-circular elements. Never use arbitrary radius values.

---

## 8. Dark Mode

Dark mode is toggled by adding the `.dark` class to `<html>`. The `.light` class forces light mode.

```tsx
// Toggle dark mode
document.documentElement.classList.toggle('dark')
document.documentElement.classList.toggle('light')
```

Semantic tokens update automatically, no conditional class logic needed in components. A component written with `bg-background text-foreground` just works in both modes.

### Theme init script (prevents flash on load)
Add to root layout, runs before React hydrates:
```tsx
<Script
  id="theme-init"
  strategy="beforeInteractive"
  dangerouslySetInnerHTML={{ __html: `(function(){
    try {
      var t = localStorage.getItem('colorMode');
      var d = t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      document.documentElement.classList.toggle('dark', d);
      document.documentElement.classList.toggle('light', !d);
      var ct = localStorage.getItem('colorTheme') || 'ag';
      document.documentElement.dataset.theme = ct;
    } catch(e) {}
  })();` }}
/>
```

---

## 9. Themes

Three themes are available, selected via `data-theme` on `<html>`:

| Theme ID | `data-theme` value | Brand color | Default mode |
|----------|-------------------|-------------|--------------|
| NS Core | `ag` | `#72B0AB` Sapphire | Light |
| Peacock | `navy` | `#053229` Peacock | Light |
| NS Pro | `ns-pro` | `#355E58` Spruce | **Dark** |

Switch theme:
```tsx
document.documentElement.dataset.theme = 'ns-pro'
```

### NS Pro, special rules
NS Pro has an extended accent palette for charts and badges **only**:

| Token | Hex | Use |
|-------|-----|-----|
| `--chart-1` | `#60A5FA` | Blue, charts/graphs only |
| `--chart-2` | `#FB923C` | Orange, charts/graphs only |
| `--chart-3` | `#AC94FA` | Purple, charts/graphs only |
| `--chart-4` | `#FDBA8C` | Peach, charts/graphs only |
| `--chart-5` | `#EF4444` | Red, charts/graphs only |
| `--ns-badge-1` through `7` | various | Badges/tags only |
| `--ns-accent-gradient` | orange→red→blue | Badges/charts only |

**Hard rule:** NS Pro accent colors are undefined in all other themes. Using them outside NS Pro produces invisible elements.

---

## 10. Component Patterns

### Install a component
```bash
npx shadcn@latest add https://YOUR_REGISTRY_URL/r/button
npx shadcn@latest add https://YOUR_REGISTRY_URL/r/card
npx shadcn@latest add https://YOUR_REGISTRY_URL/r/input
```

### Using tokens in custom components
```tsx
// ✅ Correct, semantic tokens only
<div className="bg-card border border-border rounded-lg p-6">
  <h2>Card Title</h2>
  <p className="text-muted-foreground text-sm">Helper text</p>
  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
    Submit
  </button>
</div>

// ❌ Wrong, hardcoded colors
<div style={{ backgroundColor: '#FFFEFD', border: '1px solid #E5E3DF' }}>
```

### Icons, Phosphor only
```tsx
import { MagnifyingGlass, ArrowRight, Check, Warning } from "@phosphor-icons/react"

<MagnifyingGlass className="size-4" />           // 16px, standard UI
<MagnifyingGlass className="size-3.5" />         // 14px, compact / inline
<MagnifyingGlass className="size-5" />           // 20px, emphasis
```

Size conventions:
- `size-3.5` (14px), compact, inline with small text
- `size-4` (16px), standard, buttons, nav, labels
- `size-5` (20px), emphasis, empty states, hero spots

### Focus states
Focus rings are automatic via the base layer (`outline-ring/50`). Never add custom focus outlines, they will conflict.

```tsx
// ✅ This just works, focus ring comes from the CSS base layer
<button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
  Click me
</button>
```

---

## 11. Rules, Never Do

| Rule | Why |
|------|-----|
| No hardcoded hex values in components | Breaks theming and dark mode |
| No Tailwind color utilities (`bg-blue-500`, `text-red-600`) | Bypasses the token system |
| No `font-medium` / `font-semibold` / `font-bold` on headings | Bitter only loads weight 400, browser falls back to system sans-serif |
| No `rounded-full` on non-circular elements | Contradicts the near-zero radius design language |
| No `window`, `document`, `navigator` outside `useEffect` | Breaks SSR |
| No primitive token names in component CSS (e.g. `var(--primitive-neutral-950)`) | Tightly couples to implementation, use semantic tokens |
| No lucide-react or other icon packages | Only `@phosphor-icons/react` is supported |
| No NS Pro accent tokens outside charts/badges | They are `undefined` in all other themes |
