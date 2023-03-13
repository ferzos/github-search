import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { MAX_PAGE_PAGINATION } from "./constants";

import { clamp } from "../../utils";

import style from "./Pagination.module.css";

interface Props {
  currentPage: number
  totalPage: number
}

const getURL = (pageNumber: number) => {
  const newPageUrl = new URL(window.location.toString())
  newPageUrl.searchParams.set('page', String(pageNumber));

  return {
    hash: newPageUrl.hash,
    pathname: newPageUrl.pathname,
    search: newPageUrl.search
  };
}

const Pagination = (props: Props) => {
  const { currentPage, totalPage } = props

  const { replace } = useHistory()

  const [pages, setPages] = useState<number[]>([]);
  useEffect(() => {
    let newPages: number[] = []

    if (Math.abs(totalPage - currentPage) < MAX_PAGE_PAGINATION) {
      for (let index = currentPage - MAX_PAGE_PAGINATION; index <= currentPage; index++) {
        newPages.push(index)
      }
    } else {
      for (let index = currentPage; index < currentPage + clamp(totalPage, MAX_PAGE_PAGINATION); index++) {
        newPages.push(index)
      }
    }

    setPages(newPages)
  }, [currentPage, pages.length, totalPage]);

  const handleNavigate = (pageNumber: number) => () => {
    replace(getURL(pageNumber));

    window.scrollTo(0, 0)
  }

  const hasNext = currentPage < totalPage

  return (
    <div className={style.container}>
      {currentPage > 1 && (
        <>
          <div className={style.pageItem} onClick={handleNavigate(1)}>
            {'<<'}
          </div>
          <div className={style.pageItem} onClick={handleNavigate(currentPage - 1)}>
            {'<'}
          </div>
        </>
      )}

      {pages.map((pageNumber) => (
        <div key={pageNumber} className={currentPage === pageNumber ? style.pageItemActive : style.pageItem} onClick={handleNavigate(pageNumber)}>
          {pageNumber}
        </div>
      ))}

      {hasNext && (
        <>
          <div className={style.pageItem}>
            {'...'}
          </div>
          <div className={style.pageItem} onClick={handleNavigate(totalPage)}>
            {totalPage}
          </div>
          <div className={style.pageItem} onClick={handleNavigate(currentPage + 1)}>
            {'>'}
          </div>
          <div className={style.pageItem} onClick={handleNavigate(totalPage)}>
            {'>>'}
          </div>
        </>
      )}
    </div>
  );
};

export default Pagination;