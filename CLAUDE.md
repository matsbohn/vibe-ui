# vibe-ui — Claude Instructions

## Design System

This project uses a **dark dashboard design system** built in React + TypeScript + Vite with Storybook.

- **Figma file:** https://www.figma.com/design/zwaWF3nBphX3Wx6skh2ocA/vibe-ui
- **Design System page:** All components live on the "Design System" page in Figma
- **CSS tokens:** `src/tokens.css` is the single source of truth for all colors, spacing, typography, radius, and shadows

## Working with Components

### Always use Figma MCP — never guess

When creating or updating components, **always use the Figma MCP** (`get_design_context` or `get_screenshot`) to get exact design tokens, spacing, colors, and properties. **Never guess or compare screenshots manually.**

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
| Button       | `5-11`        | Component Set |
| Badge        | `12-23`       | Component Set |
| Avatar       | `12-31`       | Component Set |
| Tag          | `12-38`       | Component Set |
| Alert        | `17-26`       | Component Set |
| Toast        | `17-44`       | Component Set |
| Breadcrumb   | `17-46`       | Component     |
| Dropdown     | `17-78`       | Component Set |
| StatCard     | `17-95`       | Component Set |
| Modal        | `19-7`        | Component     |
| DataTable    | `19-19`       | Component     |
| Sidebar      | `19-60`       | Component     |
| Topbar       | `19-83`       | Component     |

## CSS Variable Tokens

All components must use CSS variables from `src/tokens.css`. **Never hardcode hex colors or pixel values that correspond to a token.**

| Token                | Value                        | Usage                    |
|----------------------|------------------------------|--------------------------|
| `--background`       | `#242529`                    | Page background          |
| `--surface`          | `#373841`                    | Cards, sidebars, topbars |
| `--border`           | `#5F6067`                    | All borders              |
| `--border-dim`       | `rgba(95, 96, 103, 0.4)`     | Subtle dividers          |
| `--accent`           | `#A3A7F6`                    | Primary interactive      |
| `--accent-subtle`    | `rgba(163, 167, 246, 0.12)`  | Accent backgrounds       |
| `--accent-hover`     | `rgba(163, 167, 246, 0.2)`   | Accent hover state       |
| `--text-primary`     | `#DCD9DB`                    | Body text                |
| `--text-secondary`   | `#858C95`                    | Muted / labels           |
| `--text-disabled`    | `#5a5d65`                    | Disabled state text      |
| `--success`          | `#5FC98B`                    | Positive states          |
| `--warning`          | `#F5A623`                    | Warning states           |
| `--error`            | `#F06060`                    | Error / destructive      |
| `--info`             | `#60A8F0`                    | Informational            |
| `--radius-sm`        | `3px`                        | Badges, tags             |
| `--radius-md`        | `4px`                        | Buttons, inputs, cards   |
| `--radius-lg`        | `6px`                        | Modals                   |

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
