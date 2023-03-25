interface CheckboxProps {
  text?: string;
  checked?: boolean;
  required?: boolean;
  readonly?: boolean;
}

export default function Checkbox({ text, required, checked, readonly }: CheckboxProps) {
  return (
    <div className='check-box-container'>
      <input
        checked={checked}
        readOnly={readonly}
        required={required}
        type='checkbox'
        id='check-input'
      />
      <label htmlFor='check-input'>{text}</label>
    </div>
  );
}
