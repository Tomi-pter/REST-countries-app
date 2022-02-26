import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Country() {
  const [country, setCountry] = useState([]);
  const { capital } = useParams();

  const fetchCountry = async () => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/capital/${capital}`
      );
      const data = await response.json();
      setCountry(data);
      console.log(data);
    } catch {
      console.log("Fetch request failed");
    }
  };

  useEffect(() => {
    fetchCountry();
  }, []);

  const paraDetails = (detail) => {
    let obj = "";
    for (let i = 0; i < Object.values(detail).length; i++) {
      obj = Object.values(detail).map((data) => {
        return (data += ", ");
      });
      return obj;
    }
  };

  return (
    <>
      <Link to={`/`}>
        <button className="my-4 px-2">Back</button>
      </Link>
      <section>
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
              <article key={name.official}>
                <img src={flags.svg} alt="" />
                <h2>{name.official}</h2>
                <p>Native Name: {Object.values(name.nativeName)[0].official}</p>
                <p>Population: {population}</p>
                <p>Region: {region}</p>
                <p>Sub Region: {subregion}</p>
                <p>Capital: {capital}</p>
                <p>Top Level Domain: {tld}</p>
                <div>
                  Currencies:{" "}
                  {Object.values(currencies).map(({ name }) => {
                    return (
                      <p key={name} className="inline-block pr-1">
                        {name},
                      </p>
                    );
                  })}
                </div>
                <p>Languages: {paraDetails(languages)}</p>
              </article>
            );
          }
        )}
      </section>
    </>
  );
}

export default Country;
