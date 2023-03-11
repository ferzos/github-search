import { useState, useEffect, useCallback } from 'react';

import { clamp, getRepoData, PER_PAGE } from '../utils';
import { Repository } from '../types';

interface Params {
  repoName: string;
  setTotalPage: (totalPage: number) => void;
  currentPage: number
}

const MAX_SEARCH = 1000

export const useGetRepoData = (param: Params) => {
  const { repoName, setTotalPage, currentPage} = param

  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [prevCurrPage, setPrevCurrPage] = useState<number | undefined>(currentPage);
  const [prevRepoName, setPrevRepoName] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchRepoName = useCallback(async (currRepoName: string, currPage: number) => {
    try {
      setIsLoading(true);
      
      const response = await getRepoData(currRepoName, currPage)
      const { repositories: repositoriesData, totalCount } = response || {}
  
      if (repositoriesData) {
        setRepositories(repositoriesData)
      }
  
      if (totalCount) {
        setTotalPage(Math.floor((clamp(totalCount, MAX_SEARCH)) / PER_PAGE))
      }
  
      setIsLoading(false);
      setIsError(false)
    } catch (error) {
      console.error(error)
      setIsLoading(false);
      setIsError(true)
    }
  }, [setTotalPage])

  useEffect(() => {
    // Repo name changes
    if (repoName && repoName !== prevRepoName && currentPage === 1) {
      fetchRepoName(repoName, currentPage);
      setPrevRepoName(repoName);
      setPrevCurrPage(currentPage)
      return;
    }

    // Page changes
    if (repoName === prevRepoName && prevCurrPage !== currentPage) {
      fetchRepoName(repoName, currentPage)
      setPrevCurrPage(currentPage);
      return;
    }
  }, [currentPage, fetchRepoName, prevCurrPage, prevRepoName, repoName]);

  return {
    isLoading,
    isError,
    repositories,
  }
}