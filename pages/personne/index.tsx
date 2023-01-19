import { GetServerSideProps } from 'next';
import React, { ReactElement } from 'react';
import ButtonLink from '#components-ui/button';
import { HorizontalSeparator } from '#components-ui/horizontal-separator';
import { Layout } from '#components/layout';
import Meta from '#components/meta';
import ResultsList from '#components/search-results/results-list';
import PageCounter from '#components/search-results/results-pagination';
import StructuredDataSearchAction from '#components/structured-data/search';
import { IEtatCivil } from '#models/immatriculation/rncs';
import search, { ISearchResults } from '#models/search';
import SearchFilterParams, { IParams } from '#models/search-filter-params';
import { parseIntWithDefaultValue } from '#utils/helpers';
import {
  IPropsWithMetadata,
  postServerSideProps,
} from '#utils/server-side-props-helper/post-server-side-props';
import { NextPageWithLayout } from 'pages/_app';

interface IProps extends IPropsWithMetadata {
  results: ISearchResults;
  personne: IEtatCivil;
  searchParams: IParams;
  sirenFrom: string;
}

const SearchDirigeantPage: NextPageWithLayout<IProps> = ({
  results,
  metadata,
  searchParams,
  sirenFrom,
}) => (
  <>
    <Meta
      title="Rechercher une entreprise"
      canonical="https://annuaire-entreprises.data.gouv.fr"
    />
    <div className="content-container">
      <StructuredDataSearchAction />
      {sirenFrom && (
        <a href={`/dirigeants/${sirenFrom}`}>
          ← Retourner à la page précédente
        </a>
      )}
      <h1>
        Liste des structures associées à {searchParams.fn} {searchParams.n}
        {searchParams.ageMax || searchParams.ageMin
          ? ` (${searchParams.ageMax || searchParams.ageMin} ans)`
          : ''}
      </h1>
      <span>
        {results.currentPage > 1 && `Page ${results.currentPage} de `}
        {results.resultCount} résultats trouvés.
      </span>
      <ResultsList results={results.results} searchTerm="" />
      {results.pageCount > 0 && (
        <PageCounter
          totalPages={results.pageCount}
          searchTerm=""
          currentPage={results.currentPage}
          searchFilterParams={searchParams}
        />
      )}
      <HorizontalSeparator />
      <div>
        <b>Il manque une structure ?</b>
        <br />
        Certaines structures n’ont pas d’âge enregistré pour leur(s)
        dirigeant(s) et peuvent ne pas apparaître sur cette page. Pour les
        retrouver, vous pouvez élargir la recherche à toutes les structures
        liées à une personne appelée «&nbsp;{searchParams.fn} {searchParams.n}
        &nbsp;», sans filtre d’âge.
      </div>
      <br />
      <div className="layout-center">
        <ButtonLink
          alt
          small
          to={`/rechercher?fn=${searchParams.fn}&n=${searchParams.n}`}
        >
          → lancer une recherche élargie « {searchParams.fn} {searchParams.n} »
        </ButtonLink>
      </div>
      <br />
    </div>
  </>
);

export const getServerSideProps: GetServerSideProps = postServerSideProps(
  async (context) => {
    // get params from query string
    const searchTerm = (context.query.terme || '') as string;
    const pageParam = (context.query.page || '') as string;
    const sirenFrom = (context.query.sirenFrom || '') as string;
    const page = parseIntWithDefaultValue(pageParam, 1);
    const searchFilterParams = new SearchFilterParams(context.query);
    const results = await search(searchTerm, page, searchFilterParams);

    const searchParams = searchFilterParams.toJSON();

    return {
      props: {
        results,
        searchParams,
        sirenFrom,
      },
    };
  }
);

SearchDirigeantPage.getLayout = function getLayout(
  page: ReactElement,
  isBrowserOutdated
) {
  return (
    <Layout
      isBrowserOutdated={isBrowserOutdated}
      searchBar
      useAdvancedSearch={false}
    >
      {page}
    </Layout>
  );
};

export default SearchDirigeantPage;
