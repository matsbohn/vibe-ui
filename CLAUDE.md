# vibe-ui — Claude Instructions

## Design System

This project uses a **dark dashboard design system** built in React + TypeScript + Vite with Storybook.

- **Figma file:** https://www.figma.com/design/zwaWF3nBphX3Wx6skh2ocA/vibe-ui
- **Design System page:** All components live on the "Design System" page in Figma
- **CSS tokens:** `src/tokens.css` is the single source of truth for all colors, spacing, typography, radius, and shadows

## Mandatory Rules

### 1. All three places must stay in sync

Every component change **must** be reflected in all three places:
- `<Name>.tsx` + `<Name>.css` — React implementation
- `<Name>.stories.tsx` — Storybook stories
- Figma component on the "Design System" page (via Figma MCP)

**Never update one without updating the others.**

### 2. Consistency check after every component change

After any component change, run a structured consistency check:
1. Read the component from Figma using `get_design_context` (not a screenshot)
2. Read the Storybook snapshot using `preview_snapshot` or `preview_inspect`
3. Compare both against the React source
4. Report any differences found — do not silently skip this step

### 3. Never use screenshot comparison

Always use **structured data** from Figma MCP (`get_design_context`) and Storybook MCP (`preview_snapshot`, `preview_inspect`). Screenshots are only for final human-readable proof, never for diffing.

### 4. Always use existing components — never duplicate logic

