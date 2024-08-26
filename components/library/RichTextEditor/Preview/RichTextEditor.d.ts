import { ReactQuillProps } from 'react-quill';

type ReducedQuillProps = Omit<ReactQuillProps, 'readOnly' | 'className' | 'theme' | 'children' | 'style' | 'tabIndex' | 'scrollingContainer'>;

export interface RichTextEditorProps extends ReducedQuillProps {
    label: string;
    labelHidden?: boolean;
    disabled?: boolean;
    error?: string | boolean;
}

export function RichTextEditor(props: RichTextEditorProps): JSX.Element;
