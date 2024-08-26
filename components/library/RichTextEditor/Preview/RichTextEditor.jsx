import { Box, Icon, InlineGrid, Text } from '@shopify/polaris';
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
}

// Maybe down here you can explain some changes needed for Remix/SSR