import MapWithResults from '#components/map/map-results';
import { ISearchResults } from '#models/search';
import { IParams } from '#models/search-filter-params';
import ResultsCounter from '../results-counter';
import ResultsList from '../results-list';
import ResultsPagination from '../results-pagination';
import { BadParams } from '../results-problems/bad-params';
import { NotEnoughParams } from '../results-problems/results-not-enough-params';
import styles from './style.module.css';

const SearchResultsMap: React.FC<{
  searchTerm?: string;
  results: ISearchResults;
  searchFilterParams?: IParams;
}> = ({ results, searchTerm = '', searchFilterParams = {} }) => {
  const height = 'calc(100vh - 280px)';

  if (searchTerm && results.notEnoughParams) {
    return (
      <div className="fr-container">
        <NotEnoughParams />
      </div>
    );
  }
  if (results.notEnoughParams) {
    return <MapWithResults results={results} height={height} />;
  }
  if (results.badParams) {
    return (
      <div className="fr-container">
        <BadParams />
      </div>
    );
  }

  if (!results.results || results.results.length === 0) {
    return (
      <ResultsCounter
        resultCount={results.resultCount}
        currentPage={results.currentPage}
      />
    );
  }

  return (
    <>
      <div className={styles['map-container']} style={{ height: height }}>
        <MapWithResults results={results} height={height} />
        <div className={styles['results-for-map-wrapper']}>
          <ResultsList
            results={results.results}
            shouldColorZipCode={!!searchFilterParams.cp_dep}
          />
        </div>
      </div>
      <div className={styles['results-footer-wrapper']}>
        <div className="fr-container">
          <ResultsCounter
            resultCount={results.resultCount}
            currentPage={results.currentPage}
          />
          <ResultsPagination
            totalPages={results.pageCount}
            currentPage={results.currentPage}
            searchTerm={searchTerm}
            compact={true}
            searchFilterParams={searchFilterParams}
          />
        </div>
      </div>
    </>
  );
};

export default SearchResultsMap;
