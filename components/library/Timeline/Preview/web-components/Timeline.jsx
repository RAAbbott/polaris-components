import { Fragment } from 'react';
import styles from './timeline.module.css';

export default function Timeline({ items }) {
  function getBulletIconFromTone(tone) {
    switch (tone) {
      case 'critical':
      case 'caution':
        return { type: 'alert-circle', tone: tone };
      case 'success':
        return { type: 'check-circle', tone: 'success' };
      case 'base':
      case undefined:
        return null;
      default:
        return { type: 'circle-chevron-right', tone: tone };
    }
  }

  let lastDate = null;

  return (
    <s-box paddingInline="base">
      <s-stack direction="block" gap="base">
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
                  <s-grid gridTemplateColumns="30px auto 90px" columnGap="small">
                    <div>&nbsp;</div>
                    <s-stack direction="block" gap="none">
                      <s-box paddingBlockStart="base">
                        <s-text alignment="start" color="subdued">
                          {currentDate}
                        </s-text>
                      </s-box>
                    </s-stack>
                    <div>&nbsp;</div>
                  </s-grid>
                )}

                <s-grid gridTemplateColumns="30px auto 90px" columnGap="small">
                  <div className={styles['timeline-icon']}>
                    {item.tone === 'base' || !bulletIcon ? (
                      <div className={styles['timeline-icon-base']}>
                        <div className={styles['timeline-icon-base-inner']} />
                      </div>
                    ) : (
                      <span className={styles['timeline-icon-polaris-icon']}>
                        <s-icon type={bulletIcon.type} tone={bulletIcon.tone} />
                      </span>
                    )}
                  </div>
                  <div className={styles['timeline-event-description']}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      {item.icon}
                      {item.url ? (
                        <s-link url={item.url} monochrome removeUnderline>
                          <s-stack direction="inline" gap="none" wrap={false} alignItems="start">
                            <span className={styles['timeline-event-link-main']}>
                              {item.timelineEvent}
                            </span>
                            <s-icon type="chevron-right" />
                          </s-stack>
                        </s-link>
                      ) : (
                        <s-text>{item.timelineEvent}</s-text>
                      )}
                    </div>
                  </div>
                  <s-text alignment="end" color="subdued">
                    {item.timestamp.toLocaleTimeString([], {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </s-text>
                </s-grid>
              </Fragment>
            );
          })
        ) : (
          <s-text>No timeline events available.</s-text>
        )}
      </s-stack>
    </s-box>
  );
}
