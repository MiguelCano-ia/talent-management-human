export interface CreateUserInput {
  name: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  identification: string;
  address: string;
  account?: string;
  roleId: number;
  branchId: number;
  statusId: number;
  paymentMethodId: number;
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