import React, { useState, useCallback } from 'react';

import { Pagination } from 'shared/view/components';

const steps = [10, 25, 50, 100];

export default function usePagination(items: any[]) {

  const [currentPage, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const from = currentPage * perPage;
  const to = from + perPage;
  const paginatedItems = items.slice(from, to);

  const changePerPage = useCallback((itemPerPage) => {
    setPage(Math.floor(from / itemPerPage));
    setPerPage(itemPerPage);
  }, [currentPage, perPage]);

  const changePage = useCallback((pageNumber) => setPage(pageNumber), []);

  const paginationView = (
    <Pagination
      totalItems={items.length}
      perPage={perPage}
      currentPage={currentPage}
      onChangePerPage={changePerPage}
      onChangePage={changePage}
      paginationSteps={steps}
    />);
  return { items: paginatedItems, paginationView };
}
