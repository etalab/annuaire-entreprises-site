import { IUniteLegale } from '.';
import getConventionCollectives, {
  IConventionCollective,
} from './convention-collective';

import getUniteLegale from './unite-legale';

export interface IConventions {
  uniteLegale: IUniteLegale;
  conventionCollectives: IConventionCollective[];
}

const getConventions = async (slug: string): Promise<IConventions> => {
  const uniteLegale = await getUniteLegale(slug);

  const conventions = uniteLegale.estDiffusible
    ? await getConventionCollectives(uniteLegale as IUniteLegale)
    : [];

  return {
    uniteLegale,
    conventionCollectives: conventions,
  };
};

export default getConventions;
