// Index files for each component should export the tabs, preview, and title

import { Platform } from '@/types';

export { tabs } from './tabs';
export { Preview } from './Preview';
export const title = 'Sortable List';
export const contributors = [{ username: 'devwithalex', platform: Platform.TWITTER }];
export const dependencies = ['@dnd-kit/core', '@dnd-kit/sortable', '@dnd-kit/modifiers'];
