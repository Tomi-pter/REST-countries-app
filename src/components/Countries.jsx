import Search from "./Search";
import Filter from "./Filter";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import loader from "../loader/loader.gif";

function Countries() {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [byRegion, setByRegion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState("");
  const [plus50, setPlus50] = useState([0, 50]);
  const [disabled, setDisabled] = useState(false);

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
      setLoading(false);
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
      setLoading(false);
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
      setLoading(false);
    }
    console.log(region);
  };

  useEffect(() => {
    byRegion && setCountries(byRegion);
  }, [byRegion]);

  const populationToLocale = (input) => {
    return input.toLocaleString();
  };

  const setUrl = (capital) => {
    let url = new URL(
      `/${capital}`,
      "https://tomi-know-your-countries.netlify.app"
    );
    return url;
  };

  const loadMore = () => {
    setPlus50([0, plus50[1] + 50]);
    plus50[1] >= 199 && setDisabled(true);
  };

  return (
    <div className="bg-light-bg dark:bg-dark-bg min-h-screen pb-5">
      <section className="md:flex justify-between pt-7 mr-5 2xl:container 2xl:mx-auto">
        <Search searchCountries={searchCountries} searchParams={searchParams} />
        <Filter filterByRegion={filterByRegion} />
      </section>

      {loading ? (
        <main className="min-h-screen flex flex-col justify-start items-center pt-32">
          <img src={loader} alt="loading..." />
          <h1 className="font-NSEB pt-2">???????????????????????...</h1>
        </main>
      ) : searchParams.length > 0 ? (
        filtered.length > 0 ? (
          <main className="grid grid-cols-1 gap-12 py-5 px-12 sm:px-24 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 2xl:container 2xl:mx-auto ">
            {filtered.map(({ name, flags, population, region, capital }) => {
              return (
                <Link key={name.official} to={`${setUrl(capital).pathname}`}>
                  <section className="rounded-lg shadow-sm overflow-hidden bg-light-element dark:bg-dark-element text-light-text dark:text-dark-text transition-transform ease-in-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none">
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
          <main className="flex justify-center items-center min-h-[70vh]">
            <h2 className="mx-4 uppercase font-NSEB text-2xl text-light-text dark:text-dark-text">
              No countries match your search
            </h2>
          </main>
        )
      ) : (
        <main className="grid grid-cols-1 gap-12 py-5 px-12 sm:px-24 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 2xl:container 2xl:mx-auto">
          {countries
            .slice(plus50[0], plus50[1])
            .map(({ name, flags, population, region, capital }) => {
              return (
                <Link key={name.official} to={`${setUrl(capital).pathname}`}>
                  <section className="rounded-lg shadow-sm overflow-hidden bg-light-element dark:bg-dark-element text-light-text dark:text-dark-text transition-transform ease-in-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none">
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
      <button
        onClick={loadMore}
        disabled={disabled}
        className="block mx-auto my-4 border-1 py-1 px-4 shadow-md font-NSL overflow-hidden bg-light-element dark:bg-dark-element text-light-text dark:text-dark-text transition-transform ease-in-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none disabled:transform-none"
      >
        More
      </button>
    </div>
  );
}

export default Countries;
