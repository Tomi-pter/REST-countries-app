function Filter({ filterByRegion }) {
  return (
    <div className="bg-light-bg dark:bg-dark-bg text-sm relative font-NSL">
      <select
        name="regions"
        id="select"
        className="my-4 ml-5 p-2 shadow-skin w-44 "
        defaultValue="Filter by Region"
        onChange={(e) => filterByRegion(e.target.value)}
      >
        <option value="Filter by Region" disabled>
          Filter by Region
        </option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
}

export default Filter;
