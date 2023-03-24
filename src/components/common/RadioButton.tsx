interface RadioButtonProps {
  name: string;
  value: string;
  children: React.ReactNode;
  required?: boolean;
  readonly?: boolean;
}

export default function RadioButton({
  name,
  value,
  children,
  required,
  readonly,
}: RadioButtonProps) {
  return (
    <div className='radio-button-container'>
      <label className={`${readonly && 'read-only'}`}>
        <input
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
