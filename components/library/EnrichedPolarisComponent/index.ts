// Index files for each component should export the tabs, preview, and title

import { Platform } from '@/types';

export { tabs } from './tabs';
export { Preview } from './Preview';
export const title = 'Enriched Polaris Component';
export const contributors = [{ username: '_edlaver', platform: Platform.TWITTER }];
export const dependencies = [
  '@dnd-kit/core',
  '@dnd-kit/sortable',
  '@dnd-kit/modifiers',
  'enrich-polaris-component'
];
