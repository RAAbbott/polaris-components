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
  Banner?: () => ReactNode; // Optional banner exported from components to provide context (e.g. external deps)
  contributor?: string;
};

export enum UserEventType {
  TOUCH = 'touch',
  MOUSE = 'mouse'
}
