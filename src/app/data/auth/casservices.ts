export class CasService {
  serviceId?: number;
  serviceName: string;
  serviceRedirectUrl?: string;
  serviceRequiresFullInfo?: boolean;

  servicePortalDisplay: boolean;
  servicePortalTitle?: string;
  servicePortalDescription?: string;
  servicePortalLoginUrl?: string;
  servicePortalImageUrl?: string;
}

export class ServiceData {
  service: CasService;
  requiredGroups: string[];
  allowedGroups: string[];
  domains: string[];
  accessFrom: [number, string][];
}
