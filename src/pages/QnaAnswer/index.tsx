import { FooterButton } from 'components';
import CustomHeader from 'components/common/CustomHeader';
import InputTilte from 'components/common/InputTitle';
import { useNavigate } from 'react-router-dom';

export default function QnaAnswer() {
  const nav = useNavigate();

  return (
    <>
      <CustomHeader
        left={'<'}
        center='Q&A 답글 작성'
        onClickLeft={() => {
          nav(-1);
        }}
      />
      <div>
        <InputTilte isRequire={true} margin='50px 0px 10px 0px'>
          답글 내용
        </InputTilte>
        <textarea className='text-body' placeholder='답글을 입력해주세요.(최대 500자)' />
      </div>
      <FooterButton>답글 작성하기</FooterButton>
    </>
  );
}
