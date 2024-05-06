import React from 'react';
import routes from '#clients/routes';
import { Tag } from '#components-ui/tag';
import { EDUCNAT } from '#components/administrations';
import ResultsPagination from '#components/search-results/results-pagination';
import { DataSectionServer } from '#components/section/data-section/server';
import { FullTable } from '#components/table/full';
import { EAdministration } from '#models/administrations/EAdministration';
import { IAPINotRespondingError } from '#models/api-not-responding';
import { IEtablissementsScolaires } from '#models/etablissements-scolaires';

export const EtablissementsScolairesSection: React.FC<{
  etablissements: IEtablissementsScolaires | IAPINotRespondingError;
}> = ({ etablissements }) => {
  return (
    <DataSectionServer
      title="Annuaire de l’Education Nationale"
      sources={[EAdministration.EDUCATION_NATIONALE]}
      data={etablissements}
      notFoundInfo={
        <p>
          Nous n’avons pas retrouvé les établissements scolaires de cette entité
          dans l’annuaire de l’
          <EDUCNAT />. En revanche, vous pouvez peut-être les retrouver grâce au{' '}
          <a href={routes.educationNationale.site}>
            moteur de recherche de l’Education Nationale
          </a>
          .
        </p>
      }
    >
      {(etablissements) => {
        const plural = etablissements.results.length > 1 ? 's' : '';
        return (
          <>
            <p>
              Cette structure possède{' '}
              <strong>{etablissements.resultCount}</strong> établissement
              {plural} scolaire{plural}&nbsp;:
            </p>
            <FullTable
              head={['N° UAI', 'Académie', 'Détails', 'Contact', 'Nb d’élèves']}
              body={etablissements.results.map(
                ({
                  adresse,
                  codePostal,
                  libelleAcademie,
                  mail,
                  nombreEleves,
                  nomCommune,
                  nomEtablissement,
                  telephone,
                  uai,
                  zone,
                }) => [
                  <Tag>{uai}</Tag>,
                  `${libelleAcademie} ${zone ? `- zone ${zone}` : null}`,
                  <>
                    {nomEtablissement}
                    <br />
                    {adresse}, {codePostal}, {nomCommune}
                  </>,
                  <>
                    <a href={`mailto:${mail}`}>{mail}</a>
                    <br />
                    <a href={`tel:${telephone}`}>{telephone}</a>
                  </>,
                  nombreEleves,
                ]
              )}
            />
            {etablissements.pageCount > 1 && (
              <ResultsPagination
                totalPages={etablissements.pageCount}
                currentPage={etablissements.currentPage}
                compact={true}
              />
            )}
          </>
        );
      }}
    </DataSectionServer>
  );
};
