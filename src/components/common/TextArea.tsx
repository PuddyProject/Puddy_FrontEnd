interface TextAreaProps {
  placeholder?: string;
  readonly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea({ placeholder, readonly, onChange }: TextAreaProps) {
  return (
    <textarea
      onChange={onChange}
      readOnly={readonly}
      className='text-area'
      placeholder={placeholder}
    />
  );
}
