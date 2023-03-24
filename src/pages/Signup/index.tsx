import { Button, Checkbox, InputBox, InputTitle } from 'components';
import FooterButton from 'components/common/FooterButton';

export default function Signup() {
  return (
    <div className='signup-container'>
      <h2 className='signup-title'>
        PUDDY 서비스는
        <br />
        <strong className='bold'>회원가입 후 이용</strong>하실 수 있어요. 😊
      </h2>
      <div className='signup-datas'>
        <InputTitle isRequire>아이디</InputTitle>
        <div className='duplicate-check-container'>
          <InputBox required width='100%' placeholder='아이디를 입력해주세요.' />
          <Button>중복 확인</Button>
        </div>

        <InputTitle isRequire>비밀번호</InputTitle>
        <InputBox required width='100%' type='password' placeholder='비밀번호를 입력해주세요.' />

        <InputTitle isRequire>비밀번호 확인</InputTitle>
        <InputBox required width='100%' type='password' placeholder='비밀번호를 입력해주세요.' />

        <InputTitle isRequire>이름</InputTitle>
        <InputBox required width='100%' placeholder='이름을 입력해주세요.' />

        <InputTitle isRequire>이메일</InputTitle>
        <div className='duplicate-check-container'>
          <InputBox required width='100%' type='email' placeholder='이메일을 입력해주세요.' />
          <Button>중복 확인</Button>
        </div>

        <div className='notification'>
          <Checkbox text='알림 수신 여부 동의' />
        </div>
        <span className='notification-message'>
          수신에 동의하면 퍼디의 다양한 소식을 받아보실 수 있어요.
        </span>
      </div>
      <FooterButton>회원가입</FooterButton>
    </div>
  );
}
