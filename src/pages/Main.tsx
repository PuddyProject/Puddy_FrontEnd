import Button from '../components/common/Button';
import InputBox from '../components/common/InputBox';

export default function Main() {
  return (
    <>
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
    </>
  );
}
