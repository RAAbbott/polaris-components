export const FeedbackCard = () => {
  return (
    <s-section>
      <s-stack direction="block" gap="small-400" alignItems="start">
        <s-stack direction="inline" justifyContent="space-between" alignItems="center" inlineSize="100%">
          <s-heading>
            Share your feedback
          </s-heading>
          <s-button icon="x" variant="tertiary" />
        </s-stack>
        <s-paragraph color="subdued">
          How would you describe your experience using the Polaris Components app?
        </s-paragraph>
        <s-box paddingBlockStart="small">
          <s-button-group>
            <s-button icon="thumbs-up" slot="secondary-actions">
              Good
            </s-button>
            <s-button icon="thumbs-down" slot="secondary-actions">
              Bad
            </s-button>
          </s-button-group>
        </s-box>
      </s-stack>
    </s-section>
  );
};
