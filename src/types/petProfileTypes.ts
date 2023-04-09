export interface PetInfo {
  name: string;
  breed: string;
  age: number;
  gender: boolean | string;
  isNeutered: boolean;
  weight: number;
  note?: string;
  imagePath?: string;
}

export interface MyPetFormRefs {
  name: React.RefObject<HTMLInputElement>;
  breed: React.RefObject<HTMLInputElement>;
  age: React.RefObject<HTMLInputElement>;
  weight: React.RefObject<HTMLInputElement>;
}

export type RequiredValues = 'name' | 'breed' | 'age' | 'gender' | 'weight';
