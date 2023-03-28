import MainExpertCard from './MainExpertCard';
import PlusButton from 'components/common/PlusButton';
export default function ExpertContainer() {
  return (
    <>
      <div className='qna-title'>퍼디 신규 등록 전문가</div>
      <div className='main-expert-container'>
        {Array(5)
          .fill(0)
          .map((_, i) => {
            return <MainExpertCard key={i} />;
          })}
        <PlusButton />
      </div>
    </>
  );
}
