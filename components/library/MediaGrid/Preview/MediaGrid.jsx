import { useState, useCallback } from 'react';
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
  something more robust or use an npm package like `uuid` 
*/
const generateId = () => {
  return Math.random().toString(20).slice(3);
};
