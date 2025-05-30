export interface CreateUserInput {
  name: string;
  lastName: string;
  email: string;
  password: string;
  phone: number;
  identification: string;
  address: string;
  acount?: string;
  roleId: number;
  branchOficeId: number;
  meansOfPayment: number;
  identificationId: number;
  isVirtual: boolean;
}

export interface UserRole {
  roleId: number;
  role: string;
}

export interface UserState {
  stateId: number;
  state: string;
};

export interface Identification {
  identificationTypeId: number;
  identification: string;
}