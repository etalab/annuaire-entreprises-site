import { IOrganismeFormation } from '#clients/dgefp';
import { IOrganismesFormationResponse } from '#clients/dgefp/type';
import { IAPINotRespondingError } from '#models/api-not-responding';
import { getEgapro, IEgapro } from '#models/certifications/egapro';
import { getUniteLegaleFromSlug } from '#models/unite-legale';
import { IUniteLegale } from '..';
import { getBio, IEtablissementsBio } from './bio';
import {
  getEntrepreneurSpectaclesCertification,
  IEntrepreneurSpectaclesCertification,
} from './entrepreneur-spectacles';
import { getOrganismesDeFormation } from './organismes-de-formation';
import { getRGECertifications, IRGECertification } from './rge';

export interface ICertifications {
  uniteLegale: IUniteLegale;
  bio: IEtablissementsBio | IAPINotRespondingError;
  rge: IRGECertification | IAPINotRespondingError;
  entrepreneurSpectacles:
    | IEntrepreneurSpectaclesCertification
    | IAPINotRespondingError;
  egapro: IEgapro | IAPINotRespondingError;
  organismesDeFormation: IOrganismeFormation | IAPINotRespondingError;
}

export const getCertificationsFromSlug = async (
  slug: string
): Promise<ICertifications> => {
  const uniteLegale = await getUniteLegaleFromSlug(slug);

  const [rge, entrepreneurSpectacles, bio, egapro, organismesDeFormation] =
    await Promise.all([
      getRGECertifications(uniteLegale),
      getEntrepreneurSpectaclesCertification(uniteLegale),
      getBio(uniteLegale),
      getEgapro(uniteLegale),
      getOrganismesDeFormation(uniteLegale),
    ]);

  return {
    bio,
    egapro,
    uniteLegale,
    rge,
    entrepreneurSpectacles,
    organismesDeFormation,
  };
};
