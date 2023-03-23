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
  onChange?: (e: any) => void;
}

export default function InputBox({
  inputRef,
  width,
  margin,
  padding,
  placeholderAlignRight,
  value,
  onChange,
  id,
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
      min={0}
      ref={inputRef}
      required={required}
      className={`input-box ${placeholderAlignRight ? 'ph-align-right' : ''}`}
      style={inputStyle}
      type={type}
      id={id}
      placeholder={placeholder}
      defaultValue={value}
      onChange={onChange}
    ></input>
  );
}
