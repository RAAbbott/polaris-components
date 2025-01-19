import { PropsWithChildren, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { Badge, Frame, Navigation, TopBar, useBreakpoints } from '@shopify/polaris';
import { AppsIcon, ChevronRightIcon, HomeIcon, ChatIcon, CodeIcon } from '@shopify/polaris-icons';
import '@shopify/polaris/build/esm/styles.css';
import { Analytics } from '@vercel/analytics/react';

export const Layout = ({ children }: PropsWithChildren) => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const { asPath, pathname, push } = useRouter();
  const { mdDown } = useBreakpoints();

  const handleNavigationToggle = useCallback(() => {
    setShowMobileNav((prev) => !prev);
  }, []);

  const logo = {
    width: 250,
    topBarSource: '/logo.png',
    accessibilityLabel: 'Polaris Components logo'
  };

  const userMenu = (
    <>
      <div style={{ marginLeft: '10px' }} />
      <TopBar.UserMenu
        name='Shopify Partner'
        initials='SP'
        actions={[]}
        onToggle={() => null}
        open={false}
      />
    </>
  );

  const topBar = (
    <TopBar showNavigationToggle userMenu={userMenu} onNavigationToggle={handleNavigationToggle} />
  );

  const changePage = async (route: string) => {
    await push(route, undefined, { shallow: true });
    if (mdDown) {
      handleNavigationToggle();
    }
  };

  const AppNavigation = (
    <div className='relative'>
      <Navigation location='/'>
        <Navigation.Section
          items={[
            {
              label: 'Home',
              icon: HomeIcon,
              selected: pathname === '/',
              onClick: () => changePage('/')
            }
          ]}
        />
        <Navigation.Section
          title='Components'
          items={[
            {
              label: 'Setup Guide',
              icon: AppsIcon,
              selected: asPath === '/components/setup-guide',
              onClick: () => changePage('/components/setup-guide')
            },
            {
              label: 'Pricing Card',
              icon: AppsIcon,
              selected: asPath === '/components/pricing-card',
              onClick: () => changePage('/components/pricing-card')
            },
            {
              label: 'Sortable List',
              icon: AppsIcon,
              selected: asPath === '/components/sortable-list',
              onClick: () => changePage('/components/sortable-list')
            },
            {
              label: 'Action Card',
              icon: AppsIcon,
              selected: asPath === '/components/action-card',
              onClick: () => changePage('/components/action-card')
            },
            {
              label: 'Nav Card',
              icon: AppsIcon,
              selected: asPath === '/components/nav-card',
              onClick: () => changePage('/components/nav-card')
            },
            {
              label: 'Feedback Card',
              icon: AppsIcon,
              selected: asPath === '/components/feedback-card',
              onClick: () => changePage('/components/feedback-card')
            },
            {
              label: 'Accordion',
              icon: AppsIcon,
              selected: asPath === '/components/accordion',
              onClick: () => changePage('/components/accordion')
            },
            {
              label: 'Date Range Picker',
              icon: AppsIcon,
              selected: asPath === '/components/date-range-picker',
              onClick: () => changePage('/components/date-range-picker')
            },
            {
              label: 'Media Grid',
              icon: AppsIcon,
              selected: asPath === '/components/media-grid',
              onClick: () => changePage('/components/media-grid')
            },
            {
              label: 'Stat Box',
              icon: AppsIcon,
              selected: asPath === '/components/stat-box',
              onClick: () => changePage('/components/stat-box')
            },
            {
              label: 'Rich Text Editor',
              icon: AppsIcon,
              selected: asPath === '/components/rich-text-editor',
              onClick: () => changePage('/components/rich-text-editor')
            },
            {
              label: 'Timeline',
              badge: <Badge tone='success'>New</Badge>,
              icon: AppsIcon,
              selected: asPath === '/components/timeline',
              onClick: () => changePage('/components/timeline')
            },
            {
              label: 'Knob',
              badge: <Badge tone='success'>New</Badge>,
              icon: AppsIcon,
              selected: asPath === '/components/knob',
              onClick: () => changePage('/components/knob')
            },
            {
              label: 'Review Banner',
              icon: AppsIcon,
              badge: <Badge tone='success'>New</Badge>,
              selected: asPath === '/components/review-banner',
              onClick: () => changePage('/components/review-banner')
            }
          ]}
          action={{
            icon: ChevronRightIcon,
            accessibilityLabel: 'Add',
            onClick: () => changePage('/components/setup-guide')
          }}
        />
      </Navigation>
    </div>
  );
  return (
    <>
      <Analytics />
      <Frame
        navigation={AppNavigation}
        topBar={topBar}
        logo={logo}
        showMobileNavigation={showMobileNav}
        onNavigationDismiss={handleNavigationToggle}
      >
        <main className='h-full'>{children}</main>
      </Frame>

      {/* Bottom nav bar items */}
      <div
        className={`bottom-0 pt-[.5rem] fixed z-[1000] w-[15rem] ${
          !mdDown ? 'text-[0.8125rem]' : showMobileNav ? 'text-[0.875rem]' : 'hidden'
        }`}
      >
        <Navigation.Section
          items={[
            {
              label: 'Github',
              icon: CodeIcon,
              url: 'https://github.com/RAAbbott/polaris-components',
              external: true
            },
            {
              label: 'Contact',
              icon: ChatIcon,
              url: 'https://www.x.com/devwithalex',
              external: true
            }
          ]}
        />
      </div>
    </>
  );
};
