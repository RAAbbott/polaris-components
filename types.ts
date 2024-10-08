import { ReactNode } from 'react';

export type Tab = {
  title: string; // Tab title
  content: string; // Text content for editor
  lang?: string; // Language used in code editor, defaults to 'jsx'
};

export type PageComponent = {
  Preview: () => ReactNode; // Component preview rendered in top section
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
