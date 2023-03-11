import { useState } from 'react';

import { RepoCard, Search } from './components';
import { Repository } from './types';
import { getRepoData } from './utils';

import style from "./HomeLayout.module.css";

const HomeLayout = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  
  const handleSearchSubmit = async (repoName: string) => {
    const response = await getRepoData(repoName)
    const { repositories: repositoriesData } = response || {}

    if (repositoriesData) {
      setRepositories(repositoriesData)
    }
  }

  console.log({ repositories })
  
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
    </>
  );
};

export default HomeLayout;