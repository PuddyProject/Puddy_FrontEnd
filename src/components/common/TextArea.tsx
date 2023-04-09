interface TextAreaProps {
  placeholder?: string;
  readonly?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea({ placeholder, readonly, onChange, value }: TextAreaProps) {
  return (
    <textarea
      onChange={onChange}
      readOnly={readonly}
      className='text-area'
      placeholder={placeholder}
      defaultValue={value}
    />
  );
}
