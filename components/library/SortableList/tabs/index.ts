import { Example } from './Example';
import { SortableList } from './SortableList';
import { SortableListCss } from './SortableList.module.css';
import { Tab } from '@/types';

export const tabs: Tab[] = [
  { title: 'Example Usage', content: Example },
  { title: 'SortableList.jsx', content: SortableList },
  { title: 'SortableList.module.css', content: SortableListCss, lang: 'css' }
];
