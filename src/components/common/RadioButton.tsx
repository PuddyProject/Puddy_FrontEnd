interface RadioButtonProps {
  name: string;
  value: string;
  children: React.ReactNode;
  required?: boolean;
}

export default function RadioButton({ name, value, children, required }: RadioButtonProps) {
  return (
    <div className='radio-button-container'>
      <label>
        <input
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
