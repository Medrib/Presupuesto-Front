import { FilterSearchSortRequest } from "./filter-search-sort-request";
import { PagingDataRequest } from "./paging-data-request";

export interface SearchRequest {
    excludeCount? : boolean;
    filterSearchSort?: FilterSearchSortRequest;
    pagingDataRequest? : PagingDataRequest;
}
