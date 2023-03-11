import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { MAX_PAGE_PAGINATION } from '../constants';

const useQuery = () => {
  const { search } = useLocation();
  
  return useMemo(() => {
    const url = new URL(search, 'https://example.com')

    return url.searchParams.get('page')
  }, [search]);
}

export interface Params {
  totalPage: number
}

export const usePagination = (params: Params) => {
  const { totalPage } = params
  const [currentPage, setCurrentPage] = useState(1);

  const pageQueryString = useQuery();
  useEffect(() => {
    setCurrentPage(pageQueryString ? Number(pageQueryString) : 1)
  }, [pageQueryString]);

  return {
    currentPage,
    totalPage,
    showPagination: Boolean(totalPage) && totalPage > MAX_PAGE_PAGINATION,
  }
}