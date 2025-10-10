import { Platform } from '@/types';

// Index files for each component should export the tabs, preview, and title
export { tabs } from './tabs';
export { Preview, PreviewWebComponents } from './Preview/index';
export const title = 'Knob';
export const contributors = [
  { username: 'denniscessan', platform: Platform.TWITTER },
  { username: 'SammyIsseyegh', platform: Platform.TWITTER }
];
