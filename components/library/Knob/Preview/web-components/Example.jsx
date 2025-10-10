import { useState } from 'react';
import { Knob } from './Knob';

export function Example() {
  const [selected, setSelected] = useState(false);

  return (
    <s-page inlineSize="small">
      <s-section padding="base">
        <s-stack direction="inline" justifyContent="space-between">
          <s-stack direction="inline" justifyContent="start" gap="small" alignItems="center">
            <s-text>
              Toggle Knob
            </s-text>
            <s-badge tone={selected ? 'success' : 'caution'}>
              {selected ? 'Enabled' : 'Disabled'}
            </s-badge>
          </s-stack>
          <Knob
            selected={selected}
            ariaLabel='Example knob'
            onClick={() => setSelected((prev) => !prev)}
          />
        </s-stack>
      </s-section>
    </s-page>
  );
}
