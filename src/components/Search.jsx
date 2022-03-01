import { searchIcon } from "./SearchIcon";

function Search({ searchCountries, searchParams }) {
  return (
    <div className="bg-light-bg dark:bg-dark-bg p-4 text-sm relative font-NSL">
      <input
        className="py-3 pl-14 pr-2 bg-light-element dark:bg-dark-element my-2 w-full rounded text-light-input dark:text-dark-text placeholder:text-light-text dark:placeholder:text-dark-text shadow-skin"
        type="search"
        name="search"
        placeholder="Search for any country..."
        value={searchParams}
        onChange={(e) => searchCountries(e.target.value)}
      />
      <button className="absolute left-8 top-9 text-light-text dark:text-dark-text">
        {searchIcon}
      </button>
    </div>
  );
}

export default Search;
