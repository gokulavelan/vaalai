export interface MetaState {
    currentPage: number;
    lastPage: number;
    perPage: number;
    totalRecords: number;
    nextPageUrl: string | null;
    prevPageUrl: string | null;
}
