export const ActionCard = () => {
  return (
    <s-section padding="base">
      <s-stack direction="block" gap="large" alignItems="start">
        <s-stack direction="block" gap="base">
          <s-heading>
            Payment Methods
          </s-heading>
          <s-paragraph color="subdued">
            Payments that are made outside your online store. When a customer selects a manual payment method such as
            cash on delivery, you'll need to approve their order before it can be fulfilled.
          </s-paragraph>
        </s-stack>
        <s-button commandFor="payment-methods-menu">
          Add manual payment method
        </s-button>
        <s-menu id="payment-methods-menu" accessibilityLabel="Payment method options">
          <s-button>Create custom payment method</s-button>
          <s-button>Bank Deposit</s-button>
        </s-menu>
      </s-stack>
    </s-section>
  );
};
