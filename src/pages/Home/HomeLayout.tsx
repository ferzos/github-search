import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Pagination, RepoCard, Search } from './components';
import { usePagination } from './components/Pagination/hooks/usePagination';

import { useGetRepoData } from './hooks/useGetRepoData';

import style from "./HomeLayout.module.css";

const HomeLayout = () => {
  const { replace } = useHistory()
  
  const [totalCount, setTotalCount] = useState<number>(0);
  const { currentPage, totalPage, showPagination } = usePagination({ totalPage: totalCount,  });
  
  const [repoName, setRepoName] = useState('');
  const { repositories } = useGetRepoData({ repoName, currentPage, setTotalCount })

  const handleSearchSubmit = (repoName: string) => {
    replace({
      search: ''
    })
    setRepoName(repoName)
  }

  return (
    <>
      <Search onSearchSubmit={handleSearchSubmit} />
      
      <div className={style.resultContainer}>
        {repositories.map(({ createdAt,description, language, name, owner, repoUrl }) => (
          <RepoCard
            avatarUrl={owner.avatar || ''}
            createdAt={createdAt}
            desc={description || ''}
            language={language || ''}
            name={owner.name || ''}
            repoName={name}
            repoUrl={repoUrl}
          />
        ))}
      </div>

      {showPagination && <Pagination currentPage={Number(currentPage)} totalPage={totalPage} />}
    </>
  );
};

export default HomeLayout;