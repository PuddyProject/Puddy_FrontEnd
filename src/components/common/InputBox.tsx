import '../../styles/inputBox.scss';

interface InputBoxProps {
  onClick?: () => void;
  children?: React.ReactNode;
  width?: string;
  isOutline?: boolean;
  margin?: string;
  padding?: string;
  customSize?: string;
}
export default function InputBox({ margin, padding, customSize }: InputBoxProps) {
  const inputStyle = {
    margin: margin,
    padding: padding,
    width: customSize,
  };

  return <input className='input-box' style={inputStyle} type='text' placeholder='텍스트'></input>;
}
