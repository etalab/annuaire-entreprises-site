import React from 'react';
import {
  estDiffusible,
  nonDiffusibleDataFormatter,
} from '#models/core/statut-diffusion';
import { IUniteLegale } from '#models/core/types';
import { ISession, isAgent } from '#utils/session';

const ExtraitRNELink: React.FC<{
  uniteLegale: IUniteLegale;
  session: ISession | null;
}> = ({ uniteLegale, session }) => {
  return estDiffusible(uniteLegale) || isAgent(session) ? (
    <a
      target="_blank"
      rel="noopener"
      href={`/justificatif-immatriculation-pdf/${uniteLegale.siren}`}
    >
      télécharger
    </a>
  ) : (
    <>{nonDiffusibleDataFormatter('document non-diffusible')}</>
  );
};

export default ExtraitRNELink;
