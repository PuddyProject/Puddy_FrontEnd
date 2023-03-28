import { useState } from 'react';

interface CheckboxProps {
  text?: string;
  isChecked?: boolean;
  checked?: boolean;
  required?: boolean;
  readonly?: boolean;
  requestOnChange?: (isChecked: boolean) => void;
}

export default function Checkbox({
  requestOnChange,
  text,
  required,
  checked,
  readonly,
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const onChange = () => {
    if (requestOnChange) {
      requestOnChange(!isChecked);
    }

    setIsChecked((prev) => !prev);
  };

  return (
    <div className='check-box-container'>
      <input
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
