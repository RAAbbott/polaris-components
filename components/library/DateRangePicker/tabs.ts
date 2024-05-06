import { Tab } from '@/types';

const DateRangePicker = `import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Popover,
  Button,
  TextField,
  Box,
  DatePicker,
  Icon,
  OptionList,
  Scrollable,
  InlineGrid,
  BlockStack,
  InlineStack
} from '@shopify/polaris';
import { ArrowRightIcon } from '@shopify/polaris-icons';

export const DateRangePicker = ({ onDateRangeSelect }) => {
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const yesterday = new Date(
    new Date(new Date().setDate(today.getDate() - 1)).setHours(0, 0, 0, 0)
  );
  const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));

  const ranges = [
    { title: 'Today', period: { since: today, until: today } },
    { title: 'Yesterday', period: { since: yesterday, until: yesterday } },
    {
      title: 'Last 7 days',
      period: {
        since: new Date(new Date().setDate(today.getDate() - 7)),
        until: yesterday
      }
    },
    {
      title: 'Last 30 days',
      period: {
        since: new Date(new Date().setDate(today.getDate() - 30)),
        until: yesterday
      }
    },
    {
      title: 'Last 90 days',
      period: {
        since: new Date(new Date().setDate(today.getDate() - 90)),
        until: yesterday
      }
    },

    {
      title: 'Last 365 Days',
      period: {
        since: new Date(new Date().setDate(today.getDate() - 365)),
        until: yesterday
      }
    }
  ];

  const [popoverActive, setPopoverActive] = useState(false);
  const [activeDateRange, setActiveDateRange] = useState(ranges[0]);
  const [dateState, setDateState] = useState({
    month: today.getMonth(),
    year: today.getFullYear()
  });

  const handleMonthChange = useCallback((newMonth, newYear) => {
    setDateState({ month: newMonth, year: newYear });
  }, []);

  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    if (activeDateRange) {
      setInputValues({
        since: formatDate(activeDateRange.period.since),
        until: formatDate(activeDateRange.period.until)
      });
    }
  }, [activeDateRange]);

  function formatDate(date) {
    return date.toISOString().split('T')[0];
  }

  function handleInputValueChange(field, value) {
    setInputValues((prevState) => ({ ...prevState, [field]: value }));
    if (isValidDate(value)) {
      const newDate = new Date(value);
      setActiveDateRange((prevState) => ({
        ...prevState,
        period: {
          ...prevState.period,
          [field]: newDate
        }
      }));
    }
  }

  function isValidDate(date) {
    return !isNaN(new Date(date).getDate());
  }

  function handlePopoverClose() {
    setPopoverActive(false);
  }

  return (
    <Box>
      <Popover
        active={popoverActive}
        autofocusTarget='none'
        preferredAlignment='left'
        preferredPosition='below'
        fluidContent
        sectioned={false}
        fullHeight
        activator={
          <Button size='slim' onClick={() => setPopoverActive(!popoverActive)}>
            {activeDateRange.title}
          </Button>
        }
        onClose={handlePopoverClose}
      >
        <Box
          style={{
            paddingTop: '16px',
            paddingLeft: '10px',
            paddingRight: '10px',
            paddingBottom: '16px'
          }}
        >
          <Popover.Pane fixed>
            <InlineGrid
              columns={{ xs: '1fr', mdDown: '1fr', md: 'max-content max-content' }}
              gap={0}
            >
              <Box
                maxWidth='212px'
                width='100%'
                style={{
                  paddingRight: '20px'
                }}
              >
                <Scrollable style={{ height: '334px' }}>
                  <OptionList
                    options={ranges.map((range) => ({
                      value: range.title,
                      label: range.title
                    }))}
                    selected={activeDateRange.title}
                    onChange={(value) => {
                      setActiveDateRange(ranges.find((range) => range.title === value[0]));
                    }}
                  />
                </Scrollable>
              </Box>
              <Box maxWidth='516px'>
                <BlockStack gap='400'>
                  <InlineStack gap='200'>
                    <div style={{ flexGrow: 1 }}>
                      <TextField
                        role='combobox'
                        value={inputValues.since}
                        onChange={(e) => handleInputValueChange('since', e)}
                        onBlur={handlePopoverClose}
                        autoComplete='off'
                      />
                    </div>
                    <Icon source={ArrowRightIcon} tone='subdued' />
                    <div style={{ flexGrow: 1 }}>
                      <TextField
                        role='combobox'
                        value={inputValues.until}
                        onChange={(e) => handleInputValueChange('until', e)}
                        onBlur={handlePopoverClose}
                        autoComplete='off'
                      />
                    </div>
                  </InlineStack>
                  <div>
                    <DatePicker
                      month={dateState.month}
                      year={dateState.year}
                      selected={{
                        start: activeDateRange.period.since,
                        end: activeDateRange.period.until
                      }}
                      onChange={({ start, end }) => {
                        setActiveDateRange({
                          title: 'Custom',
                          period: { since: start, until: end }
                        });
                      }}
                      onMonthChange={handleMonthChange}
                      multiMonth
                      allowRange
                    />
                  </div>
                </BlockStack>
              </Box>
            </InlineGrid>
          </Popover.Pane>
          <Popover.Pane fixed>
            <Popover.Section>
              <InlineStack align='end' gap='200'>
                <Button onClick={() => setPopoverActive(false)}>Cancel</Button>
                <Button
                  variant='primary'
                  onClick={() => {
                    onDateRangeSelect({
                      start: activeDateRange.period.since,
                      end: activeDateRange.period.until
                    });
                    setPopoverActive(false);
                  }}
                >
                  Apply
                </Button>
              </InlineStack>
            </Popover.Section>
          </Popover.Pane>
        </Box>
      </Popover>
    </Box>
  );
};
`;

const Example = `import { Layout, Page } from '@shopify/polaris';
import { DateRangePicker } from './DateRangePicker';

export const Example = () => {
  return (
    <Page narrowWidth>
      <Layout>
        <Layout.Section>
          <DateRangePicker
            onDateRangeSelect={({ start, end }) => {
              console.log('Selected Start Date:', start);
              console.log('Selected End Date:', end);
              // You can now do whatever you need with these dates, like setting state or making API calls
            }}
          />
        </Layout.Section>
      </Layout>
    </Page>
  );
};
`;

export const tabs: Tab[] = [
  { title: 'Example Usage', content: Example },
  { title: 'DateRangePicker.jsx', content: DateRangePicker }
];
