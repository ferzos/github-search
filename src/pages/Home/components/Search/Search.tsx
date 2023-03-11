import { ChangeEvent, useCallback, useEffect, useState } from "react";
import style from "./Search.module.css";

import { debounce } from "../../utils";

interface Props {
  onSearchSubmit: (repoName: string) => void
}

const Search = (props: Props) => {
  const { onSearchSubmit } = props
  const [searchInput, setSearchInput] = useState('');

  const searchRepo = useCallback(debounce<string>((searchInput) => {
    if (searchInput) {
      onSearchSubmit(searchInput)
    }
    }, 500), [])

  useEffect(() => {
    if (searchInput !== '') {
      searchRepo(searchInput)
    }
  }, [searchInput, searchRepo]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: input } = e.target
    setSearchInput(input)
  }

  return (
    <div className={style.searchContainer}>
      <input className={style.searchBar} type="text" name="Input a Github Repository" value={searchInput} onChange={handleInputChange} />
    </div>
  );
};

export default Search;