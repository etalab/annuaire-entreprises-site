import { IRights } from './rights';

export type ISession = {
  lastVisitTimestamp?: number;
  user?: {
    email?: string;
    familyName?: string;
    firstName?: string;
    fullName?: string;
    siret?: string;
    userType?: string;
  };

  rights: IRights;

  // agent connect
  state?: string;
  nonce?: string;
  idToken?: string;
  // connexion
  pathFrom?: string;

  // FranceConnect hide personal data request
  hidePersonalDataRequestFC?: {
    firstName?: string;
    familyName?: string;
    birthdate?: string;
    tokenId: string;
    sub: string;
  };
};
