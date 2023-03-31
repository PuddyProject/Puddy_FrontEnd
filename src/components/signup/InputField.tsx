import { InputBox, InputTitle, Message } from 'components';

import { FieldName, Membership } from 'types/signupTypes';

interface InputFieldProps {
  inputRef?: React.RefObject<HTMLInputElement>;
  className?: string;
  type?: string;
  placeholder: string;
  target: FieldName;
  title: string;
  registrationMembership: Membership;
  initWarningMessage: Membership;
  warningMessage: Membership;
  showCorrectMessage?: { account: boolean; email: boolean };
  children?: React.ReactNode;
  onChange: (target: FieldName) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
  inputRef,
  className,
  target,
  title,
  registrationMembership,
  initWarningMessage,
  warningMessage,
  showCorrectMessage,
  onChange,
  children,
  type = 'text',
  placeholder = '',
}: InputFieldProps) {
  const isAccountOrEmail = target === 'account' || target === 'email';

  return (
    <>
      <div className='title-message'>
        <InputTitle isRequire>{title}</InputTitle>
        {isAccountOrEmail && showCorrectMessage?.[target] ? (
          <Message>
            사용 가능한 {(target === 'account' && '아이디') || (target === 'email' && '이메일')}
            입니다.
          </Message>
        ) : (
          <Message isWarning alignRight>
            {registrationMembership[target] === ''
              ? initWarningMessage[target]
              : warningMessage[target]}
          </Message>
        )}
      </div>
      <div className={className ? className : ''}>
        <InputBox
          inputRef={inputRef}
          onChange={onChange(target)}
          required
          width='100%'
          type={type}
          placeholder={placeholder}
        />
        {children}
      </div>
    </>
  );
}
