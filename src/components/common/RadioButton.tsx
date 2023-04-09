import { useState, useEffect } from 'react';

interface RadioButtonProps {
  name: string;
  value: string;
  children: React.ReactNode;
  required?: boolean;
  readonly?: boolean;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RadioButton({
  name,
  value,
  children,
  required,
  readonly,
  onChange,
  checked,
}: RadioButtonProps) {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    if (readonly) return;

    setIsChecked(() => checked);
  }, [checked]);

  return (
    <div className='radio-button-container'>
      <label className={`${readonly && 'read-only'}`}>
        <input
          checked={isChecked}
          onChange={onChange}
          readOnly={readonly}
          required={required}
          className='radio-button'
          name={name}
          type='radio'
          value={value}
        />
        <span className='label-text'>{children}</span>
      </label>
    </div>
  );
}
