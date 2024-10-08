import { Platform } from '@/types';

// Index files for each component should export the tabs, preview, and title
export { tabs } from './tabs';
export { Preview } from './Preview/index';
export const title = 'Rich Text Editor';
export const contributors = [{ username: 'fabregas4', platform: Platform.GITHUB }];
export const dependencies = ['react-quill'];
