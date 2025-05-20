export interface Info {
  message: string,
  status: number
}

export interface Pagination {
  page: number;
  totalCount: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;

  nextCursor?: string; // Firebase Case: Para próxima página
  prevCursor?: string; // Firebase Case: Para página anterior
}

export type QueryFilter = Record<string, string[]>
export type QuerySearch = Record<string, string>

export interface FetchParams { // Request del front
  pagination?: Omit<Pagination, 'totalCount' | 'hasNextPage' | 'hasPrevPage'> & { currentCursor?: string, direction?: 'next' | 'prev' };
  filters?: QueryFilter
  search?: QuerySearch
}

export interface Body<T> { // Response del back
  info?: Info
  result?: T
  pagination?: Pagination
}

