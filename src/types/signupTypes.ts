export type FieldName = 'account' | 'password' | 'reEnterPassword' | 'username' | 'email';

export interface Membership {
  account: string;
  password: string;
  reEnterPassword: string;
  username: string;
  email: string;
  isNotificated?: boolean;
}

export interface ValidChecker {
  account: boolean;
  password: boolean;
  reEnterPassword: boolean;
  username: boolean;
  email: boolean;
}

export interface SigunupFormRefs {
  account: React.RefObject<HTMLInputElement>;
  password: React.RefObject<HTMLInputElement>;
  reEnterPassword: React.RefObject<HTMLInputElement>;
  username: React.RefObject<HTMLInputElement>;
  email: React.RefObject<HTMLInputElement>;
}
