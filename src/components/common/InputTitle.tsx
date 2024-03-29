interface InputBoxProps {
  children: string | string[];
  id?: string;
  width?: string;
  margin?: string;
  vaildText?: string;
  isVaildText?: boolean;
  isRequire?: boolean;
}

export default function InputTilte({
  children,
  id,
  width,
  margin,
  vaildText,
  isVaildText = false,
  isRequire = false,
}: InputBoxProps) {
  const titleStyle = { width, margin };
  return (
    <div className='input-title' style={titleStyle}>
      <span>
        <span id={id} className='title-text'>
          {children}
        </span>
        {isRequire && <span className='is-required'>*</span>}
      </span>
      {isVaildText && <span className='vaild-text'>{vaildText}</span>}
    </div>
  );
}
