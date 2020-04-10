export class Group {
  id?: number;
  name: string;
  displayName: string;
}

export class GroupData {
  group: Group;
  allowedScopes: string[];
}
