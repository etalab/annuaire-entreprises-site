import { PrintNever } from '#components-ui/print-visibility';
import { checkHasLabelsAndCertificates } from '#components/labels-and-certificates-badges-section';
import constants from '#models/constants';
import { IUniteLegale, isCollectiviteTerritoriale } from '#models/index';
import { ISession, isLoggedIn } from '#utils/session';

export enum FICHE {
  ACTES = 'actes & statuts',
  ANNONCES = 'annonces',
  FINANCES = 'finances',
  CERTIFICATS = 'Labels ou certifications',
  COMPTES = 'bilans & comptes',
  DIRIGEANTS = 'dirigeants',
  DIVERS = 'conventions collectives',
  ELUS = 'élus',
  ETABLISSEMENTS_SCOLAIRES = 'établissements scolaires',
  INFORMATION = 'résumé',
  JUSTIFICATIFS = 'justificatifs',
  ETABLISSEMENT = 'fiche établissement',
}

export const Tabs: React.FC<{
  currentFicheType: FICHE;
  uniteLegale: IUniteLegale;
  session: ISession | null;
}> = ({ currentFicheType, uniteLegale, session }) => {
  const tabs = [
    {
      ficheType: FICHE.INFORMATION,
      label: 'Résumé',
      pathPrefix: '/entreprise/',
      noFollow: false,
      shouldDisplay: true,
    },
    {
      ficheType: FICHE.JUSTIFICATIFS,
      label: 'Justificatif d’immatriculation',
      pathPrefix: '/justificatif/',
      noFollow: false,
      shouldDisplay: true,
    },
    {
      ficheType: FICHE.ELUS,
      label: 'Élus',
      pathPrefix: '/elus/',
      noFollow: false,
      shouldDisplay: isCollectiviteTerritoriale(uniteLegale),
    },
    {
      ficheType: FICHE.DIRIGEANTS,
      label: 'Dirigeants',
      pathPrefix: '/dirigeants/',
      noFollow: false,
      shouldDisplay: !isCollectiviteTerritoriale(uniteLegale),
    },
    {
      ficheType: FICHE.FINANCES,
      label: 'Données financières',
      pathPrefix: '/donnees-financieres/',
      noFollow: false,
      shouldDisplay: isLoggedIn(session),
    },
    {
      ficheType: FICHE.ANNONCES,
      label: 'Annonces',
      pathPrefix: '/annonces/',
      noFollow: false,
      shouldDisplay: true,
    },
    {
      ficheType: FICHE.CERTIFICATS,
      label: 'Labels et certificats',
      pathPrefix: '/labels-certificats/',
      noFollow: false,
      shouldDisplay: checkHasLabelsAndCertificates(uniteLegale),
    },
    {
      ficheType: FICHE.ETABLISSEMENTS_SCOLAIRES,
      label: 'Établissements scolaires',
      pathPrefix: '/etablissements-scolaires/',
      noFollow: false,
      shouldDisplay: uniteLegale.complements.estUai,
    },
    {
      ficheType: FICHE.DIVERS,
      label: 'Conventions collectives',
      pathPrefix: '/divers/',
      noFollow: false,
      shouldDisplay: true,
    },
  ];
  return (
    <PrintNever>
      <div className="title-tabs">
        {tabs
          .filter(({ shouldDisplay }) => shouldDisplay)
          .map(({ pathPrefix, ficheType, label, noFollow }) => (
            <a
              className={`${
                currentFicheType === ficheType ? 'active' : ''
              } no-style-link`}
              href={`${pathPrefix}${uniteLegale.siren}`}
              rel={noFollow ? 'nofollow' : ''}
              key={label}
            >
              {currentFicheType === ficheType ? label : <h2>{label}</h2>}
            </a>
          ))}

        {currentFicheType === FICHE.ETABLISSEMENT && (
          <>
            <div style={{ flexGrow: 1 }} />
            <a className="active no-style-link" key="etablissement" href="">
              <h2>Fiche établissement</h2>
            </a>
            <a
              className="no-style-link"
              key="etablissements"
              href={`/entreprise/${uniteLegale.chemin}#etablissements`}
            >
              <h2>Liste des établissements</h2>
            </a>
          </>
        )}
      </div>
      <style jsx>{`
        .title-tabs {
          display: flex;
          flex-grow: 1;
          font-size: 0.9rem;
          border-bottom: 2px solid ${constants.colors.pastelBlue};
        }
        .title-tabs > a {
          border-top-left-radius: 3px;
          border-top-right-radius: 3px;
          border: 2px solid ${constants.colors.pastelBlue};
          background-color: #efeffb;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          box-shadow: 0 -8px 5px -5px ${constants.colors.pastelBlue} inset;
          margin: 0 4px;
          padding: 10px 5px;
          margin-bottom: -2px;
        }

        .title-tabs > a,
        .title-tabs > a > h2 {
          color: ${constants.colors.frBlue};
          font-weight: bold;
          font-size: 0.9rem;
          line-height: 1.5rem;
        }

        .title-tabs > a > h2 {
          margin: 0;
          padding: 0;
        }

        .title-tabs > a:hover {
          background-color: ${constants.colors.pastelBlue};
        }

        .title-tabs > a.active {
          box-shadow: none;
          background-color: #fff;
          border-bottom: 0;
        }

        @media only screen and (min-width: 1px) and (max-width: 768px) {
          .title-tabs {
            flex-direction: column;
            border-bottom: 0;
          }
          .title-tabs > a {
            margin: 3px;
          }
          .title-tabs > a.active {
            background-color: #fff;
            border-bottom: 2px solid ${constants.colors.pastelBlue};
          }
        }
      `}</style>
    </PrintNever>
  );
};
