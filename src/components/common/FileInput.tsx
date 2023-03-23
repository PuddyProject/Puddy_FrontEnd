interface FileInputProps {
  text: string;
  accept?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FileInput({ text, accept, placeholder, onChange }: FileInputProps) {
  return (
    <label className='input-box file-input-label' htmlFor='file-uploader'>
      <input
        id='file-uploader'
        className='input-file'
        onChange={onChange}
        type='file'
        accept={accept}
        placeholder={placeholder}
      />
      <span>{text}</span>
    </label>
  );
}
