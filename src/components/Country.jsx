import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { LeftArrow } from "./LeftArrow";

function Country() {
  const [country, setCountry] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/capital/${name}`
        );
        const data = await response.json();
        setCountry(data);
        console.log(data);
      } catch {
        console.log("Fetch request failed");
      }
    };
    fetchCountry();
  }, [name]);

  const paraDetails = (detail) => {
    let obj = "";
    for (let i = 0; i < Object.values(detail).length; i++) {
      obj = Object.values(detail).map((data) => {
        return (data += ", ");
      });
      return obj;
    }
  };

  const populationToLocale = (input) => {
    return input.toLocaleString();
  };

  return (
    <div className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text min-h-screen ">
      <section className="2xl:container 2xl:mx-auto">
        <Link to={`/`}>
          <button className="my-5 ml-12 py-1 px-6 rounded shadow-skin text-base bg-light-element dark:bg-dark-element">
            {LeftArrow} Back
          </button>
        </Link>
        {country.map(
          ({
            name,
            flags,
            population,
            region,
            subregion,
            capital,
            tld,
            currencies,
            languages,
            borders,
          }) => {
            return (
              <article
                key={name.official}
                className="text-base mt-10 py-4 px-10 md:flex gap-20 md:justify-around "
              >
                <div className="md:w-[40%]">
                  <img src={flags.svg} alt="" className="mb-10" />
                </div>
                <section>
                  <h1 className="font-NSEB text-xl pb-6">{name.official}</h1>
                  <section className="md:flex md:justify-between gap-10 mb-10">
                    <div>
                      <p>
                        <span className="font-NSSB">Native Name:</span>{" "}
                        {Object.values(name.nativeName)[0].official}
                      </p>
                      <p>
                        <span className="font-NSSB">Population:</span>{" "}
                        {populationToLocale(population)}
                      </p>
                      <p>
                        <span className="font-NSSB">Region:</span> {region}
                      </p>
                      <p>
                        <span className="font-NSSB">Sub Region:</span>{" "}
                        {subregion}
                      </p>
                      <p>
                        <span className="font-NSSB">Capital:</span> {capital}
                      </p>
                    </div>
                    <div>
                      <p className="pt-6">
                        <span className="font-NSSB">Top Level Domain: </span>{" "}
                        {tld}
                      </p>
                      <div>
                        <span className="font-NSSB">Currencies: </span>
                        {Object.values(currencies).map(({ name, symbol }) => {
                          return (
                            <p key={name} className="inline-block pr-1">
                              {name} ({symbol}),
                            </p>
                          );
                        })}
                      </div>
                      <p>
                        <span className="font-NSSB">Languages: </span>{" "}
                        {paraDetails(languages)}
                      </p>
                    </div>
                  </section>
                  <div className="py-6 lg:inline">
                    <span className="font-NSSB">Border Countries: </span>
                    {borders ? (
                      <div className="flex justify-center">
                        {Object.values(borders).map((value) => {
                          return (
                            <span
                              key={value}
                              className="my-4 mx-2 py-1 px-2 rounded shadow-skin text-base bg-light-element dark:bg-dark-element "
                            >
                              <p>{value}</p>
                            </span>
                          );
                        })}
                      </div>
                    ) : (
                      <span className="inline">None</span>
                    )}
                  </div>
                </section>
              </article>
            );
          }
        )}
      </section>
    </div>
  );
}

export default Country;
