import Button from 'components/common/Button';
import InputBox from 'components/common/InputBox';
import InputTilte from 'components/common/InputTitle';
import MainQnaCard from 'components/common/MainQnaCard';

export default function Main() {
  return (
    <div className='main'>
      <Button margin='10px' isOutline>
        텍스트
      </Button>
      <Button margin='10px'>텍스트</Button>
      <Button margin='10px' width='sm' isOutline>
        텍스트
      </Button>
      <Button margin='10px' width='sm'>
        텍스트
      </Button>
      <InputBox />
      <div className='main-qna-container'>
        <MainQnaCard />
        <MainQnaCard />
        <MainQnaCard />
        <MainQnaCard />
        <MainQnaCard />
      </div>
      <InputTilte isRequire={true} width='200px' />
      <InputTilte width='200px' />
      <div style={{ height: '500px' }}></div>
    </div>
  );
}
