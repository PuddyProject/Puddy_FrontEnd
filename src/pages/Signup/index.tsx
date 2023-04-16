import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GrFormPrevious as PrevIcon } from 'react-icons/gr';

import { Button, Checkbox, FooterButton } from 'components';
import InputField from 'components/signup/InputField';

import { isValidId, isValidName, isValidPw, post } from 'utils';
import {
  isValidEmail,
  validateAccount,
  validateEmail,
  validatePassword,
  validateReEnterPassword,
  validateusername,
} from 'utils/validate/checkSignup';
import { initMembershipValues, initWarningMessage } from 'utils/initialValues/signup';

import { ApiError } from 'types/errorsTypes';
import { FieldName, SigunupFormRefs, ValidChecker } from 'types/signupTypes';
import { joinApi } from 'constants/apiEndpoint';
import { HOME_PATH, LOGIN_PATH } from 'constants/routes';

/**
 * Signup 페이지
 */
export default function Signup() {
  const navigate = useNavigate();

  const [registrationMembership, setRegistrationMembership] = useState(initMembershipValues);
  const [isCorrectFormData, setIsCorrectFormData] = useState<ValidChecker>({
    account: false,
    email: false,
    password: false,
    reEnterPassword: false,
    username: false,
  });
  const [warningMessage, setWarningMessage] = useState(initWarningMessage);
  const [showCorrectMessage, setShowCorrectMessage] = useState({
    account: false,
    email: false,
  });
  const [disabledDuplicationButton, setDisabledDuplicationButton] = useState({
    account: true,
    email: true,
  });
  const [inputsToShake, setInputsToShake] = useState<FieldName[]>([]);

  const [isMounted, setIsMounted] = useState(false);

  const formRefs = useRef<SigunupFormRefs>({
    account: useRef(null),
    username: useRef(null),
    email: useRef(null),
    password: useRef(null),
    reEnterPassword: useRef(null),
  });

  /**
   * 인풋 박스 change 이벤트
   */
  const onChangeInput = (target: FieldName) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setIsCorrectFormData((prev) => {
      // 인풋 값 변경 시 해당 인풋이 제대로 작성되지 않을 수 있으므로 false로 변경합니다.
      // 비밀번호의 경우 확인 인풋도 false가 되어야 하므로 분기처리하였습니다.
      if (target === 'password') {
        return {
          ...prev,
          [target]: false,
          reEnterPassword: false,
        };
      }

      return { ...prev, [target]: false };
    });

    setRegistrationMembership((prev) => {
      return { ...prev, [target]: value };
    });

    setWarningMessage((prev) => {
      if (target === 'account') {
        setShowCorrectMessage((prev) => {
          return { ...prev, account: false };
        });

        return { ...prev, [target]: validateAccount(value).msg };
      }

      if (target === 'password') {
        return { ...prev, [target]: validatePassword(value).msg };
      }

      if (target === 'reEnterPassword') {
        const password = registrationMembership.password;
        const reEnterPassword = value;

        return { ...prev, [target]: validateReEnterPassword(password, reEnterPassword).msg };
      }

      if (target === 'username') {
        return { ...prev, [target]: validateusername(value).msg };
      }

      if (target === 'email') {
        setShowCorrectMessage((prev) => {
          return { ...prev, email: false };
        });

        return { ...prev, [target]: validateEmail(value).msg };
      }

      return { ...prev, [target]: '' };
    });
  };

  const onChangeCheckbox = (isChecked: boolean) => {
    setRegistrationMembership((prev) => {
      return { ...prev, isNotificated: isChecked };
    });
  };

  /**
   * * 아이디/이메일 중복 체크
   */
  const onClickCheckDuplicate = (target: 'account' | 'email') => async (e: React.MouseEvent) => {
    const body = {
      [target]: registrationMembership[target],
    };

    if (!registrationMembership[target]) return;
    try {
      const res = await post({
        endpoint: `${joinApi.requestDuplicate(target)}`,
        body,
      });

      if (res.status === 200) {
        setIsCorrectFormData((prev) => {
          return { ...prev, [target]: true };
        });
        setShowCorrectMessage((prev) => {
          return { ...prev, [target]: true };
        });
      }
    } catch (err: unknown) {
      const Error = err as ApiError;
      if (Error.response?.status === 400) {
        console.error('이미 존재하는 아이디 또는 이메일입니다.');

        setWarningMessage((prev) => {
          return {
            ...prev,
            [target]: `이미 존재하는 ${target === 'account' ? '아이디' : '이메일이'}에요.`,
          };
        });
      }
    }
  };

  /**
   * * 회원가입 POST 요청
   * ✨ 회원가입 버튼 클릭 후 동작
   * 입력한 인풋이 유효하지 않으면 shake 효과 적용 후 리턴
   * 유효하면 서버로 POST 요청합니다.
   */

  const onSubmitRegister = async () => {
    // 유효하지 않으면 shake 효과 추가 후 return
    const isCorrectInputValues = Object.entries(isCorrectFormData).every(([_, value]) => value);

    if (isCorrectInputValues) {
      // 유효하면 POST
      try {
        const res = await post({
          endpoint: `${joinApi.POST_JOIN}`,
          body: registrationMembership,
        });
        if (res.status === 201) {
          window.alert('퍼디 회원이 되신 것을 환영해요!'); // *임시 메시지
          navigate(`${LOGIN_PATH}`);
        }
      } catch (err: unknown) {
        const error = err as ApiError;
        console.error(error.response?.status);
      }
    } else setInputsToShake(() => []);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    //TODO: 리팩토링
    if (isMounted) {
      if (!isValidId(registrationMembership.account) || !isCorrectFormData.account) {
        if (inputsToShake.includes('account')) return;
        formRefs.current.account.current?.focus();
        return setInputsToShake((prev) => [...prev, 'account']);
      }

      if (!isValidPw(registrationMembership.password) || !isCorrectFormData.password) {
        if (inputsToShake.includes('password')) return;
        formRefs.current.password.current?.focus();
        return setInputsToShake((prev) => [...prev, 'password']);
      }

      if (
        !(registrationMembership.password === registrationMembership.reEnterPassword) ||
        !isCorrectFormData.reEnterPassword
      ) {
        if (inputsToShake.includes('reEnterPassword')) return;
        formRefs.current.reEnterPassword.current?.focus();
        return setInputsToShake((prev) => [...prev, 'reEnterPassword']);
      }

      if (!isValidName(registrationMembership.username) || !isCorrectFormData.username) {
        if (inputsToShake.includes('username')) return;
        formRefs.current.username.current?.focus();
        return setInputsToShake((prev) => [...prev, 'username']);
      }

      if (!isValidPw(registrationMembership.email) || !isCorrectFormData.email) {
        if (inputsToShake.includes('email')) return;
        formRefs.current.email.current?.focus();
        return setInputsToShake((prev) => [...prev, 'email']);
      }
    }
  }, [inputsToShake]);

  /**
   * 아이디/이메일이 유효하면 중복 확인 버튼을 활성화합니다.
   */
  useEffect(() => {
    if (isValidId(registrationMembership.account)) {
      setDisabledDuplicationButton((prev) => {
        return { ...prev, account: false };
      });
    } else {
      setDisabledDuplicationButton((prev) => {
        return { ...prev, account: true };
      });
    }

    if (isValidEmail(registrationMembership.email)) {
      setDisabledDuplicationButton((prev) => {
        return { ...prev, email: false };
      });
    } else {
      setDisabledDuplicationButton((prev) => {
        return { ...prev, email: true };
      });
    }
  }, [registrationMembership.account, registrationMembership.email]);

  useEffect(() => {
    // 사용자가 중간에 인풋 값을 바꾸는 경우 유효한지 확인 후
    // 유효할 경우 isCorrectFormData 값을 true로 갱신합니다.

    if (registrationMembership.password === registrationMembership.reEnterPassword) {
      setIsCorrectFormData((prev) => {
        return { ...prev, reEnterPassword: true };
      });
    }

    if (isValidPw(registrationMembership.password)) {
      setIsCorrectFormData((prev) => {
        return { ...prev, password: true };
      });
    }

    if (isValidName(registrationMembership.username)) {
      setIsCorrectFormData((prev) => {
        return { ...prev, username: true };
      });
    }
  }, [
    registrationMembership.password,
    registrationMembership.reEnterPassword,
    registrationMembership.username,
  ]);

  useEffect(() => {
    if (formRefs.current) formRefs.current.account.current?.focus();
  }, []);

  useEffect(() => {
    if (registrationMembership.password !== registrationMembership.reEnterPassword) {
      setWarningMessage((prev) => {
        return { ...prev, reEnterPassword: '비밀번호가 일치하지 않아요.' };
      });
    } else {
      setWarningMessage((prev) => {
        return { ...prev, reEnterPassword: '' };
      });
    }
  }, [registrationMembership.password]);

  return (
    <>
      <div className='signup-container'>
        <PrevIcon
          className='prev-icon'
          onClick={() => {
            navigate(`${HOME_PATH}`);
          }}
        />
        <h2 className='signup-title'>
          PUDDY 서비스는
          <br />
          <strong className='bold'>회원가입 후 이용</strong>하실 수 있어요. 😊
        </h2>
        <div className='signup-datas'>
          <InputField
            inputRef={formRefs.current.account}
            className={`duplicate-check-container ${
              inputsToShake.includes('account') ? 'shake' : ''
            }`}
            onChange={onChangeInput}
            placeholder='아이디를 입력해주세요.'
            target='account'
            title='아이디'
            registrationMembership={registrationMembership}
            initWarningMessage={initWarningMessage}
            warningMessage={warningMessage}
            showCorrectMessage={showCorrectMessage}
          >
            <Button
              disabled={disabledDuplicationButton.account}
              onClick={onClickCheckDuplicate('account')}
            >
              중복 확인
            </Button>
          </InputField>

          <InputField
            inputRef={formRefs.current.password}
            onChange={onChangeInput}
            className={`${inputsToShake.includes('password') ? 'shake' : ''}`}
            placeholder='비밀번호를 입력해주세요.'
            type='password'
            target='password'
            title='비밀번호'
            registrationMembership={registrationMembership}
            initWarningMessage={initWarningMessage}
            warningMessage={warningMessage}
          />

          <InputField
            inputRef={formRefs.current.reEnterPassword}
            onChange={onChangeInput}
            className={`${inputsToShake.includes('reEnterPassword') ? 'shake' : ''}`}
            placeholder='비밀번호를 다시 입력해주세요.'
            type='password'
            target='reEnterPassword'
            title='비밀번호 확인'
            registrationMembership={registrationMembership}
            initWarningMessage={initWarningMessage}
            warningMessage={warningMessage}
          />

          <InputField
            inputRef={formRefs.current.username}
            onChange={onChangeInput}
            className={`${inputsToShake.includes('username') ? 'shake' : ''}`}
            placeholder='이름을 입력해주세요.'
            target='username'
            title='이름'
            registrationMembership={registrationMembership}
            initWarningMessage={initWarningMessage}
            warningMessage={warningMessage}
          />

          <InputField
            inputRef={formRefs.current.email}
            className={`duplicate-check-container ${
              inputsToShake.includes('email') ? 'shake' : ''
            }`}
            onChange={onChangeInput}
            placeholder='이메일을 입력해주세요.'
            target='email'
            title='이메일'
            registrationMembership={registrationMembership}
            initWarningMessage={initWarningMessage}
            warningMessage={warningMessage}
            showCorrectMessage={showCorrectMessage}
          >
            <Button
              disabled={disabledDuplicationButton.email}
              onClick={onClickCheckDuplicate('email')}
            >
              중복 확인
            </Button>
          </InputField>

          <div className='notification'>
            <Checkbox
              requestOnChange={onChangeCheckbox}
              checked={initMembershipValues.isNotificated}
              text='알림 수신 여부 동의'
            />
          </div>

          <span className='notification-message'>
            수신에 동의하면 퍼디의 다양한 소식을 받아보실 수 있어요.
          </span>
        </div>
        <FooterButton onClick={onSubmitRegister}>회원가입</FooterButton>
      </div>
    </>
  );
}
