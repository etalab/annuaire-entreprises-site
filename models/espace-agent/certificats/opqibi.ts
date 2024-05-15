import { clientApiEntrepriseOpqibi } from '#clients/api-entreprise/opqibi';
import { IAPINotRespondingError } from '#models/api-not-responding';
import { ISession } from '#models/user/session';
import { Siren } from '#utils/helpers';
import { handleApiEntrepriseError } from '../utils';
type Qualification = {
  nom: string;
  codeQualification: string;
  definition: string;
  rge: boolean;
};
export type IOpqibi = {
  numeroCertificat: string;
  url: string;
  dateDelivranceCertificat: string;
  dureeValiditeCertificat: string;
  assurances: string;
  qualifications: Array<Qualification>;
  dateValiditeQualifications: string;
  qualificationsProbatoires: Array<Qualification>;
  dateValiditeQualificationsProbatoires: string;
};

export const getOpqibi = async (
  siren: Siren,
  user: ISession['user'] | null
): Promise<IOpqibi | IAPINotRespondingError> => {
  return clientApiEntrepriseOpqibi(siren, user?.siret).catch((error) =>
    handleApiEntrepriseError(error, { siren })
  );
};
