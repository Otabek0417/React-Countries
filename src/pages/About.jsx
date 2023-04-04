import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../Hooks/useFetch";
import { useParams } from "react-router-dom";
function About() {
  const { id } = useParams();
  console.log(id);
  const url = "https://restcountries.com/v3.1/alpha/" + id;
  const { data, isPending, error } = useFetch(url);
  console.log(data);
  if (isPending) {
    return (
      <div className="loader">
        <div className="lds-roller ">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>{error}</h1>
      </div>
    );
  }
  return (
    <div className="container">
      <Link className="btn" to="/">
        ← Back
      </Link>

      {data &&
        data.map((item) => {
          const {
            flags: { svg },
            name,
            population,
            region,
            subregion,
            capital,
            tld,
            currencies,
            languages,
            borders,
          } = item;
          return (
            <div className="about-context">
              <img className="country-img" src={svg} alt="" />

              <div className="intro-content">
                <h2 className="intro-title">{name.common}</h2>
                <div className="intro-wrapper">
                  <div className="text-wrapper-left">
                    <p>
                      <b>Native name: </b> {name.official}
                    </p>
                    <p>
                      <b>Population: </b> {population}
                    </p>
                    <p>
                      <b>Region: </b> {region}
                    </p>
                    <p>
                      <b>Sub Region: </b> {subregion}
                    </p>
                    <p>
                      <b>Capital: </b> {capital}
                    </p>
                  </div>

                  <div className="text-wrapper-right">
                    <p>
                      <b>Top Level Domain: </b> {tld}
                    </p>
                    <p>
                      <b>Currencies: </b> {Object.keys(currencies)}
                    </p>
                    <p>
                      <b>Languages: </b> {`${Object.values(languages)},`}
                    </p>
                  </div>
                  <div className="borders">
                    <b>Border Countries: </b>
                    {borders
                      ? borders.map((border) => {
                          return (
                            <Link
                              to={`/about/${border}`}
                              className="border-country"
                            >
                              {border}
                            </Link>
                          );
                        })
                      : " NO BORDERS"}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default About;
