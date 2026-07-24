// types/search.ts

export interface SearchParams {
  query?: string;
  category?: string;
  priceRange?: string;
  page?: string;
}

export interface SearchFilters {
  query: string;
  category: string;
  priceRange: string;
  page: number;
}

export interface SearchResults<T> {
  items: T[];
  totalPages: number;
  totalItems: number;
}

export interface PaginationProps {
  totalPages: number;
}

export interface ProjectSearchProps {
  placeholder?: string;
}