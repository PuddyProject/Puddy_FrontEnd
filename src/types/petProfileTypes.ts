export interface Profile {
  name: string;
  breed: string;
  age: string;
  gender: string;
  isNeutered: boolean;
  weight: string;
  note?: string;
}

export interface MyPetFormRefs {
  name: React.RefObject<HTMLInputElement>;
  breed: React.RefObject<HTMLInputElement>;
  age: React.RefObject<HTMLInputElement>;
  weight: React.RefObject<HTMLInputElement>;
}

export type RequiredValues = 'name' | 'breed' | 'age' | 'gender' | 'weight';
