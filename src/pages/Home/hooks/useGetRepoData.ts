import { useState, useEffect, useCallback } from 'react';

import { getRepoData } from '../utils';
import { Repository } from '../types';

interface Params {
  repoName: string;
  setTotalCount: (totalCount: number) => void;
  currentPage: number
}

export const useGetRepoData = (param: Params) => {
  const { repoName, setTotalCount, currentPage} = param

  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [prevCurrPage, setPrevCurrPage] = useState<number | undefined>(currentPage);
  const [prevRepoName, setPrevRepoName] = useState<string | undefined>();

  const fetchRepoName = useCallback(async (currRepoName: string, currPage: number) => {
    const response = await getRepoData(currRepoName, currPage)
    const { repositories: repositoriesData, totalCount: totalCountData } = response || {}

    if (repositoriesData) {
      setRepositories(repositoriesData)
    }

    if (totalCountData) {
      setTotalCount(totalCountData)
    }
  }, [])

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
    repositories,
  }
}