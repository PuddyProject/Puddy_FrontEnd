import MainExpertCard from './MainExpertCard';
import PlusButton from 'components/common/PlusButton';
import { useNavigate } from 'react-router-dom';

export default function ExpertContainer() {
  const nav = useNavigate();

  return (
    <>
      <div className='qna-title'>퍼디 신규 등록 전문가</div>
      <div className='main-expert-container'>
        {Array(5)
          .fill(0)
          .map((_, i) => {
            return <MainExpertCard key={i} />;
          })}
        <PlusButton
          padding='15px 0px 0px 7px'
          onClick={() => {
            nav('experts');
          }}
        />
      </div>
    </>
  );
}
