import { ReactNode } from 'react';

export enum ComponentVariant {
  REACT = 'react',
  WEB_COMPONENTS = 'web-components'
}

export type Tab = {
  title: string; // Tab title
  content: string; // Text content for editor
  lang?: string; // Language used in code editor, defaults to 'jsx'
  variant?: ComponentVariant | 'react' | 'web-components'; // Optional variant (React or Web Components)
};

export type PageComponent = {
  Preview: () => ReactNode; // Component preview rendered in top section (React variant)
  PreviewWebComponents?: () => ReactNode; // Optional web components preview variant
  tabs: Tab[];
  title: string;
  subtitle?: string;
  Banner?: () => ReactNode; // Optional banner exported from components to provide context (e.g. external deps)
  contributors?: Contributor[];
  dependencies?: string[];
};

export enum UserEventType {
  TOUCH = 'touch',
  MOUSE = 'mouse'
}

export enum Platform {
  TWITTER = 'twitter',
  GITHUB = 'github'
}

export type Contributor = {
  username: string;
  platform: Platform;
};
