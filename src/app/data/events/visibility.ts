export enum Visibility {
  Draft = 'Draft', Internal = 'Internal', Public = 'Public', Archived = 'Archived'
}

export const Visibilities = [Visibility.Draft, Visibility.Internal, Visibility.Public, Visibility.Archived]

export function visibilityFromString(vis: string) {
  return Visibility[vis];
}
