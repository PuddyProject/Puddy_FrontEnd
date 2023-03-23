import Button from 'components/common/Button';

import QnaContainer from 'components/main/QnaContainer';

export default function Main() {
  return (
    <div className='main'>
      <div className='button-container'>
        <Button margin='10px' width='160px'>
          Q&A 질문하기
        </Button>
        <Button margin='10px' outline width='160px'>
          내 펫 등록하기
        </Button>
      </div>
      <div>
        <QnaContainer title={'인기 Q&A'} />
        <QnaContainer title={'최근 Q&A'} />
      </div>
    </div>
  );
}
