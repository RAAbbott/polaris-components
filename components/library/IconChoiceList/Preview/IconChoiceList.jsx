import React, { useState } from 'react';
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
              className={`${styles.item} ${choice.disabled ? styles.disabled : ''} ${
                selectedValue === choice.value ? styles.active : ''
              }`}
              onClick={() => !choice.disabled && handleSelect(choice.value)}
              role='radio'
              aria-checked={selectedValue === choice.value}
              tabIndex={0}
            >
              <div className={`${styles.icon_container}`}>
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
