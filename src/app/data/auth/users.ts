export class UserDetails {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

export class UserAddress {
  address: string;
  addressComplement?: string;
  postCode: string;
  city: string;
  country: string;
}

export class UserProfile {
  id?: number;
  email: string;
  details: UserDetails;
  address?: UserAddress;
}


export class UserData extends UserProfile {
  emailConfirmed: boolean;
  passwordAlgo: string;
  passwordReset: boolean;
  passwordResetEnd?: Date;
  scopes: string[];
  groups: string[];
}
