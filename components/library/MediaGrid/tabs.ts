import { Tab } from '@/types';

const MediaGrid = `import { useState, useCallback } from 'react';
import { DropZone, Image, Icon, Button } from '@shopify/polaris';
import { DeleteIcon, PlusIcon } from '@shopify/polaris-icons';
import styles from './MediaGrid.module.css';

export const MediaGrid = () => {
  const [images, setImages] = useState([]);

  const handleDrop = useCallback((_droppedFiles, acceptedFiles) => {
    setImages((prev) => [...prev, ...acceptedFiles?.map((file) => ({ file, id: generateId() }))]);
  }, []);

  if (images?.length) {
    return (
      <div className={styles.grid}>
        {images.map((image, i) => {
          return (
            <div
              key={image.id}
              className={styles.mediaItem}
              style={i === 0 ? { gridColumn: '1 / span 2', gridRow: '1 / span 2' } : undefined}
            >
              <div className={styles.mediaOverlay}>
                <div className={styles.deleteButton}>
                  <Button
                    size='micro'
                    icon={DeleteIcon}
                    tone='critical'
                    onClick={() => setImages((prev) => prev.toSpliced(i, 1))}
                  ></Button>
                </div>
              </div>

              <Image
                source={URL.createObjectURL(image.file)}
                width='100%'
                height='100%'
                alt='Media image'
                className={styles.image}
              />
            </div>
          );
        })}

        <DropZone outline={false} onDrop={handleDrop} accept='image/*' type='image'>
          <div className={styles.dropZoneBox}>
            <Icon source={PlusIcon}></Icon>
          </div>
        </DropZone>
      </div>
    );
  }

  return (
    <DropZone accept='image/*' type='image' onDrop={handleDrop}>
      <DropZone.FileUpload />
    </DropZone>
  );
};

/* 
  Very basic ID generator, used to prevent duplicate id errors 
  if uploading the same image multiple times. Can swap out for
  something more robust or use an npm package like \`uuid\` 
*/
const generateId = () => {
  return Math.random().toString(20).slice(3);
};
`;

const Example = `import { Layout, Page, Card, BlockStack, Text } from '@shopify/polaris';
import { MediaGrid } from './MediaGrid';

export const Example = () => {
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap='400'>
              <Text variant='headingMd' as='h3'>
                Media
              </Text>
              <MediaGrid />
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};
`;

const MediaGridCSS = `.grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(auto, 1fr);
  gap: var(--p-space-150);
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.dropZoneBox {
  background: var(--p-color-bg-surface-secondary);
  border-color: var(--p-color-border-tertiary);
  border-style: dashed;
  border-radius: var(--p-border-radius-200);
  border-width: var(--p-border-width-0165);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  cursor: pointer;
  aspect-ratio: 1;
}

.dropZoneBox:hover {
  background: var(--p-color-bg-surface-secondary-hover);
}

.mediaItem {
  border: 1px solid rgba(204, 204, 204, 1);
  position: relative;
  display: flex;
  border-radius: var(--p-border-radius-200);
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;
}

.mediaOverlay {
  background-color: #00000080;
  opacity: 0;
  height: 100%;
  border-radius: var(--p-border-radius-200);
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity var(--p-motion-duration-150);
}

.mediaOverlay:hover {
  opacity: 1;
}

.deleteButton {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
}

.image {
  object-fit: cover;
  border-radius: var(--p-border-radius-200);
  aspect-ratio: 1;
}
`;

export const tabs: Tab[] = [
  { title: 'Example Usage', content: Example },
  { title: 'MediaGrid.jsx', content: MediaGrid },
  { title: 'MediaGrid.module.css', content: MediaGridCSS }
];
