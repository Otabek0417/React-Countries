import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [mainData, setMainData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  console.log(mainData);
  useEffect(() => {
    const getData = async () => {
      setIsPending(true);
      try {
        const req = await fetch(url);
        if (!req.ok) {
          throw new Error(req.statusText);
        }
        const data = await req.json();
        setMainData(data);
        setData(data);
        setIsPending(false);
        setCategories([
          "All",
          ...new Set(
            data.map((country) => {
              return country.region;
            })
          ),
        ]);
      } catch (err) {
        console.log(err.message);
        setIsPending(false);
        setError(err.message);
      }
    };
    getData();
  }, [url]);

  // Filter
  const filterCountry = (name) => {
    console.log(name);
    if (name.trim()) {
      const filteredData = mainData.filter((item) => {
        const newCountry = item.name.common.toLowerCase();
        return newCountry.includes(name.toLowerCase());
      });
      setData(filteredData);
    }
  };
  // Select
  const selectCategories = (category) => {
    if (category !== "All") {
      const selectFilter = mainData.filter((country) => {
        return country.region === category;
      });
      setData(selectFilter);
    } else {
      setData(mainData);
    }
  };
  return {
    data,
    error,
    isPending,
    filterCountry,
    categories,
    selectCategories,
  };
};

export { useFetch };
