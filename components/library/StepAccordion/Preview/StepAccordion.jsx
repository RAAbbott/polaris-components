import { useState } from 'react';
import {
  Card,
  Box,
  InlineStack,
  Text,
  Collapsible,
  Badge,
  ButtonGroup,
  Button,
  BlockStack,
  Divider,
  FormLayout,
  TextField,
  Link
} from '@shopify/polaris';
import { ChevronUpIcon, ChevronDownIcon } from '@shopify/polaris-icons';

export const StepAccordion = () => {
  const [expanded, setExpanded] = useState(0); // Set to null if none should be expanded by default
  const [currentStep, setCurrentStep] = useState(0);

  const goToNextStep = () => {
    setCurrentStep(expanded + 1);
    setExpanded(expanded + 1);
  };

  return (
    <Card padding='0'>
      {IMPORT_STEPS.map(({ title, id, Content, action }, idx) => {
        const isExpanded = expanded === id;
        // Use isDisabled if users should sequentially complete steps
        const isDisabled = id > currentStep;
        const isComplete = currentStep > id;
        return (
          <Box
            borderBlockEndWidth='025'
            borderColor='border'
            background='bg-surface-secondary'
            key={id}
            opacity={isDisabled ? '.5' : '1'}
          >
            <Box paddingBlock='300' paddingInline='400'>
              <div
                style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
                onClick={() => {
                  return isDisabled ? null : setExpanded((prev) => (id === prev ? null : id));
                }}
              >
                <InlineStack align='space-between' blockAlign='center'>
                  <InlineStack align='start' blockAlign='center' gap='200'>
                    <Text variant='headingMd' as='p'>
                      Step {idx + 1}: {title}
                    </Text>
                    {isComplete ? (
                      <Badge tone='success' size='small'>
                        Complete
                      </Badge>
                    ) : null}
                  </InlineStack>
                  {isExpanded ? (
                    <ChevronUpIcon width='1.5rem' height='1.5rem' />
                  ) : (
                    <ChevronDownIcon width='1.5rem' height='1.5rem' />
                  )}
                </InlineStack>
              </div>
            </Box>
            <Collapsible open={isExpanded}>
              <Box background='bg-surface'>
                <BlockStack gap='300'>
                  <Box padding='400' paddingBlockEnd='100'>
                    {/* Content from import step */}
                    <Content />
                  </Box>
                  <Divider />
                  <Box padding='400' paddingBlockStart='100'>
                    <ButtonGroup>
                      <Button
                        variant='primary'
                        onClick={() => {
                          // First call action function from import step, then move to next step
                          // Can add async/await handling, processing status, etc. as needed
                          action.onAction();
                          goToNextStep();
                        }}
                      >
                        {action.content}
                      </Button>
                    </ButtonGroup>
                  </Box>
                </BlockStack>
              </Box>
            </Collapsible>
          </Box>
        );
      })}
    </Card>
  );
};

const IMPORT_STEPS = [
  {
    id: 0,
    title: 'Confirm Store Details',
    Content: () => (
      <BlockStack gap='500'>
        <Text variant='headingMd'>Does this info look right to you?</Text>
        <FormLayout>
          <TextField label='Store Name' readOnly value='Shopify Store' />
          <TextField label='Store Email' readOnly value='store@polariscomponents.com' />
        </FormLayout>
      </BlockStack>
    ),
    action: { content: 'Confirm Info', onAction: () => null }
  },
  {
    id: 1,
    title: 'Add Widgets',
    Content: () => (
      <Box maxWidth='400px'>
        <BlockStack gap='300' align='center'>
          <Card padding='300'>
            <InlineStack align='space-between' blockAlign='center'>
              <Text variant='headingMd'>Widget 1</Text>
              <Button variant='primary'>Add to store</Button>
            </InlineStack>
          </Card>
          <Card padding='300'>
            <InlineStack align='space-between' blockAlign='center'>
              <Text variant='headingMd'>Widget 2</Text>
              <Button variant='primary'>Add to store</Button>
            </InlineStack>
          </Card>
          <Card padding='300'>
            <InlineStack align='space-between' blockAlign='center'>
              <Text variant='headingMd'>Widget 3</Text>
              <Button variant='primary'>Add to store</Button>
            </InlineStack>
          </Card>
        </BlockStack>
      </Box>
    ),
    action: { content: 'Next', onAction: () => null }
  },
  {
    id: 2,
    title: 'Terms & Conditions',
    Content: () => (
      <BlockStack gap='300'>
        <Text variant='bodyMd' as='p'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi eveniet dolores nostrum
          neque quia illo deleniti autem sed repellat molestiae cumque exercitationem cum, corporis
          ea ullam qui odit, esse perferendis. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Non mollitia amet inventore perspiciatis laboriosam fugit modi alias, odio ab,
          reiciendis esse tenetur, velit vero exercitationem minus corporis soluta incidunt sequi!
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae hic expedita dicta libero
          ratione vel laborum voluptatem exercitationem numquam aperiam. Est, repellat sit. Beatae
          mollitia fugit ab quibusdam inventore harum!
        </Text>
        <Text tone='subdued' variant='bodyMd' as='p'>
          By clicking below, you agree to our <Link>Terms & Conditions</Link>
        </Text>
      </BlockStack>
    ),
    action: { content: 'Accept Terms & Start Using App', onAction: () => null }
  }
];
