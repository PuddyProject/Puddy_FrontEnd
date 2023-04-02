interface InputBoxProps {
  inputRef?: React.RefObject<HTMLInputElement>;
  width?: string;
  margin?: string;
  padding?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  placeholderAlignRight?: boolean;
  value?: string;
  id?: string;
  min?: string;
  max?: string;
  readonly?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputBox({
  className,
  onChange,
  inputRef,
  width,
  margin,
  padding,
  placeholderAlignRight,
  value,
  id,
  max,
  min,
  readonly,
  required = false,
  type = 'text',
  placeholder = '텍스트를 입력하세요.',
}: InputBoxProps) {
  const inputStyle = {
    margin,
    padding,
    width,
    required,
  };

  return (
    <input
      onChange={onChange}
      readOnly={readonly}
      min={min}
      max={max}
      ref={inputRef}
      required={required}
      className={`input-box ${placeholderAlignRight ? 'ph-align-right' : ''} ${className}`}
      style={inputStyle}
      type={type}
      id={id}
      placeholder={placeholder}
      defaultValue={value}
    ></input>
  );
}
