interface CheckboxProps {
  text?: string;
  required?: boolean;
}

export default function Checkbox({ text, required }: CheckboxProps) {
  return (
    <div className='check-box-container'>
      <input required={required} type='checkbox' id='check-input' />
      <label htmlFor='check-input'>{text}</label>
    </div>
  );
}
