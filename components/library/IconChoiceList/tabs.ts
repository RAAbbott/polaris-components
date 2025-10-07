import { Tab } from '@/types';

const Example = `import { useState, useCallback } from 'react';
import { Page, Layout, Card, InlineStack } from '@shopify/polaris';
import { CollectionIcon, ProductIcon, DisabledIcon, AdjustIcon } from '@shopify/polaris-icons';

import { IconChoiceList } from './IconChoiceList';

export function Example() {
  const [selected, setSelected] = useState('product');
  const handleChange = useCallback((value) => setSelected(value), []);

  const choices = [
    { label: 'None', value: 'none', icon: DisabledIcon, helpText: 'Sample help text' },
    { label: 'Single product', value: 'product', icon: ProductIcon, helpText: 'Apply to products' },
    {
      label: 'Collection',
      value: 'collection',
      icon: CollectionIcon,
      helpText: 'Apply to collections'
    },
    {
      label: 'Custom',
      value: 'custom',
      icon: AdjustIcon,
      helpText: 'Disabled option',
      disabled: true
    }
  ];

  return (
    <Page narrowWidth>
      <Layout>
        <Layout.Section>
          <Card>
            <InlineStack align='space-between'>
              <IconChoiceList
                selected={selected}
                choices={choices}
                title='Example Icon Choice List'
                subtitle='This is an example of an Icon Choice List'
                handleChange={handleChange}
              />
            </InlineStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
`;

const IconChoiceListSample = `import React, { useState } from 'react';
import styles from './IconChoiceList.module.css';
import { BlockStack, Text, InlineStack } from '@shopify/polaris';

/**
 * @typedef {Object} Choice
 * @property {string} label - The label for the choice.
 * @property {string} value - The unique value for the choice.
 * @property {React.ComponentType} [icon] - The icon component to render for the choice.
 * @property {boolean} [disabled] - Whether the choice is disabled.
 * @property {string} [helpText] - Additional help text for the choice.

 * @typedef {Object} IconChoiceListProps
 * @property {string} [title] - The title displayed above the choices.
 * @property {string} [subtitle] - The subtitle displayed below the title.
 * @property {Choice[]} choices - The list of choices to display.
 * @property {string} [selected] - The value of the currently selected choice.
 * @property {(value: string) => void} [handleChange] - Callback function triggered when a choice is selected.
 */

/**
 * IconChoiceList component
 * @param {IconChoiceListProps} props - The props for the IconChoiceList component.
 * @returns {JSX.Element} The rendered IconChoiceList component.
 */

export const IconChoiceList = ({ title, subtitle, choices, selected, handleChange }) => {
  const [selectedValue, setSelectedValue] = useState(selected);

  const handleSelect = (value) => {
    setSelectedValue(value);
    if (handleChange) {
      handleChange(value);
    }
  };

  return (
    <>
      <BlockStack gap={400}>
        <BlockStack>
          <Text variant='headingSm'>{title}</Text>
          <Text variant='bodySm' tone='subdued'>
            {subtitle}
          </Text>
        </BlockStack>
        <InlineStack gap={400} align='center'>
          {choices.map((choice, index) => (
            <div
              key={index}
              className={\`$\{styles.item\} $\{choice.disabled ? styles.disabled : ''\} $\{
                selectedValue === choice.value ? styles.active : ''
              \}\}
              onClick={() => !choice.disabled && handleSelect(choice.value)}
              role='radio'
              aria-checked={selectedValue === choice.value}
              tabIndex={0}
            >
              <div className={\`$\{styles.icon_container\}\`}>
                <svg width={32} height={32}>
                  {choice.icon && React.createElement(choice.icon)}
                </svg>
              </div>
              <BlockStack inlineAlign='center'>
                {choice.label && (
                  <Text
                    variant='bodyMd'
                    fontWeight={selectedValue === choice.value ? 'semibold' : 'regular'}
                  >
                    {choice.label}
                  </Text>
                )}
                {choice.helpText && (
                  <Text variant='bodySm' tone='subdued'>
                    {choice.helpText}
                  </Text>
                )}
              </BlockStack>
            </div>
          ))}
        </InlineStack>
      </BlockStack>
    </>
  );
};
`;

const CSS = `.item {
  cursor: pointer;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  gap: var(--p-space-200);
}

.item.disabled {
  pointer-events: none;
  color: var(--p-color-text-disabled);
}
.item.disabled * {
  color: var(--p-color-text-disabled);
}

.item.disabled .icon_container {
  background-color: var(--p-color-checkbox-bg-surface-disabled);
  border-color: var(--p-color-border-disabled);
}

.item.disabled .icon_container svg {
  fill: var(--p-color-icon-disabled);
}

.icon_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--p-color-bg-fill-secondary);
  border-radius: var(--p-border-radius-200);
  height: var(--p-width-1600);
  width: var(--p-width-3200);
  border-width: var(--p-border-width-050);
  border-style: solid;
  border-color: var(--p-color-bg-fill-secondary);
}

.item .icon_container svg {
  fill: var(--p-color-icon);
}

.item:hover .icon_container {
  background-color: var(--p-color-bg-fill-secondary-hover);
  border-color: var(--p-color-input-border-hover);
}
.item:hover .icon_container svg {
  fill: var(--p-color-icon-hover);
}

.item.active .icon_container {
  background-color: var(--p-color-bg-surface-secondary-active);
  border-color: var(--p-color-input-border-active);
}

.item.active .icon_container svg {
  fill: var(--p-color-icon-active);
}
`;

export const tabs: Tab[] = [
  { title: 'Example Usage', content: Example },
  { title: 'IconChoiceList.jsx', content: IconChoiceListSample },
  { title: 'IconChoiceList.module.css', content: CSS, lang: 'css' }
];
