import Search from "./Search";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Countries() {
  const [countries, setCountries] = useState([]);

  const fetchCountries = async () => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/all`);
      const data = await response.json();
      setCountries(data);
      console.log(data);
    } catch {
      console.log("Error fetching data");
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <>
      <Search />
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
    </>
  );
}

export default Countries;
