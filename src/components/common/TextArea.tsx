interface TextAreaProps {
  placeholder?: string;
  readonly?: boolean;
}

export default function TextArea({ placeholder, readonly }: TextAreaProps) {
  return <textarea readOnly={readonly} className='text-area' placeholder={placeholder} />;
}
