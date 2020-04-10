export class CasService {
  serviceId?: number;
  serviceName: string;
  serviceRedirectUrl?: string;
  serviceRequiresFullInfo?: boolean;
}

export class ServiceData {
  service: CasService;
  requiredGroups: string[];
  allowedGroups: string[];
  domains: string[];
  accessFrom: [number, string][];
}
