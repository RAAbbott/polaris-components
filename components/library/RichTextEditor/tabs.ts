import { Tab } from '@/types';

const RichTextEditor = `import { Box, Icon, InlineGrid, Text } from '@shopify/polaris';
import { AlertCircleIcon } from '@shopify/polaris-icons';
import Quill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const defaultModuleOptions = {
  toolbar: [
    ['bold', 'italic', 'underline', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link'],
    ['clean']
  ],
  clipboard: {
    matchVisual: false // Needed to avoid this glitch: https://github.com/slab/quill/issues/2905
  }
};

export function RichTextEditor({
  bounds = '.quill',
  defaultValue,
  formats,
  id,
  modules,
  onBlur,
  onChange,
  onChangeSelection,
  onFocus,
  onKeyDown,
  onKeyPress,
  onKeyUp,
  placeholder,
  preserveWhitespace,
  value,
  label,
  labelHidden = false,
  disabled,
  error
}) {
  const mergedModuleOptions = {
    ...defaultModuleOptions,
    ...modules,
    toolbar: modules?.toolbar || defaultModuleOptions.toolbar,
    clipboard: {
      ...defaultModuleOptions.clipboard,
      ...(modules?.clipboard || {})
    }
  };

  let className = disabled ? 'quill--disabled ' : '';
  if (error) className += 'quill--error';

  return (
    <Box>
      {!labelHidden && (
        <Box paddingBlockEnd='100'>
          <Text as='p' tone={disabled ? 'disabled' : 'base'}>
            {label}
          </Text>
        </Box>
      )}
      <Quill
        bounds={bounds}
        className={className}
        defaultValue={defaultValue}
        formats={formats}
        id={id}
        modules={mergedModuleOptions}
        onBlur={onBlur}
        onChange={onChange}
        onChangeSelection={onChangeSelection}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onKeyPress={onKeyPress}
        onKeyUp={onKeyUp}
        placeholder={placeholder}
        preserveWhitespace={preserveWhitespace}
        readOnly={disabled}
        theme="snow"
        value={value}
      />
      {error && (
        <InlineGrid alignItems='start' gap='150' columns='20px auto'>
          <Icon source={AlertCircleIcon} tone='textCritical' />
          <Text as='p' tone='critical'>
            {error}
          </Text>
        </InlineGrid>
      )}
    </Box>
  );
}`;

const Example = `import { BlockStack, Box, Card, Page, Text, TextField } from '@shopify/polaris';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { RichTextEditor } from './RichTextEditor';

export function Example() {
    const [textEditor1, setTextEditor1] = useState("");
    const [textEditor2, setTextEditor2] = useState("");
    const [textEditor3, setTextEditor3] = useState("");
    const [textEditor4, setTextEditor4] = useState("");
    const [textEditor5, setTextEditor5] = useState("");
    const [charCount, setCharCount] = useState(0);

    function handleChangeWithCounter(value, editor) {
        setCharCount(editor.getText().length)
        setTextEditor4(value);
    }

    return (
        <Page
            narrowWidth
        >
            <Card>
                <BlockStack gap="600">

                    <RichTextEditor
                        label='Default Editor'
                        placeholder="Enter text..."
                        onChange={setTextEditor1}
                        value={textEditor1}
                    />
                    <RichTextEditor
                        label='Disabled / Busy Editor'
                        disabled
                        placeholder="Enter text..."
                        onChange={setTextEditor2}
                        value={textEditor2}
                    />
                    <RichTextEditor
                        label='Error State Editor'
                        placeholder="Enter text..."
                        onChange={setTextEditor3}
                        value={textEditor3}
                        error="You must enter more than 30 characters"
                    />
                    <Box>
                        <RichTextEditor
                            label='Editor with character count'
                            placeholder="Enter text..."
                            onChange={(value, delta, source, editor) => handleChangeWithCounter(value, editor)}
                            value={textEditor4}
                        />
                        <Text as="p">Character count: {charCount}</Text>
                    </Box>
                    <RichTextEditor
                        label='Editor with controls modified'
                        placeholder="Enter text..."
                        onChange={setTextEditor5}
                        value={textEditor5}
                        modules={
                            {
                                // See 'Modules' in Quill Documentation
                                toolbar: [
                                    [{ 'header': [1, 2, 3, 4, false] }],
                                    ["bold", "italic", "underline", "blockquote"],
                                    [
                                        { list: "ordered" },
                                        { list: "bullet" },
                                        { indent: "-1" },
                                        { indent: "+1" },
                                    ],
                                    [{ 'color': [] }, { 'background': [] }],
                                    ["link"],
                                    ["clean"],
                                ],
                            }
                        }
                    />
                    {/* Example ClientOnly fallback for Remix or other SSR environments */}
                    <BlockStack gap="100">
                      <Text as="p">Remix ClientOnly Fallback - loading...</Text>
                      <div className="quill">
                          <Box padding="300" paddingBlockStart="400" paddingBlockEnd="1600"><SkeletonBodyText lines={6} /></Box>
                      </div>
                    </BlockStack>
                </BlockStack>
            </Card>
        </Page>
    );
}`;

