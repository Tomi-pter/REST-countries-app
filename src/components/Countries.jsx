import Search from "./Search";
import Filter from "./Filter";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Countries() {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [byRegion, setByRegion] = useState([]);
  const [searchParams, setSearchParams] = useState("");

  const fetchCountries = async () => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/all`);
      const data = await response.json();
      const sortByName = data.slice(0).sort((a, b) => {
        let x = a.name.official.toLowerCase();
        let y = b.name.official.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      });
      setCountries(sortByName);
      console.log(data);
      console.log(sortByName);
    } catch {
      console.log("Error fetching data");
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const searchCountries = (input) => {
    setSearchParams(input);

    if (searchParams) {
      const filteredCountries = countries.filter((filter) => {
        return Object.values(filter)
          .join("")
          .toLowerCase()
          .includes(input.toLowerCase());
      });
      setFiltered(filteredCountries);
    } else {
      setFiltered(countries);
    }
  };

  const filterByRegion = async (region) => {
    const response = await fetch(
      `https://restcountries.com/v3.1/region/${region}`
    );
    const data = await response.json();
    setByRegion(data);
    console.log(region);
    console.log(data);
  };

  useEffect(() => {
    byRegion && setCountries(byRegion);
  }, [byRegion]);

  return (
    <>
      <Search searchCountries={searchCountries} searchParams={searchParams} />
      <Filter filterByRegion={filterByRegion} />

      {searchParams.length > 0 ? (
        <section className="grid grid-cols-1 gap-5 py-5 px-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 2xl:container 2xl:mx-auto bg-light-bg dark:bg-dark-bg">
          {filtered.map(({ name, flags, population, region, capital }) => {
            return (
              <Link key={name.official} to={`/${capital}`}>
                <section className="rounded-lg shadow-sm overflow-hidden bg-light-element">
                  <img src={flags.svg} alt="" className="overflow-hidden" />
                  <h2 className="font-NSSB py-4 px-4">{name.official}</h2>
                  <p className="px-4">
                    <span className="font-NSSB">Population:</span> {population}
                  </p>
                  <p className="px-4">
                    <span className="font-NSSB">Region:</span> {region}
                  </p>
                  <p className="px-4 pb-4">
                    <span className="font-NSSB">Capital:</span> {capital}
                  </p>
                </section>
              </Link>
            );
          })}
        </section>
      ) : (
        <section className="grid grid-cols-1 gap-5 py-5 px-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 2xl:container 2xl:mx-auto bg-light-bg dark:bg-dark-bg">
          {countries.map(({ name, flags, population, region, capital }) => {
            return (
              <Link key={name.official} to={`/${capital}`}>
                <section className="rounded-lg shadow-sm overflow-hidden bg-light-element">
                  <img src={flags.svg} alt="" className="overflow-hidden" />
                  <h2 className="font-NSSB py-4 px-4">{name.official}</h2>
                  <p className="px-4">
                    <span className="font-NSSB">Population:</span> {population}
                  </p>
                  <p className="px-4">
                    <span className="font-NSSB">Region:</span> {region}
                  </p>
                  <p className="px-4 pb-4">
                    <span className="font-NSSB">Capital:</span> {capital}
                  </p>
                </section>
              </Link>
            );
          })}
        </section>
      )}
    </>
  );
}

export default Countries;
