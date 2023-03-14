import { useState } from "react";
import { useHistory } from "react-router-dom";

import LoadingGif from "./assets/loading-gif.gif";

import { Pagination, RepoCard, Search } from "./components";
import { usePagination } from "./components/Pagination/hooks/usePagination";

import { useGetRepoData } from "./hooks/useGetRepoData";

import style from "./HomeLayout.module.css";

const HomeLayout = () => {
  const { replace } = useHistory();

  const [totalPage, setTotalPage] = useState(0);
  const { currentPage, showPagination } = usePagination({ totalPage });

  const [repoName, setRepoName] = useState("");
  const { isLoading, isError, repositories } = useGetRepoData({
    repoName,
    currentPage,
    setTotalPage,
  });

  const handleSearchSubmit = (repoName: string) => {
    replace({
      search: "",
    });
    setRepoName(repoName);
  };

  const Content = () => {
    if (isLoading) {
      return (
        <div className={style.loadingContainer}>
          <img
            className={style.loadingImage}
            src={LoadingGif}
            alt="loading"
            width={64}
            height={64}
          />
        </div>
      );
    }

    if (isError) {
      return (
        <div className={style.errorContainer}>
          <h2>Error occurred!</h2>
          <br />
          <h3>Please try again later</h3>
        </div>
      );
    }

    return (
      <>
        <div className={style.resultContainer}>
          {repositories.map(
            ({
              id,
              createdAt,
              description,
              language,
              name,
              owner,
              repoUrl,
            }) => (
              <RepoCard
                key={id}
                avatarUrl={owner.avatar || ""}
                createdAt={createdAt}
                desc={description || ""}
                language={language || ""}
                name={owner.name || ""}
                repoName={name}
                repoUrl={repoUrl}
              />
            )
          )}
        </div>

        {showPagination && (
          <Pagination currentPage={Number(currentPage)} totalPage={totalPage} />
        )}
      </>
    );
  };

  return (
    <div className={style.container}>
      <h2>Search your GitHub Repo!</h2>
      <Search onSearchSubmit={handleSearchSubmit} />

      <Content />
    </div>
  );
};

export default HomeLayout;
