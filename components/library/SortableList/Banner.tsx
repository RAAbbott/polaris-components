import { Banner as PolarisBanner, Link } from '@shopify/polaris';

export const Banner = () => (
  <PolarisBanner
    tone='info'
    title='External Dependencies'
    action={{
      content: 'Copy npm command',
      onAction: () =>
        navigator.clipboard.writeText('npm i @dnd-kit/core @dnd-kit/sortable @dnd-kit/modifiers')
    }}
  >
    This component uses an external library for the drag & drop functionality,{' '}
    <Link url='https://dndkit.com/' target='_blank'>
      dnd-kit
    </Link>
    , and requires the following packages: <br />
    <ul style={{ listStyleType: 'circle', paddingLeft: 20 }}>
      <li>
        <code>@dnd-kit/core</code>
      </li>
      <li>
        <code>@dnd-kit/sortable</code>
      </li>
      <li>
        <code>@dnd-kit/modifiers</code>
      </li>
    </ul>
  </PolarisBanner>
);
