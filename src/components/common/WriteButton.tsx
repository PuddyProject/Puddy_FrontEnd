import { BsPencil } from 'react-icons/bs';

interface WriteButtonProps {
  onClick?: () => void;
}

export default function WriteButton({ onClick }: WriteButtonProps) {
  return (
    <div onClick={onClick} className='write-button'>
      <BsPencil size='20' color='white' />
    </div>
  );
}
