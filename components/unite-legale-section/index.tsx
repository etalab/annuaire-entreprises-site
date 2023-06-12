import React from 'react';
import FAQLink from '#components-ui/faq-link';
import { HorizontalSeparator } from '#components-ui/horizontal-separator';
import AvisSituationLink from '#components/avis-situation-link';
import { Section } from '#components/section';
import { TwoColumnTable } from '#components/table/simple';
import TVACell from '#components/tva-cell';
import { EAdministration } from '#models/administrations';
import { estActif } from '#models/etat-administratif';
import { IUniteLegale, isAssociation, isServicePublic } from '#models/index';
import { getAdresseUniteLegale, getNomComplet } from '#models/statut-diffusion';
import { formatDate, formatIntFr, formatSiret } from '#utils/helpers';
import { libelleCategorieEntreprise } from '#utils/helpers/formatting/categories-entreprise';
import { libelleTrancheEffectif } from '#utils/helpers/formatting/codes-effectifs';
import { ISession } from '#utils/session';
import {
  checkHasLabelsAndCertificates,
  LabelsAndCertificatesBadgesSection,
  labelsAndCertificatesSources,
} from '../labels-and-certificates-badges-section';

const UniteLegaleSection: React.FC<{
  uniteLegale: IUniteLegale;
  session: ISession | null;
}> = ({ uniteLegale, session }) => {
  const hasLabelsAndCertificates = checkHasLabelsAndCertificates(uniteLegale);

  const data = [
    ['Dénomination', getNomComplet(uniteLegale, session)],
    ['SIREN', formatIntFr(uniteLegale.siren)],
    [
      'SIRET du siège social',
      uniteLegale.siege &&
        uniteLegale.siege.siret &&
        formatSiret((uniteLegale.siege || {}).siret),
    ],
    ['N° TVA Intracommunautaire', <TVACell siren={uniteLegale.siren} />],
    ['Activité principale (NAF/APE)', uniteLegale.libelleActivitePrincipale],
    ['Code NAF/APE', uniteLegale.activitePrincipale],
    [
      <FAQLink to="/faq/modifier-adresse" tooltipLabel="Adresse postale">
        Comment modifier une adresse ?
      </FAQLink>,
      getAdresseUniteLegale(uniteLegale, session, true),
    ],
    ['Nature juridique', uniteLegale.libelleNatureJuridique],
    [
      'Tranche effectif salarié de la structure',
      libelleTrancheEffectif(
        uniteLegale.trancheEffectif,
        uniteLegale.anneeTrancheEffectif
      ),
    ],
    ['Taille de la structure', libelleCategorieEntreprise(uniteLegale)],
    ['Date de création', formatDate(uniteLegale.dateCreation)],
    [
      'Dernière modification des données Insee',
      formatDate(uniteLegale.dateDerniereMiseAJour),
    ],
    ...(!estActif(uniteLegale)
      ? [['Date de fermeture', formatDate(uniteLegale.dateDebutActivite)]]
      : []),
    // jump line and add label and certificates
    ...(hasLabelsAndCertificates
      ? [
          ['', <br />],
          [
            'Label(s) et certificat(s)',
            <LabelsAndCertificatesBadgesSection uniteLegale={uniteLegale} />,
          ],
        ]
      : []),
    ['', <br />],
    [
      'Justificatif(s) d’existence',
      <ul>
        {isAssociation(uniteLegale) ? (
          <li>
            <a href={`/justificatif/${uniteLegale.siren}`}>
              Annonce de création publiée au JOAFE
            </a>
          </li>
        ) : isServicePublic(uniteLegale) ? null : (
          <li>
            <a
              target="_blank"
              rel="noopener"
              href={`/justificatif-immatriculation-pdf/${uniteLegale.siren}`}
            >
              Télécharger l’extrait RNE
            </a>
          </li>
        )}
        <li>
          <AvisSituationLink
            etablissement={uniteLegale.siege}
            label="Avis de situation Insee"
          />
        </li>
      </ul>,
    ],
  ];

  return (
    <div id="entreprise">
      <Section
        title={`Informations légales de ${getNomComplet(uniteLegale, session)}`}
        sources={[
          EAdministration.INSEE,
          EAdministration.VIES,
          ...labelsAndCertificatesSources(uniteLegale),
          ...(isAssociation(uniteLegale)
            ? [EAdministration.DILA]
            : isServicePublic(uniteLegale)
            ? []
            : [EAdministration.INPI]),
        ]}
      >
        <TwoColumnTable body={data} />
      </Section>
      <HorizontalSeparator />
    </div>
  );
};

export default UniteLegaleSection;
