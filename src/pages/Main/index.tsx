import Button from 'components/common/Button';
import InputBox from 'components/common/InputBox';
import MainQnaCard from 'components/common/MainQnaCard';

export default function Main() {
  return (
    <div className='main'>
      <Button margin='10px' customSize='160px'>
        Q&A 질문하기
      </Button>
      <Button margin='10px' isOutline customSize='160px'>
        내 펫 등록하기
      </Button>

      <InputBox />
      <div className='main-qna-container'>
        {Array(5)
          .fill(0)
          .map((_, i) => {
            return <MainQnaCard key={i} />;
          })}
      </div>
    </div>
  );
}
