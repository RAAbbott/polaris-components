import { Platform } from '@/types';

// Index files for each component should export the tabs, preview, and title
export { tabs } from './tabs';
export { Preview, PreviewWebComponents } from './Preview/index';
export const title = 'Timeline';
export const contributors = [{ username: 'fabregas4', platform: Platform.GITHUB }];