When building any UI in this project, use components from `src/components/`. **Never create inline styles that duplicate component logic** (e.g. don't write `style={{ borderRadius: 4, background: '#373841' }}` when `<Button>` or `<Badge>` already exists).

### 5. CSS variables are the single source of truth

All colors and spacing values come from `src/tokens.css`. **Never hardcode a hex color or pixel value** that corresponds to a token. This applies to both CSS files and Figma fills/strokes.

---

## Working with Components

### Always use Figma MCP — never guess

When creating or updating components, **always use the Figma MCP** (`get_design_context`) to get exact design tokens, spacing, colors, and properties. **Never guess or compare screenshots manually.**

```
# To inspect a component in Figma, use:
mcp__figma__get_design_context(fileKey="zwaWF3nBphX3Wx6skh2ocA", nodeId="<node-id>")
```

### Code Connect is set up

All 13 components have Figma Code Connect files at `src/components/<Name>/<Name>.figma.tsx`. Each file links the React component to its Figma counterpart with full prop mapping.

To publish Code Connect mappings after changes:
```bash
npm run figma:connect
```

To validate without publishing:
```bash
npm run figma:connect:parse
```

## Component Node IDs (Design System page)

| Component    | Figma Node ID | Type          |
|--------------|---------------|---------------|
| Button       | `59-13`       | Component Set |
| Badge        | `48-17`       | Component Set |
| Avatar       | `49-13`       | Component Set |
| Tag          | `50-13`       | Component Set |
| Alert        | `53-35`       | Component Set |
| Toast        | `57-19`       | Component Set |
| Breadcrumb   | `62-13`       | Component     |
| Dropdown     | `63-25`       | Component Set |
| StatCard     | `44-19`       | Component Set |
| Modal        | `67-7`        | Component     |
| DataTable    | `68-7`        | Component     |
| Sidebar      | `71-12`       | Component     |
| Topbar       | `71-7`        | Component     |
| WeatherHero  | `172-25`      | Component     |

## CSS Variable Tokens

All components must use CSS variables from `src/tokens.css`. **Never hardcode hex colors, pixel values, or font names that correspond to a token.**

Every token listed below exists as a Figma variable in `vibe-ui / Tokens` (Dark + Light modes). When re-theming, override any of these in the `:root[data-theme="light"]` block in `tokens.css` AND update the matching Figma variable — both must stay in sync.

### Colours (dark mode defaults)

| Token                | Dark value                   | Usage                    |
|----------------------|------------------------------|--------------------------|
| `--background`       | `#242529`                    | Page background          |
| `--surface`          | `#373841`                    | Cards, sidebars, topbars |
| `--border`           | `#5F6067`                    | All borders              |
| `--border-dim`       | `rgba(95, 96, 103, 0.4)`     | Subtle dividers          |
| `--accent`           | `#FF75D6`                    | Primary interactive      |
| `--accent-subtle`    | `rgba(255, 117, 214, 0.12)`  | Accent backgrounds       |
| `--accent-hover`     | `rgba(255, 117, 214, 0.2)`   | Accent hover state       |
| `--text-primary`     | `#DCD9DB`                    | Body text                |
| `--text-secondary`   | `#858C95`                    | Muted / labels           |
| `--text-disabled`    | `#5a5d65`                    | Disabled state text      |
| `--success`          | `#5FC98B`                    | Positive states          |
| `--warning`          | `#F5A623`                    | Warning states           |
| `--error`            | `#F06060`                    | Error / destructive      |
| `--info`             | `#60A8F0`                    | Informational            |

### Shape

| Token          | Value    | Figma variable  | Usage                   |
|----------------|----------|-----------------|-------------------------|
| `--radius-sm`  | `3px`    | `radius/sm`     | Badges, tags            |
| `--radius-md`  | `4px`    | `radius/md`     | Buttons, inputs, cards  |
| `--radius-lg`  | `6px`    | `radius/lg`     | Modals                  |
| `--radius-full`| `9999px` | `radius/full`   | Avatars, pills          |

### Spacing

| Token        | Value  | Figma variable | Token        | Value  | Figma variable |
|--------------|--------|----------------|--------------|--------|----------------|
| `--space-1`  | `4px`  | `space/1`      | `--space-5`  | `20px` | `space/5`      |
| `--space-2`  | `8px`  | `space/2`      | `--space-6`  | `24px` | `space/6`      |
| `--space-3`  | `12px` | `space/3`      | `--space-8`  | `32px` | `space/8`      |
| `--space-4`  | `16px` | `space/4`      | `--space-10` | `40px` | `space/10`     |

### Typography

| Token                | Value                              | Figma variable        |
|----------------------|------------------------------------|-----------------------|
| `--font-sans`        | `'Inter', system-ui, sans-serif`   | `font/sans` (STRING)  |
| `--font-mono`        | `'JetBrains Mono', monospace`      | `font/mono` (STRING)  |
| `--text-xs`          | `11px`                             | `text/xs`             |
| `--text-sm`          | `12px`                             | `text/sm`             |
| `--text-base`        | `14px`                             | `text/base`           |
| `--text-lg`          | `16px`                             | `text/lg`             |
| `--text-xl`          | `20px`                             | `text/xl`             |
| `--text-2xl`         | `24px`                             | `text/2xl`            |
| `--text-3xl`         | `30px`                             | `text/3xl`            |
| `--font-normal`      | `400`                              | `font/weight-normal`  |
| `--font-medium`      | `500`                              | `font/weight-medium`  |
| `--font-semibold`    | `600`                              | `font/weight-semibold`|

### Shadows

| Token          | Figma variable | Dark value                        | Light value                       |
|----------------|----------------|-----------------------------------|-----------------------------------|
| `--shadow-sm`  | `shadow/sm`    | `0 1px 3px rgba(0,0,0,0.40)`      | `0 1px 3px rgba(0,0,0,0.08)`      |
| `--shadow-md`  | `shadow/md`    | `0 4px 12px rgba(0,0,0,0.50)`     | `0 4px 12px rgba(0,0,0,0.12)`     |
| `--shadow-lg`  | `shadow/lg`    | `0 8px 24px rgba(0,0,0,0.60)`     | `0 8px 24px rgba(0,0,0,0.16)`     |

### Re-theming guide

To apply a completely different look (e.g. Barbie, corporate, retro), override **any** of the above in `:root[data-theme="light"]` in `tokens.css`, then update the matching Figma variables. High-impact changes:
- **Shape**: change `radius/sm`, `radius/md`, `radius/lg` (e.g. `12px`, `16px`, `24px` = very rounded)
- **Font**: change `font/sans` (e.g. `'Pacifico', cursive` = playful; `'DM Sans', sans-serif` = clean)
- **Shadows**: change `shadow/*` (e.g. pink-tinted = `rgba(233,30,140,…)`)
- **Density**: change `space/*` tokens (larger = airier, smaller = compact)

## Dev Servers

| Server    | Command              | Port |
|-----------|----------------------|------|
| Vite      | `npm run dev`        | 5173 |
| Storybook | `npm run storybook`  | 6006 |

Launch configs are in `.claude/launch.json` — use `preview_start("Storybook")` or `preview_start("Vite (React)")`.

## File Structure

```
src/
  tokens.css                    ← CSS variables (source of truth)
  components/
    <Name>/
      <Name>.tsx                ← React component
      <Name>.css                ← Styles (uses CSS variables only)
      <Name>.stories.tsx        ← Storybook stories
      <Name>.figma.tsx          ← Figma Code Connect mapping
.storybook/
  preview.jsx                   ← Imports tokens.css, sets dark background
figma.config.json               ← Code Connect config
```
