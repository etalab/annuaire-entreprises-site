import SearchFilters from '#components/advanced-search/search-filters';
import { buildSearchQuery, IParams } from '#models/search-filter-params';
import MapOrListSwitch from './map-or-list';

interface IProps {
  searchParams: IParams;
  currentSearchTerm: string;
  isMap: boolean;
}

export const AdvancedSearch: React.FC<IProps> = ({
  searchParams = {},
  currentSearchTerm = '',
  isMap = false,
}) => (
  <div id="search-filters-container">
    <div className="fr-container">
      <SearchFilters
        searchParams={searchParams}
        searchTerm={currentSearchTerm}
      />
      <div className="map-switch">
        <MapOrListSwitch
          isMap={isMap}
          query={buildSearchQuery(currentSearchTerm, searchParams)}
        />
      </div>
    </div>
    <style jsx>{`
      #search-filters-container {
        background-color: #f6f6f6;
      }

      #search-filters-container > .fr-container {
        display: flex;
        justify-content: start;
        align-items: center;
        flex-wrap: wrap;
      }

      .map-switch {
        flex-grow: 1;
        text-align: right;
      }
    `}</style>
  </div>
);
