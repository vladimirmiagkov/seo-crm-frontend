export class User {
  id: string;
  username: string;
  password: string;
  email: string;
  enabled: boolean = true;
  lastLogin: null | string;
  createdBy: null | string;
  modifiedBy: null | string;
  createdAt: null | string;
  modifiedAt: null | string;
  roles: null | string;
}