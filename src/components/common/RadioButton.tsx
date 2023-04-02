interface RadioButtonProps {
  name: string;
  value: string;
  children: React.ReactNode;
  required?: boolean;
  readonly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RadioButton({
  name,
  value,
  children,
  required,
  readonly,
  onChange,
}: RadioButtonProps) {
  return (
    <div className='radio-button-container'>
      <label className={`${readonly && 'read-only'}`}>
        <input
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
