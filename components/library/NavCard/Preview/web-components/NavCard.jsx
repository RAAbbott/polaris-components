export const NavCard = () => {
  return (
    <s-clickable
      href='https://example.com'
      target='_blank'
    >
      <s-section padding="base">
        <s-stack direction="inline" gap="base" alignItems="center" justifyContent="space-between">
          <s-stack direction="inline" gap="base" alignItems="center">
            <s-icon type="order"></s-icon>
            <s-text type="strong">38 orders to fulfill</s-text>
          </s-stack>
          <s-icon type="chevron-right"></s-icon>
        </s-stack>
      </s-section>
    </s-clickable>
  );
};
