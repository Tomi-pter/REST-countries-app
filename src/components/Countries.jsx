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
        let x = a.name.common.toLowerCase();
        let y = b.name.common.toLowerCase();
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
        return JSON.stringify(filter)
          .toLowerCase()
          .includes(input.toLowerCase());
      });
      setFiltered(filteredCountries);
    } else {
      setFiltered(countries);
    }
  };

  const filterByRegion = async (region) => {
    if (region === "all") {
      fetchCountries();
    } else {
      const response = await fetch(
        `https://restcountries.com/v3.1/region/${region}`
      );
      const data = await response.json();
      const sortByName = data.slice(0).sort((a, b) => {
        let x = a.name.common.toLowerCase();
        let y = b.name.common.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      });
      setByRegion(sortByName);
    }
    console.log(region);
  };

  useEffect(() => {
    byRegion && setCountries(byRegion);
  }, [byRegion]);

  const populationToLocale = (input) => {
    return input.toLocaleString();
  };

  const setUrl = (name) => {
    let url = new URL(
      `/${name}`,
      "https://tomi-know-your-countries.netlify.app"
    );
    return url;
  };

  return (
    <div className="bg-light-bg dark:bg-dark-bg min-h-screen">
      <section className="md:flex justify-between mr-5 2xl:container 2xl:mx-auto">
        <Search searchCountries={searchCountries} searchParams={searchParams} />
        <Filter filterByRegion={filterByRegion} />
      </section>

      {searchParams.length > 0 ? (
        filtered.length > 0 ? (
          <main className="grid grid-cols-1 gap-12 py-5 px-12 sm:px-24 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 2xl:container 2xl:mx-auto ">
            {filtered.map(({ name, flags, population, region, capital }) => {
              return (
                <Link key={name.official} to={setUrl(capital).href}>
                  <section className="rounded-lg shadow-sm overflow-hidden bg-light-element dark:bg-dark-element text-light-text dark:text-dark-text">
                    <div className="h-32">
                      <img
                        src={flags.svg}
                        alt="country flag"
                        className="object-cover h-32 w-full"
                      />
                    </div>
                    <h2 className="font-NSSB py-4 px-4">{name.common}</h2>
                    <p className="px-4">
                      <span className="font-NSSB">Population:</span>{" "}
                      {populationToLocale(population)}
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
          </main>
        ) : (
          <main className="flex justify-center">
            <h2 className="uppercase">No countries match your search</h2>
          </main>
        )
      ) : (
        <main className="grid grid-cols-1 gap-12 py-5 px-12 sm:px-24 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 2xl:container 2xl:mx-auto ">
          {countries.map(({ name, flags, population, region, capital }) => {
            return (
              <Link key={name.official} to={`/${setUrl(capital).href}`}>
                <section className="rounded-lg shadow-sm overflow-hidden bg-light-element dark:bg-dark-element text-light-text dark:text-dark-text">
                  <div className="h-32">
                    <img
                      src={flags.svg}
                      alt="country flag"
                      className="object-cover h-32 w-full"
                    />
                  </div>
                  <h2 className="font-NSSB p-4">{name.common}</h2>
                  <p className="px-4">
                    <span className="font-NSSB">Population:</span>{" "}
                    {populationToLocale(population)}
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
        </main>
      )}
    </div>
  );
}

export default Countries;
