interface TextAreaProps {
  placeholder?: string;
  readonly?: boolean;
  value?: string;
  maxLength?: number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea({
  placeholder,
  readonly,
  onChange,
  value,
  maxLength,
}: TextAreaProps) {
  return (
    <textarea
      maxLength={maxLength}
      onChange={onChange}
      readOnly={readonly}
      className='text-area'
      placeholder={placeholder}
      defaultValue={value}
    />
  );
}
