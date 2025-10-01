# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
A Next.js-based component library showcasing reusable Shopify Polaris components for Shopify app developers. Components are displayed with live previews and copyable code examples.

## Development Commands
- **Start dev server**: `yarn dev`
- **Build**: `yarn build`
- **Start production**: `yarn start`
- **Lint**: `yarn lint`
- **Install dependencies**: `yarn install`

## Architecture

### Page Routing
- Dynamic routing via `/pages/components/[component].tsx`
- Route format: `/components/kebab-case-name` (e.g., `/components/action-card`)
- Route names are converted to PascalCase for component imports (e.g., `action-card` → `ActionCard`)

### Component Structure
All components live in `/components/library/[ComponentName]/`:

```
/ComponentName
  /Preview
    - ComponentName.jsx     # The actual component implementation
    - Example.jsx           # Renders the component with example props
    - index.ts              # Exports the Example as Preview
  - tabs.ts                 # Uses generateTabs() to auto-read files
  - index.ts                # Exports tabs, Preview, title, contributors, dependencies
  - Banner.tsx              # (Optional) contextual info banner
```

**New Simplified Pattern:** The `tabs.ts` file is auto-generated at build time from a simple `tabs.config.json` file - no more manual string duplication!

### Required Exports (in component's index.ts)
- `tabs`: Auto-generated from `tabs.config.json` (never edit tabs.ts directly!)
- `Preview`: Component function that renders the preview
- `title`: Display name for the component
- `contributors`: (Optional) Array of contributor objects with username and platform
- `dependencies`: (Optional) Array of external dependency names

### Tabs Pattern
Create a `tabs.config.json` file in your component directory:
```json
{
  "files": [
    { "file": "Preview/Example.jsx", "title": "Example Usage" },
    { "file": "Preview/ComponentName.jsx", "title": "ComponentName.jsx" },
    { "file": "Preview/ComponentName.module.css", "title": "styles", "lang": "css" }
  ]
}
```

Then run `yarn generate-tabs` to auto-generate `tabs.ts`. This runs automatically before builds via the `prebuild` script.

### Key Files
- `/components/Layout.tsx`: Navigation structure - add new components to the Navigation.Section items array
- `/components/RenderComponent.tsx`: Universal component renderer with code viewer, copy functionality, and resizable editor
- `/types.ts`: TypeScript types for PageComponent, Tab, Contributor, Platform

### Component Registration
To add a new component to navigation, edit `/components/Layout.tsx` and add to the Navigation.Section items:

```typescript
{
  label: 'Component Name',
  icon: AppsIcon,
  selected: asPath === '/components/component-name',
  onClick: () => changePage('/components/component-name')
}
```

## Contribution Guidelines
- Compatible with latest Polaris (v12+) and Polaris Icons (v8+)
- Follow Polaris design guidelines (design, content, patterns)
- Built primarily with Polaris components, HTML/CSS where needed
- Prefer inline styles for copy/paste ease, use CSS modules if necessary
- External dependencies should be used sparingly
- Components should differ significantly in function or appearance from existing Polaris components

## Dependencies
- Next.js 13 (Pages Router)
- React 18
- Shopify Polaris 13
- TypeScript
- Tailwind CSS
- @dnd-kit (for drag-and-drop)
- react-quill (for rich text editor)
- Yarn 4 (package manager)
