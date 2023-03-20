interface InputBoxProps {
  width?: string;
  isRequire?: boolean;
}

export default function InputTilte({ width, isRequire = false }: InputBoxProps) {
  const titleStyle = { width: width };
  return (
    <div className='input-title' style={titleStyle}>
      <span>
        <span className='title-text'>텍스트</span>
        {isRequire && <span className='is-required'>*</span>}
      </span>
      <span className='vaild-text'>비밀번호가 일치하지 않습니다.</span>
    </div>
  );
}
