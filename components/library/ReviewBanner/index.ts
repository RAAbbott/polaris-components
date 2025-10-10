import { Platform } from '@/types';

// Index files for each component should export the tabs, preview, and title
export { tabs } from './tabs';
export { Preview, PreviewWebComponents } from './Preview/index';
export const title = 'Review Banner';
export const contributors = [{ username: 'ghussaindars', platform: Platform.TWITTER }];
