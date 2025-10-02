# Quick Start Guide

Get your first component up and running in 5 minutes!

## Prerequisites

- Node.js and Yarn installed
- Forked and cloned this repository
- Basic knowledge of React and Polaris

## 5-Minute Component Setup

### 1. Install & Run (1 min)

```bash
yarn install
yarn dev
```

Visit `http://localhost:3000` to see the site running.

### 2. Create Component Files (2 min)

Create this folder structure in `/components/library/`:

```
MyCard/
  Preview/
    MyCard.jsx
    Example.jsx
    index.ts
  tabs.config.json
  index.ts
```

**MyCard.jsx:**
```jsx
import { Card, Text } from '@shopify/polaris';

export const MyCard = ({ title, content }) => {
  return (
    <Card>
      <Text as="h2" variant="headingMd">{title}</Text>
      <Text as="p" tone="subdued">{content}</Text>
    </Card>
  );
};
```

**Example.jsx:**
```jsx
import { Layout, Page } from '@shopify/polaris';
import { MyCard } from './MyCard';

export const Example = () => {
  return (
    <Page narrowWidth>
      <Layout>
        <Layout.Section>
          <MyCard
            title="Hello World"
            content="This is my first component!"
          />
        </Layout.Section>
      </Layout>
    </Page>
  );
};
```

**Preview/index.ts:**
```typescript
export { Example as Preview } from './Example';
```

### 3. Create Config Files (1 min)

**tabs.config.json:**
```json
{
  "files": [
    { "file": "Preview/Example.jsx", "title": "Example Usage" },
    { "file": "Preview/MyCard.jsx", "title": "MyCard.jsx" }
  ]
}
```

**index.ts:**
```typescript
import { Platform } from '@/types';

export { tabs } from './tabs';
export { Preview } from './Preview';
export const title = 'My Card';
export const contributors = [
  { username: 'your-github-username', platform: Platform.GITHUB }
];
```

### 4. Generate & Add to Nav (1 min)

```bash
# Generate the tabs
yarn generate-tabs
```

Add to `/components/Layout.tsx` in the Navigation section:
```typescript
{
  label: 'My Card',
  icon: AppsIcon,
  selected: asPath === '/components/my-card',
  onClick: () => changePage('/components/my-card')
}
```

Restart your dev server (Ctrl+C, then `yarn dev` again).

### 5. View Your Component!

Navigate to: `http://localhost:3000/components/my-card`

You should see:
- ✅ Your component preview at the top
- ✅ Code tabs at the bottom showing your files
- ✅ Copy button to grab the code

## What's Next?

- Read the full [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines
- Check out [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) to understand the architecture
- Browse existing components in `/components/library/` for examples

## Common Issues

**Component not showing?**
→ Restart dev server (Ctrl+C, then `yarn dev`)

**Code not displaying?**
→ Run `yarn generate-tabs`

**Route not working?**
→ Check that the route in Layout.tsx matches your folder name in kebab-case

## Need Help?

Open a [GitHub Discussion](https://github.com/RAAbbott/polaris-components/discussions) or check [CONTRIBUTING.md](./CONTRIBUTING.md) for troubleshooting tips.

Happy coding! 🚀
