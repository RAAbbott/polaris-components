import { BlockStack, Box, Card, Page, Text, TextField } from '@shopify/polaris';
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