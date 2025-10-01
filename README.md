# Polaris Components

A collection of components for Shopify app developers, based on the Polaris UI library & design system

## 🚀 Quick Links

- **[Contributing Guide](./CONTRIBUTING.md)** - Complete guide for contributors
- **[Quick Start](./QUICKSTART.md)** - Get your first component running in 5 minutes
- **[Development Workflow](./docs/WORKFLOW.md)** - Daily development processes
- **[Migration Guide](./MIGRATION_GUIDE.md)** - Understanding the architecture

## 📦 What's Inside

This repository contains a collection of reusable Polaris components that you can copy and use in your Shopify app. Each component:

- ✅ Built with official Shopify Polaris components
- ✅ Follows Polaris design guidelines
- ✅ Ready to copy/paste into your project
- ✅ Includes working examples
- ✅ Displays actual source code

## 🎯 For Contributors

Want to add your own component? It's easy!

### Quick Setup

```bash
# 1. Fork and clone
git clone https://github.com/YOUR-USERNAME/polaris-components.git
cd polaris-components

# 2. Install and run
yarn install
yarn dev

# 3. Create your component
# See QUICKSTART.md for step-by-step guide
```

### Development Workflow

1. **Create component files** in `/components/library/YourComponent/`
2. **Add tabs.config.json** listing files to display
3. **Run** `yarn generate-tabs` to generate code display
4. **Add to navigation** in `Layout.tsx`
5. **Test** and submit PR!

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed instructions.

## 🏗️ Project Structure

```
components/
└── library/
    └── ComponentName/
        ├── Preview/
        │   ├── ComponentName.jsx    # Component implementation
        │   ├── Example.jsx           # Usage example
        │   └── index.ts              # Exports
        ├── tabs.config.json          # Config for code display
        └── index.ts                  # Main exports
```

## 🛠️ Key Commands

```bash
yarn dev              # Start development server
yarn build            # Build for production
yarn generate-tabs    # Generate code display tabs
yarn lint            # Run ESLint
```

## 📖 Documentation

Components are stored under `/components/library`. Each component has:

- **Preview**: The rendered component example
- **Code Tabs**: Actual source code files (auto-generated)
- **Copy Button**: One-click copy to clipboard

### Auto-Generated Code Display

This project uses an automated system for displaying code:

1. Create `tabs.config.json` listing files to show
2. Run `yarn generate-tabs` to read files and generate display code
3. Code tabs automatically show your actual component source

No manual copy/paste or string duplication needed!

## 🎨 Component Guidelines

Components should:
- Use Polaris components primarily
- Follow Polaris design patterns
- Be copy/paste friendly (prefer inline styles)
- Include clear usage examples
- Work standalone in other projects

See [CONTRIBUTING.md](./CONTRIBUTING.md) for full guidelines.

## 🤝 Contributing

Contributions are welcome! Please read our [contributing guide](./CONTRIBUTING.md) to get started.

**Before submitting a PR:**
- [ ] Component follows Polaris guidelines
- [ ] `yarn generate-tabs` runs successfully
- [ ] Component added to navigation
- [ ] Tested in browser
- [ ] Code tested by copying to fresh Polaris project
- [ ] `yarn build` succeeds

## 📚 Resources

- [Polaris Documentation](https://polaris.shopify.com/)
- [Polaris Design Guidelines](https://polaris.shopify.com/design)
- [Polaris Components](https://polaris.shopify.com/components)
- [Polaris Icons](https://polaris.shopify.com/icons)

## 🐛 Issues & Support

- **Bug reports**: [GitHub Issues](https://github.com/RAAbbott/polaris-components/issues)
- **Questions**: [GitHub Discussions](https://github.com/RAAbbott/polaris-components/discussions)
- **Twitter/X**: [@devwithalex](https://x.com/devwithalex)

## 📄 License

Licensed under the [MIT license](./LICENSE.md).

## 🌟 Contributors

Thanks to all our contributors! See component pages for individual contributor credits.

Want to be listed here? [Contribute a component!](./CONTRIBUTING.md)

---

Made with ❤️ for the Shopify developer community
