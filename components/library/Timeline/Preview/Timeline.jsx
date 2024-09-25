import { BlockStack, Box, Icon, InlineGrid, InlineStack, Link, Text } from '@shopify/polaris';
import { Fragment } from 'react';
import {
  AlertCircleIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  CircleChevronRightIcon
} from '@shopify/polaris-icons';
import styles from './timeline.module.css';

export default function Timeline({ items }) {
  function getBulletIconFromTone(tone) {
    switch (tone) {
      case 'critical':
      case 'caution':
        return AlertCircleIcon;
      case 'success':
        return CheckCircleIcon;
      case 'base':
      case undefined:
        return null;
      default:
        return CircleChevronRightIcon;
    }
  }

  let lastDate = null;

  return (
    <Box paddingInline={{ xs: '300', md: '0' }}>
      <BlockStack gap='300'>
        {items?.length ? (
          items.map((item, index) => {
            const currentDate = item.timestamp.toLocaleDateString([], {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
            const showDate = currentDate !== lastDate;
            lastDate = currentDate;
            const bulletIcon = getBulletIconFromTone(item.tone);

            return (
              <Fragment key={index}>
                {showDate && (
                  <InlineGrid gap='200' columns='30px auto 90px'>
                    <div>&nbsp;</div>
                    <BlockStack gap='0'>
                      <Box paddingBlockStart='600'>
                        <Text alignment='start' as='h2' variant='bodySm' tone='subdued'>
                          {currentDate}
                        </Text>
                      </Box>
                    </BlockStack>
                    <div>&nbsp;</div>
                  </InlineGrid>
                )}

                <InlineGrid gap='200' columns='30px auto 90px' alignItems='center'>
                  <div className={styles['timeline-icon']}>
                    {item.tone === 'base' || !bulletIcon ? (
                      <div className={styles['timeline-icon-base']}>
                        <div className={styles['timeline-icon-base-inner']} />
                      </div>
                    ) : (
                      <span className={styles['timeline-icon-polaris-icon']}>
                        <Icon source={bulletIcon} tone={item.tone} />
                      </span>
                    )}
                  </div>
                  <Box className={styles['timeline-event-description']}>
                    <InlineStack gap='200' wrap={false} blockAlign='center'>
                      {item.icon}
                      {item.url ? (
                        <Link url={item.url} monochrome removeUnderline>
                          <InlineStack gap='0' wrap={false} blockAlign='start'>
                            <Box className={styles['timeline-event-link-main']}>
                              {item.timelineEvent}
                            </Box>
                            <Icon source={ChevronRightIcon} />
                          </InlineStack>
                        </Link>
                      ) : (
                        <Box>{item.timelineEvent}</Box>
                      )}
                    </InlineStack>
                  </Box>
                  <Text as='p' alignment='end' tone='subdued' variant='bodySm'>
                    {item.timestamp.toLocaleTimeString([], {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </Text>
                </InlineGrid>
              </Fragment>
            );
          })
        ) : (
          <Text as='p'>No timeline events available.</Text>
        )}
      </BlockStack>
    </Box>
  );
}
