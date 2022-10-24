import React from 'react';
import { ISearchResult } from '../../models/search';
import { SearchFeedback } from '../search-feedback';
import { Tag } from '../../components-ui/tag';
import IsActiveTag from '../../components-ui/is-active-tag';
import { IETATADMINSTRATIF } from '../../models/etat-administratif';
import { humanPin } from '../../components-ui/icon';
import { isPersonneMorale } from '../dirigeants-section/rncs-dirigeants';
import { IDirigeant } from '../../models/immatriculation/rncs';

interface IProps {
  results: ISearchResult[];
  withFeedback?: boolean;
  searchTerm?: string;
}

const EtablissmentTagLabel: React.FC<{ result: ISearchResult }> = ({
  result,
}) => {
  const openCount = result.nombreEtablissementsOuverts || 'aucun';
  const plural = openCount > 1 ? 's' : '';

  return (
    <Tag>
      {openCount} établissement{plural} en activité
    </Tag>
  );
};

const DirigeantsList: React.FC<{ dirigeants: IDirigeant[] }> = ({
  dirigeants,
}) => {
  const displayMax = 5;
  const firstFive = dirigeants.slice(0, displayMax);
  const moreCount = Math.max(dirigeants.length - displayMax, 0);

  return (
    <div className="dirigeants">
      {firstFive
        .map((dirigeant) =>
          isPersonneMorale(dirigeant)
            ? `${dirigeant.denomination}`
            : `${dirigeant.prenom} ${dirigeant.nom}`
        )
        .join(', ')}
      {moreCount > 0 && `, et ${moreCount} autre${moreCount === 1 ? '' : 's'}`}
      <style jsx>{`
        .dirigeants {
          font-size: 0.9rem;
          color: #555;
          margin: 8px auto 0;
        }
      `}</style>
    </div>
  );
};

const ResultsList: React.FC<IProps> = ({
  results,
  withFeedback = false,
  searchTerm = '',
}) => (
  <>
    {withFeedback && <SearchFeedback searchTerm={searchTerm} />}
    <div className="results-list">
      {results.map((result) => (
        <a
          href={`/entreprise/${result.chemin}`}
          key={result.siret}
          className="result-link no-style-link"
          data-siren={result.siren}
        >
          <div className="title">
            <span>{`${result.nomComplet}`}</span>
            {!result.estActive && (
              <IsActiveTag state={IETATADMINSTRATIF.CESSEE} />
            )}
          </div>
          <div>{result.libelleActivitePrincipale}</div>
          {result.dirigeants.length > 0 && (
            <DirigeantsList dirigeants={result.dirigeants} />
          )}
          <div className="adress">
            <span>{result.adresse || 'Adresse inconnue'} </span>
            <EtablissmentTagLabel result={result} />
          </div>
        </a>
      ))}
    </div>
    <style jsx>{`
      .results-list > a {
        text-decoration: none;
        border: none;
        color: #333;
        margin: 20px 0;
        display: block;
        font-size: 1rem;
      }
      .results-list > a .title {
        color: #000091;
        text-decoration: none;
        font-size: 1.1rem;
        margin-bottom: 5px 0;
      }
      .results-list > a .title > span:first-of-type {
        font-variant: all-small-caps;
      }

      .results-list > a:hover .title {
        text-decoration: underline;
      }

      .results-list > a .adress > span {
        color: #707070;
        font-variant: all-small-caps;
      }
    `}</style>
  </>
);

export default ResultsList;
