import { useRef } from 'react';
import { HiPlus as PlusIcon } from 'react-icons/hi';

interface ImageUploaderProps {
  onChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ImageUploader({ onChangeImage }: ImageUploaderProps) {
  const labelRef = useRef<HTMLLabelElement>(null);

  const onKeyDown = () => (e: React.KeyboardEvent<HTMLLabelElement>) => {
    const isEnter = e.key === 'Enter';
    if (!isEnter) return;
    if (labelRef.current) labelRef.current.click();
  };

  return (
    <>
      <label ref={labelRef} tabIndex={0} htmlFor='image-file-uploader' onKeyDown={onKeyDown()}>
        <div className='image-uploader'>
          <PlusIcon />
          <span className='image-uploader-text'>이미지 등록</span>
        </div>
      </label>
      <input
        accept='image/*'
        onChange={onChangeImage}
        className='uploader-input'
        type='file'
        id='image-file-uploader'
      />
    </>
  );
}
