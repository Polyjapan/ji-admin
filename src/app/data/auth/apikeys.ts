import {UserProfile} from "./users";

export class ApiKey {
  appId?: number;
  appCreatedBy: number;
  clientSecret: string;
  appName: string;
}

export class ApiKeyData {
  apiKey: ApiKey;
  allowedScopes: string[];
  author: UserProfile;
}
