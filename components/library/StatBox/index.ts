// Index files for each component directory should export the tabs, Component, and title

import { Platform } from '@/types';

export { tabs } from './tabs';
export { Preview, PreviewWebComponents } from './Preview';
export const title = 'Stat Box';
export const contributors = [{ username: 'devwithalex', platform: Platform.TWITTER }];
export const dependencies = ['@shopify/polaris-viz'];
