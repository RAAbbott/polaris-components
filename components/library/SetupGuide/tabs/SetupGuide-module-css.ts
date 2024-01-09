export const SetupGuideCss = `/* If using CSS modules in Remix, make sure you have properly configured your project (https://remix.run/docs/en/main/styling/css-modules#css-modules) */

.setupItem {
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
}
  
.setupItem:hover {
  background-color: #f7f7f7;
}

.setupItemExpanded:hover {
  background-color: inherit;
}

.completeButton {
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.itemContent {
  width: 100%;
  display: flex;
  gap: 8rem;
  justify-content: space-between;
}

/* These styles take into account the Shopify sidebar visibility for embedded apps */
@media (min-width: 48em) and (max-width: 61.871875em) {
  .itemImage {
    display: none;
  }
}

@media (max-width: 45.625em) {
  .itemImage {
    display: none;
  }
}`