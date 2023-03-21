interface InputBoxProps {
  inputRef?: React.RefObject<HTMLInputElement>;
  width?: string;
  margin?: string;
  padding?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

export default function InputBox({
  inputRef,
  width,
  margin,
  padding,
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
      ref={inputRef}
      required={required}
      className='input-box'
      style={inputStyle}
      type={type}
      placeholder={placeholder}
    ></input>
  );
}
