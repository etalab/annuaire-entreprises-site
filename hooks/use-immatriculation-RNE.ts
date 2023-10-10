import { useEffect, useState } from 'react';
import { EAdministration } from '#models/administrations';
import { APILoadingFactory, IAPILoading } from '#models/api-loading';
import {
  APINotRespondingFactory,
  IAPINotRespondingError,
} from '#models/api-not-responding';
import { IImmatriculationRNE } from '#models/immatriculation';
import { IUniteLegale } from '#models/index';
import httpFrontClient from '#utils/network/frontend';

const RNE_ROUTE = '/api/data-fetching/rne';
export const useImmmatriculationRNE = (uniteLegale: IUniteLegale) => {
  const [immatriculationRNE, setImmatriculationRNE] = useState<
    IImmatriculationRNE | IAPINotRespondingError | IAPILoading
  >(APILoadingFactory());

  useEffect(() => {
    const fetchDonneesRestreintes = async () => {
      try {
        const response = await httpFrontClient<IImmatriculationRNE>(
          RNE_ROUTE + '/' + uniteLegale.siren
        );
        setImmatriculationRNE(response);
      } catch {
        setImmatriculationRNE(
          APINotRespondingFactory(EAdministration.INPI, 500)
        );
      }
    };

    fetchDonneesRestreintes();
  }, [uniteLegale]);

  return immatriculationRNE;
};

export default useImmmatriculationRNE;
