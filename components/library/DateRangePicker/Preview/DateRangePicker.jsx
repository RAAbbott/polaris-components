import React, { useState, useCallback, useEffect } from 'react';
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
  InlineStack,
  useBreakpoints
} from '@shopify/polaris';
import { ArrowRightIcon, CalendarIcon } from '@shopify/polaris-icons';

export const DateRangePicker = ({ onDateRangeSelect, value: { start, end } }) => {
  const { mdDown } = useBreakpoints();
  const [popoverActive, setPopoverActive] = useState(false);
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const yesterday = new Date(
    new Date(new Date().setDate(today.getDate() - 1)).setHours(0, 0, 0, 0)
  );
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
    },
    {
      title: 'Custom',
      period: { since: yesterday, until: yesterday }
    }
  ];

  const getDefaultDateRange = () => {
    const areDatesEqual = (dateX, dateY) => dateX.toDateString() == dateY.toDateString();

    if (start && end) {
      const currentRange = ranges.find((range) => {
        const { since, until } = range.period;

        if (areDatesEqual(since, start) && areDatesEqual(until, end)) {
          return true;
        }
      });

      if (currentRange) {
        return currentRange;
      } else {
        return { title: 'Custom', period: { since: start, until: end } };
      }
    }

    return ranges[0];
  };

  const defaultRange = getDefaultDateRange();
  const [activeDateRange, setActiveDateRange] = useState(defaultRange);
  const [dateState, setDateState] = useState({
    month: activeDateRange.period.since.getMonth(),
    year: activeDateRange.period.since.getFullYear()
  });

  const handleMonthChange = useCallback((month, year) => {
    setDateState({ month, year });
  }, []);

  const formatDate = (date) => date.toISOString().split('T')[0];

  useEffect(() => {
    setDateState({
      month: activeDateRange.period.since.getMonth(),
      year: activeDateRange.period.since.getFullYear()
    });
  }, [activeDateRange]);

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
          <Button icon={CalendarIcon} size='slim' onClick={() => setPopoverActive(!popoverActive)}>
            {activeDateRange.title}
          </Button>
        }
        onClose={() => setPopoverActive(false)}
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
                <Scrollable style={{ height: 'auto' }}>
                  <OptionList
                    options={ranges.map((range) => ({
                      value: range.title,
                      label: (
                        <div
                          style={{
                            minWidth: '120px' // Adjust this value based on your longest label
                          }}
                        >
                          {range.title}
                        </div>
                      )
                    }))}
                    selected={activeDateRange.title}
                    onChange={(selected) => {
                      const selectedRange = ranges.find((range) => range.title === selected[0]);
                      setActiveDateRange(selectedRange);
                    }}
                  />
                </Scrollable>
              </Box>
              <Box maxWidth='516px'>
                <BlockStack gap='400'>
                  <InlineStack gap='200'>
                    <div style={{ flexGrow: 1 }}>
                      <TextField
                        label='Since'
                        role='combobox'
                        value={formatDate(activeDateRange.period.since)}
                        autoComplete='off'
                        readOnly
                      />
                    </div>
                    {!mdDown ? (
                      <Box
                        style={{
                          marginTop: '5%'
                        }}
                      >
                        <Icon source={ArrowRightIcon} tone='subdued' />
                      </Box>
                    ) : null}

                    <div style={{ flexGrow: 1 }}>
                      <TextField
                        label='Until'
                        role='combobox'
                        value={formatDate(activeDateRange.period.until)}
                        autoComplete='off'
                        readOnly
                      />
                    </div>
                  </InlineStack>
                  <div style={{ height: '256px' }}>
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
                      multiMonth={mdDown ? false : true}
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
                <Button
                  onClick={() => {
                    setActiveDateRange(defaultRange);
                    setPopoverActive(false);
                  }}
                >
                  Cancel
                </Button>
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
