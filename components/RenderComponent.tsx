import { useState, useEffect, useRef, useCallback, MouseEvent, TouchEvent } from 'react';
import { Page, Layout, Toast, Button } from '@shopify/polaris';
import {
  ChevronDownMinor,
  ChevronUpMinor,
  DragHandleMinor,
  DuplicateMinor
} from '@shopify/polaris-icons';
import { LiveEditor, LiveProvider } from 'react-live';
import { PageComponent, UserEventType } from '@/types';

export const RenderComponent = ({ title, Example, tabs, Banner, contributor }: PageComponent) => {
  const [tab, setTab] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const [height, setHeight] = useState(250);
  const [prevHeight, setPrevHeight] = useState(250);
  const [isMinimized, setIsMinimized] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // State + markup for toast component
  const [active, setActive] = useState<boolean>(false);
  const toggleActive = useCallback(() => setActive((active) => !active), []);
  const toastMarkup = active ? (
    <Toast content='Copied to clipboard' onDismiss={toggleActive} />
  ) : null;

  const updateMargin = () => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (ref.current) {
      ref.current.style.marginRight = `-${scrollbarWidth}px`;
    }
  };

  useEffect(() => {
    setTab(0);
    updateMargin();
  }, [title]);

  useEffect(() => {
    const updateMaxHeight = () => {
      updateMargin();
      setMaxHeight(window.innerHeight * 0.8);
    };

    // Add resize event listener to update max height when window is resized
    window.addEventListener('resize', updateMaxHeight);
    updateMaxHeight();

    // Clean up the event listener
    return () => {
      window.removeEventListener('resize', updateMaxHeight);
    };
  }, []);

  const toggleMinimize = () => {
    if (isMinimized) {
      setHeight(Math.max(prevHeight, 150)); // restore to previous height or 150px, whichever is greater
    } else {
      setPrevHeight(height); // store current height
      setHeight(0); // set height to 0 for minimized toolbar
    }
    setIsMinimized(!isMinimized);
  };

  const handleEventListeners = (type: UserEventType, startY: number) => {
    const isTouch = type === UserEventType.TOUCH;
    const startType = isTouch ? 'touchmove' : 'mousemove'; // event type for resizeStartListener
    const endType = isTouch ? 'touchend' : 'mouseup'; // event type for resizeEndListener

    const handleResize = (newHeight: number) => {
      if (newHeight <= maxHeight && newHeight >= 0) {
        setHeight(newHeight);
        // Update minimized state based on the new height
        if (newHeight > 0) {
          setIsMinimized(false);
        } else if (newHeight <= 0) {
          setIsMinimized(true);
          setHeight(0); // Set to minimum visible height (50px)
        }
      }
    };

    const resizeStartListener = (e: TouchEvent | MouseEvent) => {
      let newHeight: number;
      if (isTouch) {
        newHeight = height + (startY - (e as TouchEvent).touches[0].clientY);
      } else {
        newHeight = height + (startY - (e as MouseEvent).clientY);
      }

      handleResize(newHeight);
    };

    const resizeEndListener = () => {
      // @ts-ignore
      window.removeEventListener(startType, resizeStartListener);
      window.removeEventListener(endType, resizeEndListener);
    };

    // @ts-ignore
    window.addEventListener(startType, resizeStartListener);
    window.addEventListener(endType, resizeEndListener);
  };

  const resizingTouch = (mouseDownEvent: TouchEvent) => {
    const startY = mouseDownEvent.touches[0].clientY;
    handleEventListeners(UserEventType.TOUCH, startY);
  };

  const resizingMouse = (mouseDownEvent: MouseEvent) => {
    const startY = mouseDownEvent.clientY;
    handleEventListeners(UserEventType.MOUSE, startY);
  };

  return (
    <Page
      title={title}
      fullWidth
      // Considering adding a metadata text that shows the contributor
      // username and links to their GitHub. Code below if I decide to add it.
      // titleMetadata={
      //   contributor ? (
      //     <Box paddingBlockStart='100'>
      //       <Text as='p' variant='bodySm' tone='subdued'>
      //         Contributed by{' '}
      //         <Link url={`https://www.github.com/${contributor}`} target='_blank'>
      //           {contributor}
      //         </Link>
      //       </Text>
      //     </Box>
      //   ) : null
      // }
    >
      <Layout>
        <Layout.Section>
          {Banner ? <Banner /> : null}
          <Example />
        </Layout.Section>
      </Layout>
      <div className='pb-96'></div>

      {/* Read-only code editor */}
      <div
        className={`w-screen fixed right-0 bottom-0 pl-[240px] max-h-[80%] max-[768px]:pl-0`}
        ref={ref}
      >
        <div className='relative'>
          {/* Background for toolbar */}
          <div className='absolute -top-[36px] bg-gray-200 h-24 w-full'></div>

          {/* Minimize/maximize button */}
          <div className='absolute -top-[36px] flex justify-start bg-white items-center'>
            <div className={`py-2 px-3 cursor-pointer`} onClick={toggleMinimize}>
              {isMinimized ? (
                <ChevronUpMinor fill='black' height='20px' width='20px' />
              ) : (
                <ChevronDownMinor fill='black' height='20px' width='20px' />
              )}
            </div>
          </div>

          {/* Resize drag handler */}
          <div className='absolute -top-[36px] flex justify-start bg-white items-center left-12 z-[1000000000]'>
            <div
              className={`py-2 px-3 cursor-ns-resize select-none z-[100000000] touch-none`}
              onMouseDown={resizingMouse}
              onTouchStart={resizingTouch}
            >
              <DragHandleMinor fill='black' height='20px' width='20px' />
            </div>
          </div>

          {/* Tabs for component files */}
          <div className='absolute -top-[36px] left-24'>
            <div className='min-w-fit border-1 border-solid flex justify-start bg-gray-200 overflow-x-auto overflow-y-hidden'>
              {tabs.map(({ title }: { title: string }, i: number) => (
                <div
                  key={i}
                  className={`py-2 px-3 cursor-pointer min-w-fit ${
                    i === tab ? 'bg-white border-b-2 border-solid border-black' : ''
                  }`}
                  onClick={() => setTab(i)}
                >
                  {title}
                </div>
              ))}
            </div>
          </div>

          {/* Code editor wrapper */}
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              position: 'relative',
              zIndex: 10000
            }}
          >
            {/* Copy icon in top right */}
            <div className='absolute top-4 right-6 cursor-pointer hover:opacity-90 bg-[rgb(1,22,39)]'>
              <Button
                icon={DuplicateMinor}
                size='large'
                onClick={() => {
                  navigator.clipboard.writeText(tabs[tab].content);
                  toggleActive();
                }}
              />
            </div>

            {/* Code editor */}
            <LiveProvider
              code={tabs[tab]?.content}
              disabled={true}
              language={tabs[tab]?.lang || 'jsx'}
            >
              <LiveEditor
                style={{
                  minHeight: 0,
                  maxHeight,
                  height,
                  overflow: 'scroll',
                  background: '#011627'
                }}
              />
            </LiveProvider>
          </div>
        </div>
      </div>
      {toastMarkup}
    </Page>
  );
};
