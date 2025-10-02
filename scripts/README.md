# Scripts

## generate-tabs.js

Auto-generates `tabs.ts` files for all components by reading their actual source code.

### Usage

```bash
# Generate tabs for all components
yarn generate-tabs

# Or run directly
node scripts/generate-tabs.js
```

### How It Works

1. Scans all directories in `components/library/`
2. Looks for `tabs.config.json` in each component directory
3. Reads the files specified in the config
4. Generates `tabs.ts` with the actual file contents
5. Automatically runs before each build via `prebuild` script

### Configuration

Each component needs a `tabs.config.json` file:

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

For CSS modules or other file types, add a `lang` field:

```json
{
  "file": "Preview/Component.module.css",
  "title": "Component.module.css",
  "lang": "css"
}
```

### Language Detection

The script auto-detects language from file extension:
- `.jsx` → `jsx`
- `.tsx` → `tsx`
- `.js` → `javascript`
- `.ts` → `typescript`
- `.css` → `css`
- `.scss` → `scss`
- `.json` → `json`
- etc.

Override with explicit `lang` field if needed.
