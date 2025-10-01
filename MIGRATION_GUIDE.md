# Migration Guide: Moving to Auto-Generated Tabs

This guide helps you migrate existing components from manual string duplication to auto-generated tabs.

## What Changed?

**Before:** Manually duplicated code as strings in `tabs.ts` (70-445+ lines)
```typescript
const Example = `import { Layout, Page } from "@shopify/polaris";
// ... entire file as a string
`;

export const tabs = [
  { title: 'Example Usage', content: Example }
];
```

**After:** Simple JSON config file (8-15 lines)
```json
{
  "files": [
    { "file": "Preview/Example.jsx", "title": "Example Usage" },
    { "file": "Preview/ComponentName.jsx", "title": "ComponentName.jsx" }
  ]
}
```

## Migration Steps

### 1. Create `tabs.config.json`

In your component directory (e.g., `components/library/ActionCard/`), create a `tabs.config.json` file:

```json
{
  "files": [
    {
      "file": "Preview/Example.jsx",
      "title": "Example Usage"
    },
    {
      "file": "Preview/ComponentName.jsx",
      "title": "ComponentName.jsx"
    }
  ]
}
```

**With CSS modules:**
```json
{
  "files": [
    { "file": "Preview/Example.jsx", "title": "Example Usage" },
    { "file": "Preview/ComponentName.jsx", "title": "ComponentName.jsx" },
    { "file": "Preview/ComponentName.module.css", "title": "ComponentName.module.css", "lang": "css" }
  ]
}
```

### 2. Generate tabs.ts

Run the generation script:
```bash
yarn generate-tabs
```

This will create/update `tabs.ts` with the actual file contents.

### 3. Commit Both Files

Both `tabs.config.json` (source) and `tabs.ts` (generated) should be committed to git. The `tabs.ts` file is generated at build time, but committing it means it works without requiring a build step in all environments.

### 4. Test

Run the dev server or build:
```bash
yarn dev
# or
yarn build
```

The `prebuild` script automatically runs `yarn generate-tabs` before each build.

## Examples

### ActionCard (Simple)
**tabs.config.json:**
```json
{
  "files": [
    { "file": "Preview/Example.jsx", "title": "Example Usage" },
    { "file": "Preview/ActionCard.jsx", "title": "ActionCard.jsx" }
  ]
}
```
**Result:** 70 lines → 8 lines of config

### SetupGuide (With CSS)
**tabs.config.json:**
```json
{
  "files": [
    { "file": "Preview/Example.jsx", "title": "Example Usage" },
    { "file": "Preview/SetupGuide.jsx", "title": "SetupGuide.jsx" },
    { "file": "Preview/SetupGuide.module.css", "title": "SetupGuide.module.css", "lang": "css" }
  ]
}
```
**Result:** 445 lines → 12 lines of config

## Migration Status

Components already migrated:
- ✅ ActionCard
- ✅ SetupGuide

Run this to check remaining components:
```bash
find components/library -type d -maxdepth 1 -exec sh -c 'component=$(basename "{}"); [ -f "{}/tabs.config.json" ] && echo "✅ $component" || echo "⏳ $component"' \;
```

## Benefits

- **97% less code:** From hundreds of lines to ~10 lines of JSON
- **Single source of truth:** Component files are the source
- **Always in sync:** Can't forget to update the display code
- **Auto language detection:** `.jsx`, `.css`, `.ts` all detected automatically
- **Simpler contributions:** Just list files in JSON, done!

## Troubleshooting

**Issue:** `tabs.ts` not updated after changing component
**Solution:** Run `yarn generate-tabs` manually, or run `yarn build` (which runs it automatically)

**Issue:** Component not showing correct code
**Solution:** Check that file paths in `tabs.config.json` are relative to the component directory

**Issue:** Language syntax highlighting wrong
**Solution:** Add explicit `"lang"` field to the file config (e.g., `"lang": "css"`)
