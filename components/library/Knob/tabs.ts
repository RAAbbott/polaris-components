import { Tab } from '@/types';

const Example = `import { useState } from 'react';
import { Page, Layout, Card, InlineStack, Text, Badge } from '@shopify/polaris';
import Knob from './Knob';

export function Example() {
  const [selected, setSelected] = useState(false);

  return (
    <Page narrowWidth>
      <Layout>
        <Layout.Section>
          <Card>
            <InlineStack align='space-between'>
              <InlineStack align='start' gap='200' blockAlign='center'>
                <Text as='p' variant='bodyMd'>
                  Toggle Knob
                </Text>
                <Badge tone={selected ? 'success' : 'attention'}>
                  {selected ? 'Enabled' : 'Disabled'}
                </Badge>
              </InlineStack>
              <Knob
                selected={selected}
                ariaLabel='Example knob'
                onClick={() => setSelected((prev) => !prev)}
              />
            </InlineStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
`;

const Knob = `import styles from './Knob.module.css';

/**
 * @typedef {Object} KnobProps
 * @property {string} ariaLabel - The aria-label for the knob
 * @property {boolean} selected - Whether the knob is selected or not
 * @property {() => void} onClick - The function to call when the knob is clicked
 */

/**
 * Knob component
 * @param {KnobProps} props - The props for the Knob component
 * @returns {JSX.Element} The rendered Knob component
 */
export default function Knob({ ariaLabel, selected, onClick }) {
  return (
    <button
      id=':rgi:'
      className={\`$\{styles.track} $\{selected && styles.track_on}\`}
      aria-label={ariaLabel}
      role='switch'
      type='button'
      aria-checked='false'
      onClick={onClick}
    >
      <div className={\`$\{styles.knob} $\{selected && styles.knob_on}\`}></div>
    </button>
  );
}
`;

const CSS = `.track {
  height: var(--track-height);
  width: 2rem;
  background: var(--p-color-icon-secondary);
  padding: 0.25rem;
  box-shadow: inset 0 0.0625rem 0.25rem rgba(0, 0, 0, 0.05);
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background var(--p-motion-duration-50) var(--p-motion-ease);
}

.track:after {
  content: '';
  position: absolute;
  z-index: 1;
  top: -0.0625rem;
  right: -0.0625rem;
  bottom: -0.0625rem;
  left: -0.0625rem;
  display: block;
  pointer-events: none;
  box-shadow: 0 0 0 -0.0625rem var(--p-color-border-focus);
  transition: box-shadow var(--p-motion-duration-100) var(--p-motion-ease);
  border-radius: calc(var(--p-border-radius-100) + 0.0625rem);
}

.track_on {
  background: var(--p-color-bg-inverse);
}

.knob {
  height: 0.75rem;
  width: 0.75rem;
  border-radius: 0.1875rem;
  background: var(--p-color-bg-surface);
  transition: transform var(--p-motion-duration-50) var(--p-motion-ease);
}

.knob_on {
  transform: translate(100%);
}

.track:hover {
  background: rgba(97, 97, 97, 1);
}

.track_on:hover {
  background: rgba(48, 48, 48, 1);
}
`;

export const tabs: Tab[] = [
  { title: 'Example Usage', content: Example },
  { title: 'Knob.jsx', content: Knob },
  { title: 'Knob.module.css', content: CSS, lang: 'css' }
];
