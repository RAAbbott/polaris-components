import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { Frame, Navigation, TopBar, useBreakpoints } from '@shopify/polaris';
import {
  AppsMinor,
  ChevronRightMinor,
  HomeMinor,
  ChatMajor,
  CodeMajor
} from '@shopify/polaris-icons';
import '@shopify/polaris/build/esm/styles.css';
import { Analytics } from '@vercel/analytics/react';

export const Layout = ({ children }) => {
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
      <TopBar.UserMenu name='Shopify Partner' initials='SP' />
    </>
  );

  const topBar = (
    <TopBar showNavigationToggle userMenu={userMenu} onNavigationToggle={handleNavigationToggle} />
  );

  const changePage = async (route) => {
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
              icon: HomeMinor,
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
              icon: AppsMinor,
              selected: asPath === '/components/setup-guide',
              onClick: () => changePage('/components/setup-guide')
            },
            {
              label: 'Pricing Card',
              icon: AppsMinor,
              selected: asPath === '/components/pricing-card',
              onClick: () => changePage('/components/pricing-card')
            },
            {
              label: 'Sortable List',
              icon: AppsMinor,
              selected: asPath === '/components/sortable-list',
              onClick: () => changePage('/components/sortable-list')
            },
            {
              label: 'Action Card',
              icon: AppsMinor,
              selected: asPath === '/components/action-card',
              onClick: () => changePage('/components/action-card')
            },
            {
              label: 'Nav Card',
              icon: AppsMinor,
              selected: asPath === '/components/nav-card',
              onClick: () => changePage('/components/nav-card')
            }
          ]}
          action={{
            icon: ChevronRightMinor,
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
              icon: CodeMajor,
              url: 'https://github.com/RAAbbott/polaris-components',
              external: true
            },
            {
              label: 'Contact',
              icon: ChatMajor,
              url: 'https://www.x.com/devwithalex',
              external: true
            }
          ]}
        />
      </div>
    </>
  );
};
