# Contributing

*(This is a work in progress)*

**IMPORTANT - Before opening a pull request to contribute, make sure your component meets these guidelines:**
- Compatible with the latest major version of [Polaris](https://polaris.shopify.com/) (currently v12)
- Follows design guidelines laid out by the Polaris docs ([design](https://polaris.shopify.com/design), [content](https://polaris.shopify.com/content), and [patterns](https://polaris.shopify.com/patterns))
- Primarily built with components from the Polaris library, filling in blanks with html + css where needed (prefer inline styles for the sake of copy/paste ease, use a css module if needed)
- External dependencies should be used *sparingly*
- If adding a variation of an existing Polaris Component on the site, it should differ significantly in either function or appearance

---

If you'd like to start getting familiar with the code and adding your own components while this is being worked on, fork this repo then clone to your computer to get started.

After you've cloned the repo run `yarn install` then `yarn dev` to start the dev server. (Make sure you have `yarn` installed)

The components are currently found under `/components/library` and follow this structure (**This structure isn't optimal and will be changing soon, but will still be similar**):

```
/components
    /library
        /ActionCard
            /Preview
                - ActionCard.jsx
                - Example.jsx
                - index.ts
            - tabs.ts
            - index.ts
        /SetupGuide
        ...
```


Each component folder has a few important parts:

## Preview
The `/Preview` folder contains the code files needed to render the preview (top) section of the component page. In the case of the `ActionCard`, we have the `ActionCard.jsx` file which is the actual component code, `Example.jsx` which is the code that we export to render the component preview page, and `index.ts` which just exports the `Example` component as `Preview`. 

With this setup, the `Example.jsx` file is essentially what is rendered in the preview

## Tabs
The `tabs.ts` file looks like this:

```
const Example = `...Example.jsx code as string`
const ActionCard = `...Action.jsx code as string`

export const tabs = [
  { title: 'Example Usage', content: Example },
  { title: 'ActionCard.jsx', content: ActionCard }
];
```

This is used to generate the tabs in the code editor section of the component page. 

You can also specify a `lang` attribute for each tab for files other than `jsx` (e.g. `css`, `tsx`...`). 

I originally did this method with the stringified jsx because of simplicity and flexibility, but plan to update it soon to just read the code directly from the component files.

## Index
The `index.ts` file of the component folder (`/ActionCard/index.ts`) exports all relevant info to be rendered by the page. 

Required exports are a `tabs` array, a `Preview` component, and a `title` which is the page title. Some components will also have a `Banner` comopnent exported here (from a `Banner.tsx` file in this same folder) that is used to provide context for the component but should be used sparingly, mostly just for indicating the use of external dependencies. 

You should also export a `contributor` string which is your GitHub username, but it's not required. Your file should look like this:

```
export { tabs } from './tabs'; // REQUIRED
export { Preview } from './Preview'; // REQUIRED
export const title = 'Action Card'; // REQUIRED
export const contributor = 'RAAbbott';
```

If you build your component with this same structure in place, everything should show up correctly in the component preview and code files. If you have any questions you can reach out to me on [twitter](https://x.com/devwithalex) or open a discussion if you run into any bugs/roadblocks.
