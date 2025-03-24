import { Tab } from '@/types';

const SortableTable = `import { useCallback, useState } from 'react';
import {
  BlockStack,
  Card,
  Text,
  Box,
  Badge,
  Button,
  IndexTable,
  ActionList,
  Popover,
  useBreakpoints
} from '@shopify/polaris';
import { DragHandleIcon, MenuHorizontalIcon } from '@shopify/polaris-icons';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers';
import { CSS } from '@dnd-kit/utilities';
import styles from './SortableTable.module.css';

// This is the HOC that wraps the component to allow ref/style/className props to be passed to the component
import { enrichPolarisComponent } from 'enrich-polaris-component';

// A popover button that contains an ActionList of actions that can be performed on the item.
// The popover is opened by clicking the button.
export const ActionListPopoverButton = ({ items }) => {
  const [popoverActive, setPopoverActive] = useState(false);
  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  return (
    // Hack to align the popover contents at the correct level vertically
    // Based on style from a standard Polaris button
    <div style={{ height: 'var(--p-height-500)' }}>
      <Popover
        active={popoverActive}
        activator={
          <Button
            variant='monochromePlain'
            icon={MenuHorizontalIcon}
            accessibilityLabel='Actions'
            onClick={togglePopoverActive}
          />
        }
        autofocusTarget='first-node'
        onClose={togglePopoverActive}
      >
        <ActionList
          actionRole='menuitem'
          items={
            // Copy the item properties to the action list items,
            // and add an extra onAction handler that closes the popover
            items?.map((item) => ({
              ...item,
              onAction: () => {
                item.onAction?.();
                togglePopoverActive();
              }
            })) ?? []
          }
        />
      </Popover>
    </div>
  );
};

// Create an 'enriched' wrapped version of the IndexTable.Row component, to make it able to be sorted.
// This is a workaround for the fact that IndexTable.Row doesn't accept a 'ref' or 'style' prop directly.
// !!! Important, this must be declared outside of the component to avoid re-creating it on every render !!!
// Or we could create it in a separate file and import it here.
const SortableIndexTableRow = enrichPolarisComponent(IndexTable.Row);

const SortableRow = ({ id, title, status, index }) => {
  // DnD Kit's useSortable hook provides the drag-and-drop functionality for the row
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id
  });

  // Convert the status to a tone for the badge:
  const tone = status === 'active' ? 'success' : status === 'draft' ? 'info' : undefined;

  // Define the drag style for the row, based on the dragging state:
  const dragStyle = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: 'relative'
  };

  return (
    <SortableIndexTableRow      
      // Original props that are passed to the original component:
      id={\`table-row-\${id}\`}
      key={id}
      position={index}
      // New props that couldn't be set on the original component:
      ref={setNodeRef}
      style={dragStyle}
    >
      <IndexTable.Cell>
        <div
          {...attributes}
          {...listeners}
          onClick={(e) => e.stopPropagation()}
          className='itemAction'
          style={{
            height: 'var(--p-height-500)',
            touchAction: 'none'
          }}
        >
          <DragHandleIcon width='20' height='20' onClick={() => console.log('Handle item click')} />
        </div>
      </IndexTable.Cell>
      <IndexTable.Cell>{title}</IndexTable.Cell>
      <IndexTable.Cell>
        <Badge tone={tone} size='small'>
          {\`\${status.charAt(0).toUpperCase()}\${status.slice(1)}\`}
        </Badge>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <BlockStack align='center' inlineAlign='end'>
          <ActionListPopoverButton
            items={[
              {
                content: 'Some action...',
                onAction: () => {
                  console.log('Perform some action for item with id:', id);
                }
              },
              {
                content: 'Some other action...',
                onAction: () => {
                  console.log('Perform some other action for item with id:', id);
                }
              }
            ]}
          />
        </BlockStack>
      </IndexTable.Cell>
    </SortableIndexTableRow>
  );
};

export const SortableTable = ({ items, setItems }) => {
  const rowMarkup = items.map((item, index) => (
    <SortableRow key={item.id} {...item} index={index} />
  ));

  const resourceName = {
    singular: 'item',
    plural: 'items'
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    console.log('🔎 > handleDragEnd > handleDragEnd:', active, over);

    if (active.id !== over.id) {
      // Updates items in state, add additional update handler logic here (e.g. API calls, toasts, etc.)
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const updatedItems = arrayMove(items, oldIndex, newIndex);

        console.log('🔄 > Updated items:', updatedItems);
        return updatedItems;
      });

      // Do your update logic based on the new order here...
    }
  };

  return (
    <Card padding='0'>
      <BlockStack gap='300'>
        <Box paddingBlockStart='300' paddingInlineStart='300' zIndex='100'>
          <Text as='h3' variant='headingSm'>
            Sortable Products
          </Text>
        </Box>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <IndexTable
              condensed={useBreakpoints().smDown}
              resourceName={resourceName}
              itemCount={items.length}
              selectable={false}
              headings={[
                { title: '', alignment: 'center', id: 'drag-handle' },
                { title: 'Name' },
                { title: 'Status', alignment: 'start' },
                { title: '', alignment: 'end', id: 'extra-actions' }
              ]}
            >
              {rowMarkup}
            </IndexTable>
          </SortableContext>
        </DndContext>
      </BlockStack>
    </Card>
  );
}; 
`;

const SortableTableCss = `/* If using CSS modules in Remix, make sure you have configured CSS bundling (https://remix.run/docs/en/main/styling/bundling) */

`;

const Example = `import { useState } from 'react';
import { Page, Layout } from '@shopify/polaris';
import { SortableTable } from './SortableTable';

export const Example = () => {
  const [items, setItems] = useState([
    { id: 1, title: 'T-Shirt', status: 'active' },
    { id: 2, title: 'Skateboard', status: 'active' },
    { id: 3, title: 'Snowboard', status: 'archived' },
    { id: 4, title: 'Ultimate Snowboard', status: 'active' },
    { id: 5, title: 'Mechanical Pencil', status: 'draft' }
  ]);

  return (
    <Page narrowWidth>
      <Layout>
        <Layout.Section>
          <SortableTable items={items} setItems={setItems} />
        </Layout.Section>
      </Layout>
    </Page>
  );
};
`;

export const tabs: Tab[] = [
  { title: 'Example Usage', content: Example },
  { title: 'SortableTable.jsx', content: SortableTable },
  { title: 'SortableTable.module.css', content: SortableTableCss, lang: 'css' }
];
