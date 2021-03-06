import { searchIcon } from "./SearchIcon";

function Search({ searchCountries, searchParams }) {
  return (
    <div className="bg-light-bg dark:bg-dark-bg p-4 text-lg relative font-NSL">
      <input
        className="py-3 pl-14 pr-2 bg-light-element dark:bg-dark-element my-2 w-full rounded text-light-input dark:text-yellow-400 placeholder:text-light-input dark:placeholder:text-yellow-400 shadow-skin"
        type="search"
        name="search"
        placeholder="Search for any country..."
        value={searchParams}
        onChange={(e) => searchCountries(e.target.value)}
      />
      <span className="absolute left-8 top-10 text-light-text dark:text-yellow-400">
        {searchIcon}
      </span>
    </div>
  );
}

export default Search;
