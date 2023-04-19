import { CustomHeader, FooterButton, InputBox, Message } from 'components';
import InputTilte from 'components/common/InputTitle';

export default function Id() {
  return (
    <>
      <CustomHeader title='아이디 찾기' hideIcon />
      <div className='find-id-container'>
        <div>
          <InputTilte isRequire>이름</InputTilte>
          <InputBox required placeholder='이름을 입력해주세요.' />
        </div>
        <div>
          <InputTilte isRequire>이메일</InputTilte>
          <InputBox required placeholder='이메일을 입력해주세요.' />
        </div>
        <div className='message-result'>
          {/* <p>해당 정보로 가입된 아이디가 존재해요.</p> */}
          {/* <p>reas***</p>
          
          //TODO: 현재 아이디 찾기 API가 없음
          */}
        </div>
        <FooterButton>확인</FooterButton>
      </div>
    </>
  );
}
