import { InputBox, InputTitle, Message } from 'components';
import { FieldName, Membership } from 'pages/Signup';

interface InputFieldProps {
  className?: string;
  type?: string;
  placeholder: string;
  target: FieldName;
  title: string;
  registrationMembership: Membership;
  initWarningMessage: Membership;
  warningMessage: Membership;
  children?: React.ReactNode;
  onChange: (target: FieldName) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
  className,
  target,
  title,
  registrationMembership,
  initWarningMessage,
  warningMessage,
  onChange,
  children,
  type = 'text',
  placeholder = '',
}: InputFieldProps) {
  return (
    <>
      <div className='title-message'>
        <InputTitle isRequire>{title}</InputTitle>
        <Message isWarning alignRight>
          {registrationMembership[target] === ''
            ? initWarningMessage[target]
            : warningMessage[target]}
        </Message>
      </div>
      <div className={className ? className : ''}>
        <InputBox
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