const RichTextEditorTypes = `/* Optional type declaration file to help with Quill property types */
import { ReactQuillProps } from 'react-quill';

type ReducedQuillProps = Omit<ReactQuillProps, 'readOnly' | 'className' | 'theme' | 'children' | 'style' | 'tabIndex' | 'scrollingContainer'>;

export interface RichTextEditorProps extends ReducedQuillProps {
    label: string;
    labelHidden?: boolean;
    disabled?: boolean;
    error?: string | boolean;
}

export function RichTextEditor(props: RichTextEditorProps): JSX.Element;
`

const CSSFile = `/* In Remix - simply import this file from within RichTextEditor.jsx */
/* In Next.js - import this file from within /pages/_app.tsx */

/* In Remix - you may want to put this 1 style into a global CSS file or in a separate CSS file
imported to the file referencing the RTE component, so it can also be applied to the ClientOnly fallback.
See the Remix usage example to see how this might be used */
.quill {
	background-color: var(--p-color-input-bg-surface);
	border: var(--p-border-width-0165) solid var(--p-color-input-border);
	border-top-color: #898f94;
	border-radius: var(--p-border-radius-200);
	margin-bottom: 3px;
}

.quill--disabled {
	color: var(--p-color-text-disabled);
	background-color: #F2F2F2;
	border: 1px solid #F2F2F2;
}

.quill .ql-toolbar.ql-snow {
	border: none;
	border-bottom: 1px solid #ccc;
}

.quill .ql-container.ql-snow {
	border: none;
	font-family: var(--p-font-family-sans);
}

.quill .ql-container.ql-snow .ql-editor {
	min-height: 150px;
	max-height: 400px;
}

.quill--disabled .ql-toolbar .ql-stroke {
	fill: none !important;
	stroke: #aaa !important;
}

.quill--disabled .ql-toolbar .ql-fill {
	fill: #aaa !important;
	stroke: none !important;
}

.quill--disabled .ql-toolbar .ql-picker {
	color: #aaa !important;
}

.quill--error {
	border: var(--p-border-width-0165) solid var(--p-color-border-critical-secondary);
	background-color: var(--p-color-bg-surface-critical);
}

.quill .ql-editor.ql-blank::before {
	font-style: normal;
}

.quill--disabled .ql-editor.ql-blank::before {
	color: var(--p-color-text-disabled)
}
`;

const ExampleRemix = `/*
In Remix you need to make changes to ensure that both importing and rendering of Quill isn't done on the server-side
Render is prevented by remix-utils/client-only
Import is prevented by naming the RichTextEditor component RichTextEditor.client.tsx
Example below includes a fallback, where a skeleton is displayed if the RichTextEditor is still loading on the client
*/

import { BlockStack, Box, Card, Page, Text, TextField, SkeletonBodyText } from '@shopify/polaris';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { RichTextEditor } from './RichTextEditor';
import { ClientOnly } from 'remix-utils/client-only';

export function ExampleRemix() {
  const [textEditor1, setTextEditor1] = useState("");

  return (
    <Page
        narrowWidth
    >
      <Card>
        <BlockStack gap="600">
          <ClientOnly fallback={
            <BlockStack gap="100">
              <Text as="p">Notification template - loading...</Text>
              <div className="quill">
                <Box padding="300" paddingBlockStart="400" paddingBlockEnd="1000"><SkeletonBodyText lines={6} /></Box>
              </div>
            </BlockStack>
          }>
            {() => (
              <RichTextEditor
                label='Default Editor'
                placeholder="Enter text..."
                onChange={setTextEditor1}
                value={textEditor1}
              />
            )}
          </ClientOnly>
        </BlockStack>
      </Card>
    </Page>
  );
}
`;

export const tabs: Tab[] = [
  { title: 'Example Usage', content: Example },
  { title: 'RichTextEditor.jsx', content: RichTextEditor },
  { title: 'RichTextEditor.d.ts', content: RichTextEditorTypes },
  { title: 'rich-text-editor.css', content: CSSFile, lang: "css" },
  { title: 'Example Usage (Remix)', content: ExampleRemix },
];
