import { useState } from 'react';
import { Card, Box, InlineStack, Text, Collapsible } from '@shopify/polaris';
import { ChevronUpIcon, ChevronDownIcon } from "@shopify/polaris-icons";

export const Accordion = () => {
  const [expanded, setExpanded] = useState(0); // Set to null if none should be expanded by default

  return (
    <Card padding='0'>
      {ACCORDION_ITEMS.map(({ title, id, content }) => {
        const isExpanded = expanded === id;
        return (
          <Box
            borderBlockEndWidth='025'
            borderColor='border'
            background='bg-surface-secondary'
            key={id}
          >
            <Box paddingBlock='300' paddingInline='400'>
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  return setExpanded((prev) => (id === prev ? null : id));
                }}
              >
                <InlineStack align='space-between' blockAlign='center'>
                  <Text variant='headingMd' as='p'>
                    {title}
                  </Text>
                  {isExpanded ? (
                    <ChevronUpIcon width='1.5rem' height='1.5rem' />
                  ) : (
                    <ChevronDownIcon width='1.5rem' height='1.5rem' />
                  )}
                </InlineStack>
              </div>
            </Box>
            <Collapsible open={isExpanded}>
              <Box padding='400' background='bg-surface'>
                {content}
              </Box>
            </Collapsible>
          </Box>
        );
      })}
    </Card>
  );
};

const ACCORDION_ITEMS = [
  {
    id: 0,
    title: 'Step 1',
    content: (
      <Text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi tempore, saepe minima
        nesciunt impedit quaerat repellat eveniet, dignissimos quis quo sed maxime aspernatur qui,
        quod consectetur optio veritatis iusto eligendi?
      </Text>
    )
  },
  {
    id: 1,
    title: 'Step 2',
    content: (
      <Text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi tempore, saepe minima
        nesciunt impedit quaerat repellat eveniet, dignissimos quis quo sed maxime aspernatur qui,
        quod consectetur optio veritatis iusto eligendi?
      </Text>
    )
  },
  {
    id: 2,
    title: 'Step 3',
    content: (
      <Text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi tempore, saepe minima
        nesciunt impedit quaerat repellat eveniet, dignissimos quis quo sed maxime aspernatur qui,
        quod consectetur optio veritatis iusto eligendi?
      </Text>
    )
  },
  {
    id: 3,
    title: 'Step 4',
    content: (
      <Text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi tempore, saepe minima
        nesciunt impedit quaerat repellat eveniet, dignissimos quis quo sed maxime aspernatur qui,
        quod consectetur optio veritatis iusto eligendi?
      </Text>
    )
  }
];
