import {
  BlockStack,
  Card,
  ResourceList,
  Text,
  ResourceItem,
  Avatar,
  Box,
  InlineStack,
  Badge,
  Button
} from '@shopify/polaris';
import { DragHandleMinor, MobileCancelMajor } from '@shopify/polaris-icons';
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
import styles from './SortableList.module.css';

const Item = ({ id, title, status }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id
  });

  const tone = status === 'active' ? 'success' : status === 'draft' ? 'info' : undefined;

  const style = {
    ...(transform
      ? {
          transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          transition
        }
      : {}),
    zIndex: isDragging ? 1000 : 0,
    position: 'relative'
  };

  return (
    <div style={style} ref={setNodeRef}>
      <ResourceItem
        id={id}
        accessibilityLabel={`View details for ${title}`}
        onClick={() => console.log('Handle item click')}
      >
        <InlineStack align='space-between' blockAlign='center'>
          <InlineStack gap='400' blockAlign='center'>
            {/* Build your own implementation of the ResourceItem, but preserve this drag handle div as the first item in the InlineStack */}
            <div
              {...attributes}
              {...listeners}
              onClick={(e) => e.stopPropagation()}
              className={styles.itemAction}
              style={{ touchAction: 'none' }} // Prevents page scrolling on mobile touch
            >
              <DragHandleMinor width='20' height='20' />
            </div>
            {/* Don't use `media` prop of ResourceItem, if you need to you can place your Avatar or Image here instead after the DragHandler */}
            <Avatar size='md' name={title} />
            <Text variant='bodyMd' as='h3'>
              {title}
            </Text>
          </InlineStack>
          <InlineStack gap='400'>
            <Badge tone={tone} size='small'>
              {`${status.charAt(0).toUpperCase()}${status.slice(1)}`}
            </Badge>
            <div
              style={{ width: 20, height: 20 }}
              className={styles.itemAction}
              onClick={(e) => {
                e.stopPropagation();
                console.log('Remove Item');
              }}
            >
              <Button icon={MobileCancelMajor} variant='monochromePlain'></Button>
            </div>
          </InlineStack>
        </InlineStack>
      </ResourceItem>
    </div>
  );
};

export const SortableList = ({ items, setItems }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      // Updates items in state, add additional update handler logic here (e.g. API calls, toasts, etc.)
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const updatedItems = arrayMove(items, oldIndex, newIndex);

        return updatedItems;
      });
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
            <ResourceList
              resourceName={{ singular: 'customer', plural: 'customers' }}
              items={items}
              renderItem={(item) => {
                return <Item {...item} />;
              }}
            />
          </SortableContext>
        </DndContext>
      </BlockStack>
    </Card>
  );
};
