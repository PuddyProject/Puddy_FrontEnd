import '../../styles/inputBox.scss';

interface InputBoxProps {
  width?: string;
  margin?: string;
  padding?: string;
  customSize?: string;
  type?: string;
  placeholder?: string;
}
export default function InputBox({
  margin,
  padding,
  customSize,
  type = 'text',
  placeholder = '텍스트를 입력하세요.',
}: InputBoxProps) {
  const inputStyle = {
    margin: margin,
    padding: padding,
    width: customSize,
  };

  return (
    <input className='input-box' style={inputStyle} type={type} placeholder={placeholder}></input>
  );
}
