import Filter from "./Filter";
import { searchIcon } from "./SearchIcon";

function Search() {
  return (
    <div className="bg-light-bg dark:bg-dark-bg p-4 text-sm relative font-NSL">
      <input
        className="py-3 pl-14 pr-2 bg-light-element dark:bg-dark-element my-2 w-full rounded text-light-text dark:text-dark-text placeholder:text-light-text dark:placeholder:text-dark-text shadow-skin"
        type="search"
        name="search"
        placeholder="Search for any country..."
      />
      <button type="submit" className="absolute left-8 top-9">
        {searchIcon}
      </button>
      <Filter />
    </div>
  );
}

export default Search;
