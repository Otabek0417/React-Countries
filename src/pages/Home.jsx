import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../Hooks/useFetch";
import Filter from "./Filter";
function Home() {
  const url = "https://restcountries.com/v3.1/all";
  const { data, isPending, error, filterCountry, categories,selectCategories } = useFetch(url);
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
    <div>
      <Filter filterCountry={filterCountry} categories={categories} selectCategories={selectCategories} />
      <div className="container home-container">
        <div className="cards-container">
          {data &&
            data.map((country, i) => {
              const { name, population, flags, region, capital, cca3 } =
                country;
              return (
                <Link key={i} className="card" to={`/about/${cca3}`}>
                  <img className="card-img" src={`${flags.png}`} alt="" />
                  <div className="card-body ">
                    <h5 className="card-title">{name.common}</h5>
                    <p>
                      <b>Population:</b> {population}
                    </p>
                    <p>
                      <b>Region:</b> {region}
                    </p>
                    <p>
                      <b>Capital:</b> {capital ? capital : "No capital"}
                    </p>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Home;
