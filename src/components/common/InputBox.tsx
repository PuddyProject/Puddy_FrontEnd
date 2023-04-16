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
  readonly?: boolean;
  className?: string;
  minLength?: number;
  maxLength?: number;
  min?: string;
  max?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function InputBox({
  className,
  onChange,
  onKeyPress,
  onFocus,
  inputRef,
  width,
  margin,
  padding,
  placeholderAlignRight,
  value,
  id,
  min,
  max,
  maxLength,
  minLength,
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
      min={min}
      max={max}
      onChange={onChange}
      onKeyDown={onKeyPress}
      onFocus={onFocus}
      readOnly={readonly}
      minLength={minLength}
      maxLength={maxLength}
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
