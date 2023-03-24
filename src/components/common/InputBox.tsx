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
}

export default function InputBox({
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
      readOnly={readonly}
      min={min}
      max={max}
      ref={inputRef}
      required={required}
      className={`input-box ${placeholderAlignRight ? 'ph-align-right' : ''}`}
      style={inputStyle}
      type={type}
      id={id}
      placeholder={placeholder}
      defaultValue={value}
    ></input>
  );
}
