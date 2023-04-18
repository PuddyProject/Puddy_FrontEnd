import { CustomHeader, FooterButton } from 'components';
import Modal from 'components/common/Modal';
import InputField from 'components/signup/InputField';
import { myPageApi } from 'constants/apiEndpoint';
import { MY_PAGE_PATH } from 'constants/routes';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FieldName } from 'types/signupTypes';
import { patch } from 'utils';
import { initWarningMessage } from 'utils/initialValues/signup';
import { isValidPw, validatePassword, validateReEnterPassword } from 'utils/validate/checkSignup';

export interface ChangeAccountInterface {
  account?: string;
  password: string;
  reEnterPassword: string;
  username?: string;
  email?: string;
  isNotificated?: boolean;
}

interface ChangePasswordProps {
  password: React.RefObject<HTMLInputElement>;
  reEnterPassword: React.RefObject<HTMLInputElement>;
}

interface ValidChecker {
  password: boolean;
  reEnterPassword: boolean;
}

export default function ChangePassword() {
  const navigate = useNavigate();

  const [inputPassword, setInputPassword] = useState({
    password: '',
    reEnterPassword: '',
  });

  const [isCorrectFormData, setIsCorrectFormData] = useState<ValidChecker>({
    password: false,
    reEnterPassword: false,
  });

  const [showModal, setShowModal] = useState(false);

  const [inputsToShake, setInputsToShake] = useState<FieldName[]>([]);
  const [warningMessage, setWarningMessage] = useState(initWarningMessage);

  const formRefs = useRef<ChangePasswordProps>({
    password: useRef(null),
    reEnterPassword: useRef(null),
  });

  const submitChangePassword = async () => {
    try {
      const res = await patch({
        endpoint: myPageApi.PATCH_MY_PASSWORD,
        isFormData: false,
        body: {
          password: inputPassword.password,
        },
      });

      if (res.status === 200) {
        setShowModal(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onChangeInput = (target: FieldName) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setIsCorrectFormData((prev) => {
      if (target === 'password') {
        return {
          ...prev,
          [target]: false,
          reEnterPassword: false,
        };
      }

      return { ...prev, [target]: false };
    });

    setInputPassword((prev) => {
      return { ...prev, [target]: value };
    });

    setWarningMessage((prev) => {
      if (target === 'password') {
        return { ...prev, [target]: validatePassword(value).msg };
      }

      if (target === 'reEnterPassword') {
        const password = inputPassword.password;
        const reEnterPassword = value;

        return { ...prev, [target]: validateReEnterPassword(password, reEnterPassword).msg };
      }

      return { ...prev, [target]: '' };
    });
  };

  useEffect(() => {
    if (!formRefs.current) return;

    formRefs.current.password.current?.focus();
  }, []);

  useEffect(() => {
    if (inputPassword.password === inputPassword.reEnterPassword) {
      setIsCorrectFormData((prev) => {
        return { ...prev, reEnterPassword: true };
      });
    }

    if (isValidPw(inputPassword.password)) {
      setIsCorrectFormData((prev) => {
        return { ...prev, password: true };
      });
    }
  }, [inputPassword.password, inputPassword.reEnterPassword]);

  useEffect(() => {
    if (inputPassword.password !== inputPassword.reEnterPassword) {
      setWarningMessage((prev) => {
        return { ...prev, reEnterPassword: '비밀번호가 일치하지 않아요.' };
      });

      setIsCorrectFormData(() => {
        return {
          password: false,
          reEnterPassword: false,
        };
      });
    } else {
      setWarningMessage((prev) => {
        return { ...prev, reEnterPassword: '' };
      });

      setIsCorrectFormData(() => {
        return {
          password: true,
          reEnterPassword: true,
        };
      });
    }
  }, [inputPassword.password]);

  return (
    <>
      {showModal && (
        <Modal
          closeModal={() => {
            setShowModal(false);
            navigate(`${MY_PAGE_PATH}`);
          }}
        >
          <h2 className='modal-title'>비밀번호 변경</h2>
          <p className='modal-content'>변경이 완료되었어요.</p>
        </Modal>
      )}
      <CustomHeader title='비밀번호 변경' hideIcon />
      <div className='change-password-container'>
        <InputField
          inputRef={formRefs.current.password}
          onChange={onChangeInput}
          className={`${inputsToShake.includes('password') ? 'shake' : ''}`}
          placeholder='새로운 비밀번호를 입력해주세요.'
          type='password'
          target='password'
          title='새 비밀번호'
          registrationMembership={inputPassword}
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
          registrationMembership={inputPassword}
          initWarningMessage={initWarningMessage}
          warningMessage={warningMessage}
        />
        <FooterButton onClick={submitChangePassword}>변경하기</FooterButton>
      </div>
    </>
  );
}
