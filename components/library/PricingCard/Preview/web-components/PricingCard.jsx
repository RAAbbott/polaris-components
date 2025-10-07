export const PricingCard = ({
  title,
  description,
  price,
  features,
  featuredText,
  button,
  frequency
}) => {
  return (
    <div
      style={{
        width: '18rem',
        boxShadow: featuredText ? '0px 0px 15px 4px #CDFEE1' : 'none',
        borderRadius: '.75rem',
        position: 'relative',
        zIndex: '0'
      }}
    >
      {featuredText ? (
        <div style={{ position: 'absolute', top: '-15px', right: '6px', zIndex: '100' }}>
          <s-badge tone="success">
            {featuredText}
          </s-badge>
        </div>
      ) : null}
      <s-section padding="base">
        <s-stack direction="block" gap="large">
          <s-stack direction="block" gap="base" alignItems="start">
            <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>
              {title}
            </h1>
            {description ? (
              <s-paragraph color="subdued">
                {description}
              </s-paragraph>
            ) : null}
          </s-stack>

          <s-stack direction="inline" gap="small-400" alignItems="baseline">
            <h2 style={{ fontSize: "28px", fontWeight: "bold" }}>
              {price}
            </h2>
            <s-text>
              / {frequency}
            </s-text>
          </s-stack>

          <s-stack direction="block" gap="small-400">
            {features?.map((feature, id) => (
              <s-text color="subdued" key={id}>
                {feature}
              </s-text>
            ))}
          </s-stack>

          <s-stack alignItems="end">
            <s-button {...button.props}>{button.content}</s-button>
          </s-stack>
        </s-stack>
      </s-section>
    </div>
  );
};