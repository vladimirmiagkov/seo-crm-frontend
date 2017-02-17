export class Site {
  id: string;
  name: string;
  active: boolean = true;
  deleted: boolean = false;
  createdBy: null | string;
  modifiedBy: null | string;
  createdAt: null | string;
  modifiedAt: null | string;

  namePuny: string;
  keywords;
}