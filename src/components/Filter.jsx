function Filter({ filterByRegion }) {
  return (
    <>
      <select
        name="regions"
        id="select"
        className="my-4 p-2 shadow-skin w-44"
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
    </>
  );
}

export default Filter;
