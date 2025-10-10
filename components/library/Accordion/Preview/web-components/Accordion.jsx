import { useState } from 'react';

export const Accordion = () => {
  const [expanded, setExpanded] = useState(0);

  return (
    <s-section padding="none">
      {ACCORDION_ITEMS.map(({ title, id, content }) => {
        const isExpanded = expanded === id;
        return (
          <s-box
            key={id}
            borderWidth="small"
            borderColor="border"
          >
            <s-clickable
              onClick={() => {
                setExpanded((prev) => (id === prev ? null : id));
              }}
            >
              <s-box padding="base" background="subdued">
                <s-stack direction="inline" justifyContent="space-between" alignItems="center">
                  <s-heading>
                    {title}
                  </s-heading>
                  <s-icon type={isExpanded ? "chevron-up" : "chevron-down"} />
                </s-stack>
              </s-box>
            </s-clickable>
            <div
              style={{
                display: 'grid',
                gridTemplateRows: isExpanded ? '1fr' : '0fr',
                transition: 'grid-template-rows 0.1s ease-out'
              }}
            >
              <div style={{ overflow: 'hidden' }}>
                <s-box padding="base" background="bg-surface">
                  {content}
                </s-box>
              </div>
            </div>
          </s-box>
        );
      })}
    </s-section>
  );
};

const ACCORDION_ITEMS = [
  {
    id: 0,
    title: 'Step 1',
    content: (
      <s-text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi tempore, saepe minima
        nesciunt impedit quaerat repellat eveniet, dignissimos quis quo sed maxime aspernatur qui,
        quod consectetur optio veritatis iusto eligendi?
      </s-text>
    )
  },
  {
    id: 1,
    title: 'Step 2',
    content: (
      <s-text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi tempore, saepe minima
        nesciunt impedit quaerat repellat eveniet, dignissimos quis quo sed maxime aspernatur qui,
        quod consectetur optio veritatis iusto eligendi?
      </s-text>
    )
  },
  {
    id: 2,
    title: 'Step 3',
    content: (
      <s-text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi tempore, saepe minima
        nesciunt impedit quaerat repellat eveniet, dignissimos quis quo sed maxime aspernatur qui,
        quod consectetur optio veritatis iusto eligendi?
      </s-text>
    )
  },
  {
    id: 3,
    title: 'Step 4',
    content: (
      <s-text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi tempore, saepe minima
        nesciunt impedit quaerat repellat eveniet, dignissimos quis quo sed maxime aspernatur qui,
        quod consectetur optio veritatis iusto eligendi?
      </s-text>
    )
  }
];
