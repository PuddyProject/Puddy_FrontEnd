import { useState, useEffect } from 'react';

interface CheckboxProps {
  text?: string;
  isChecked?: boolean;
  checked?: boolean;
  required?: boolean;
  readonly?: boolean;
  onClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  requestOnChange?: (isChecked: boolean) => void;
}

export default function Checkbox({
  onClick,
  requestOnChange,
  text,
  required,
  checked,
  readonly,
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(() => checked);
  }, [checked]);

  const onChange = () => {
    if (readonly) return;

    if (requestOnChange) {
      requestOnChange(!isChecked);
    }

    setIsChecked((prev) => !prev);
  };

  return (
    <div className='check-box-container'>
      <input
        onClick={onClick}
        onChange={onChange}
        checked={isChecked}
        readOnly={readonly}
        required={required}
        type='checkbox'
        id='check-input'
      />
      <label htmlFor='check-input'>{text}</label>
    </div>
  );
}
