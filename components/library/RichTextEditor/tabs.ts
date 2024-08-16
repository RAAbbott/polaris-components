import { Tab } from '@/types';

const RichTextEditor = `import { Box, Icon, InlineGrid, Text } from "@shopify/polaris";
import { AlertCircleIcon } from "@shopify/polaris-icons";
import { useEffect, useState } from "react";
import type { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ClientOnly } from "remix-utils/client-only";

type ReducedQuillProps = Omit<ReactQuillProps, 'readOnly' | 'className' | 'theme' | 'children' | 'style' | 'tabIndex' | 'scrollingContainer'>

const defaultModuleOptions = {
    toolbar: [
        ["bold", "italic", "underline", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["link"],
        ["clean"],
    ],
    clipboard: {
        matchVisual: false // Needed to avoid this glitch: https://github.com/slab/quill/issues/2905
    }
};

export function RichTextEditor({
    bounds,
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
    error,
    fallbackComponent = <FallbackComponent />
}: ReducedQuillProps & {
    label: string;
    labelHidden?: boolean;
    disabled?: boolean;
    error?: string | boolean | undefined;
    fallbackComponent?: React.ReactNode
}) {

    const [Quill, setQuill] = useState<any>(null);

    const mergedModuleOptions = {
        ...defaultModuleOptions,
        ...modules,
        toolbar: modules?.toolbar || defaultModuleOptions.toolbar,
        clipboard: {
            ...defaultModuleOptions.clipboard,
            ...(modules?.clipboard || {})
        }
    };


    useEffect(() => {
        if (typeof window !== "undefined") {
            import("react-quill")
                .then((QuillModule) => {
                    if (QuillModule && QuillModule.default) {
                        setQuill(() => QuillModule.default);
                    } else {
                        console.error("React Quill module or default export not found");
                    }
                })
                .catch((e: any) => console.error("Failed to load react-quill", e));
        }
    }, []);

    let className = disabled ? "quill--disabled " : "";
    if (error) className += "quill--error";

    return (
        <ClientOnly fallback={fallbackComponent}>
            {() =>
                Quill ? (
                    <Box>
                        {!labelHidden && (
                            <Box paddingBlockEnd="100">
                                <Text as="p" tone={disabled ? "disabled" : "base"}>{label}</Text>
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
                            <InlineGrid alignItems="start" gap="150" columns="20px auto">
                                <Icon source={AlertCircleIcon} tone="textCritical" />
                                <Text as="p" tone="critical">{error}</Text>
                            </InlineGrid>
                        )}
                    </Box>
                ) : (
                    fallbackComponent
                )
            }
        </ClientOnly>
    );
}

function FallbackComponent() {
    return (
        <Box>Loading editor...</Box>
    )
}
`;

const Example = `import { BlockStack, Box, Card, Page, Text, TextField } from '@shopify/polaris';
import { useState } from 'react';
import type { UnprivilegedEditor } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { RichTextEditor } from './RichTextEditor';

export function Example() {
    const [textEditor1, setTextEditor1] = useState("");
    const [textEditor2, setTextEditor2] = useState("");
    const [textEditor3, setTextEditor3] = useState("");
    const [textEditor4, setTextEditor4] = useState("");
    const [textEditor5, setTextEditor5] = useState("");
    const [charCount, setCharCount] = useState(0);

    function handleChangeWithCounter(value: string, editor: UnprivilegedEditor): void {
        setCharCount(editor.getText().length)
        setTextEditor4(value);
    }

    return (
        <Page
            narrowWidth
        >
            <Card>
                <BlockStack gap="600">
                    <BlockStack gap="300">
                        <RichTextEditor
                            label='Default Editor'
                            placeholder="Enter text..."
                            onChange={setTextEditor1}
                            value={textEditor1}
                        />
                    </BlockStack>
                    <BlockStack gap="300">
                        <RichTextEditor
                            label='Disabled / Busy Editor'
                            disabled
                            placeholder="Enter text..."
                            onChange={setTextEditor2}
                            value={textEditor2}
                        />
                    </BlockStack>
                    <BlockStack gap="300">
                        <RichTextEditor
                            label='Error State Editor'
                            placeholder="Enter text..."
                            onChange={setTextEditor3}
                            value={textEditor3}
                            error="You must enter more than 30 characters"
                        />
                    </BlockStack>
                    <Box>
                        <RichTextEditor
                            label='Editor with character count'
                            placeholder="Enter text..."
                            onChange={(value, delta, source, editor) => handleChangeWithCounter(value, editor)}
                            value={textEditor4}
                        />
                        <Text as="p">Character count: {charCount}</Text>
                    </Box>
                    <Box paddingBlockEnd="1000">
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
                    </Box>
                </BlockStack>
            </Card>
        </Page>
    );
}
`;

export const tabs: Tab[] = [
  { title: 'Example Usage', content: Example },
  { title: 'RichTextEditor.tsx', content: RichTextEditor },
];
