import { GrFormNext as NextIcon } from 'react-icons/gr';

interface PlusButtonPros {
  padding?: string;
  onClick?: () => void;
}

export default function PlusButton({ padding, onClick }: PlusButtonPros) {
  const plusButtonStyle = {
    padding,
  };

  return (
    <div className='plus-button' style={plusButtonStyle} onClick={onClick}>
      <div className='main-link'>
        <div className='plus-button-circle'>
          <NextIcon />
        </div>
        <div className='more'>더보기</div>
      </div>
    </div>
  );
}
