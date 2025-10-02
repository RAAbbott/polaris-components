# Contributing

**IMPORTANT - Before opening a pull request to contribute, make sure your component meets these guidelines:**
- Compatible with the latest major version of [Polaris](https://polaris.shopify.com/) (currently v12) and the latest major version of [Polaris Icons](https://polaris.shopify.com/icons) (currently v8)
- Follows design guidelines laid out by the Polaris docs ([design](https://polaris.shopify.com/design), [content](https://polaris.shopify.com/content), and [patterns](https://polaris.shopify.com/patterns))
- Primarily built with components from the Polaris library, filling in blanks with html + css where needed (prefer inline styles for the sake of copy/paste ease, use a css module if needed)
- External dependencies should be used *sparingly*
- If adding a variation of an existing Polaris Component on the site, it should differ significantly in either function or appearance

---

## Quick Start

1. **Fork and clone** this repository
2. **Install dependencies**: `yarn install`
3. **Start dev server**: `yarn dev`
4. **Create your component** following the structure below
5. **Test thoroughly** before submitting a PR

---

## Development Workflow

### Step 1: Create Component Directory Structure

Create a new folder under `/components/library/YourComponentName/`:

```
/components/library/YourComponentName/
  /Preview/
    - YourComponentName.jsx       # The component implementation
    - Example.jsx                  # Example usage of your component
    - YourComponentName.module.css # (Optional) CSS module if needed
    - index.ts                     # Exports Example as Preview
  - tabs.config.json               # Config for code display tabs
  - index.ts                       # Main exports file
```

### Step 2: Build Your Component

**YourComponentName.jsx** - The actual component:
```jsx
import { Card, Text } from '@shopify/polaris';

export const YourComponentName = ({ title }) => {
  return (
    <Card>
      <Text as="h2" variant="headingMd">
        {title}
      </Text>
    </Card>
  );
};
```

**Example.jsx** - Shows how to use it:
```jsx
import { Layout, Page } from '@shopify/polaris';
import { YourComponentName } from './YourComponentName';

export const Example = () => {
  return (
    <Page narrowWidth>
      <Layout>
        <Layout.Section>
          <YourComponentName title="Hello World" />
        </Layout.Section>
      </Layout>
    </Page>
  );
};
```

**Preview/index.ts** - Export the example:
```typescript
export { Example as Preview } from './Example';
```

### Step 3: Create tabs.config.json

This file tells the system which files to display in the code viewer:

**Basic component** (no CSS):
```json
{
  "files": [
    {
      "file": "Preview/Example.jsx",
      "title": "Example Usage"
    },
    {
      "file": "Preview/YourComponentName.jsx",
      "title": "YourComponentName.jsx"
    }
  ]
}
```

**Component with CSS module**:
```json
{
  "files": [
    {
      "file": "Preview/Example.jsx",
      "title": "Example Usage"
    },
    {
      "file": "Preview/YourComponentName.jsx",
      "title": "YourComponentName.jsx"
    },
    {
      "file": "Preview/YourComponentName.module.css",
      "title": "YourComponentName.module.css",
      "lang": "css"
    }
  ]
}
```

**Language options**: `jsx`, `tsx`, `css`, `scss`, `typescript`, `javascript`, etc.

### Step 4: Generate tabs.ts

Run the generation script:
```bash
yarn generate-tabs
```

This reads your component files and generates `tabs.ts` with the actual code content. The `tabs.ts` file is auto-generated - **never edit it manually!**

**Note**: This also runs automatically before builds via the `prebuild` script, so if you forget this step, the build process will handle it.

### Step 5: Create Main index.ts

In your component's root directory (`/YourComponentName/index.ts`):

```typescript
import { Platform } from '@/types';

export { tabs } from './tabs';
export { Preview } from './Preview';
export const title = 'Your Component Name'; // Display name
export const contributors = [
  { username: 'your-github-username', platform: Platform.GITHUB }
];

// Optional: if your component requires external dependencies
export const dependencies = ['package-name', 'another-package'];
```

### Step 6: Add to Navigation

Edit `/components/Layout.tsx` and add your component to the navigation:

```typescript
{
  label: 'Your Component Name',
  icon: AppsIcon,
  selected: asPath === '/components/your-component-name', // kebab-case
  onClick: () => changePage('/components/your-component-name')
}
```

The route must be in **kebab-case** (e.g., `your-component-name`).

### Step 7: Test Your Component

1. **View in browser**: Navigate to `http://localhost:3000/components/your-component-name`
2. **Check the preview**: Verify your component renders correctly
3. **Check the code tabs**: Ensure all code files display properly
4. **Copy & test**: Copy the code from the UI and paste it into a fresh Polaris project to ensure it works standalone

If you make changes to your component files, run `yarn generate-tabs` again to update the displayed code.

---

## Component Structure Explained

### Preview Folder
Contains all the code that will be displayed to users:
- **Component file**: The actual implementation
- **Example file**: Demonstrates usage
- **CSS module** (optional): Styles if needed
- **index.ts**: Exports the Example as Preview

### tabs.config.json
A simple JSON file listing which files to show in the code viewer. The build script reads these files and generates `tabs.ts` automatically.

### Main index.ts
Exports everything needed for the component page:
- `tabs` - Auto-generated code snippets
- `Preview` - The rendered example
- `title` - Display name
- `contributors` - Your info (optional)
- `dependencies` - External packages (optional)

---

## Best Practices

### Styling
- **Prefer inline styles** when possible (easier to copy/paste)
- **Use CSS modules** only when inline styles become unwieldy
- **Follow Polaris design tokens** for consistency

### Code Quality
- **Keep it simple**: Users should understand your code easily
- **Add comments**: Explain non-obvious logic
- **Use TypeScript types**: When appropriate
- **Test edge cases**: Empty states, loading states, errors

### Documentation
- **Clear prop names**: Self-documenting where possible
- **Example usage**: Show common use cases
- **Comment complex logic**: Help users understand

---

## Troubleshooting

### Component not showing in navigation
- Check that you added it to `Layout.tsx`
- Verify the route matches the component name in kebab-case
- Restart the dev server

### Code not displaying correctly
- Run `yarn generate-tabs` to regenerate tabs.ts
- Check that file paths in `tabs.config.json` are correct
- Verify files exist in the Preview folder

### Dev server errors after adding component
- Restart dev server: Stop (Ctrl+C) and run `yarn dev`
- Run `yarn build` to check for build errors

### Changes not showing up
- Run `yarn generate-tabs` after editing component files
- Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R)
- Check browser console for errors

---

## External Dependencies

If your component requires external packages:

1. **Add to package.json dependencies** (submit with PR)
2. **Export from index.ts**:
   ```typescript
   export const dependencies = ['package-name'];
   ```
3. **Document in Example.jsx**: Add comments showing installation

External dependencies should be used sparingly and only when necessary.

---

## Pull Request Checklist

Before submitting:
- [ ] Component follows Polaris design guidelines
- [ ] Code is clean and well-commented
- [ ] `tabs.config.json` created
- [ ] `yarn generate-tabs` run successfully
- [ ] Component added to navigation in `Layout.tsx`
- [ ] Tested in browser - preview and code display work
- [ ] Tested code by copying to external Polaris project
- [ ] No build errors (`yarn build` succeeds)
- [ ] Contributors added to index.ts

---

## Need Help?

- Open a [GitHub Discussion](https://github.com/RAAbbott/polaris-components/discussions) for questions
- Report bugs via [GitHub Issues](https://github.com/RAAbbott/polaris-components/issues)
- Reach out on [Twitter/X](https://x.com/devwithalex)

Thank you for contributing! 🎉
