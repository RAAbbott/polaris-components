import { ReactNode } from 'react';

export type Tab = {
  title: string;
  content: string;
  lang?: string;
};

export type PageComponent = {
  Example: () => ReactNode;
  tabs: Tab[];
  title: string;
  Banner?: () => ReactNode;
  contributor?: string;
};

export enum UserEventType {
  TOUCH = 'touch',
  MOUSE = 'mouse'
}
