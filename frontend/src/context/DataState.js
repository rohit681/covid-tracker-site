import React, { useState } from "react";
import DataContext from "./DataContext";

const DataState = (props) => {
  const [data, setData] = useState([]);
  const [globalData, setGlobalData] = useState();
  const [filter, setFilter] = useState({ from: "", type: "dsc" });
  const [country, setCountry] = useState("");
  const [from, setFrom] = useState("global");
  const [alert, setAlert] = useState(null);

  const applyFilter = (from) => {
    if (from === "confirm") {
      if (filter.type === "dsc") {
        data.sort((a, b) => {
          return a.TotalConfirmed - b.TotalConfirmed;
        });
        setFilter({ from, type: "asc" });
      } else {
        data.sort((a, b) => {
          return b.TotalConfirmed - a.TotalConfirmed;
        });
        setFilter({ from, type: "dsc" });
      }
    }
    if (from === "active") {
      if (filter.type === "dsc") {
        data.sort((a, b) => {
          return (
            a.TotalConfirmed -
            (a.TotalDeaths + a.TotalRecovered) -
            (b.TotalConfirmed - (b.TotalDeaths + b.TotalRecovered))
          );
        });
        setFilter({ from, type: "asc" });
      } else {
        data.sort((a, b) => {
          return (
            b.TotalConfirmed -
            (b.TotalDeaths + b.TotalRecovered) -
            (a.TotalConfirmed - (a.TotalDeaths + a.TotalRecovered))
          );
        });
        setFilter({ from, type: "dsc" });
      }
    }
    if (from === "recover") {
      if (filter.type === "dsc") {
        data.sort((a, b) => {
          return a.TotalRecovered - b.TotalRecovered;
        });
        setFilter({ from, type: "asc" });
      } else {
        data.sort((a, b) => {
          return b.TotalRecovered - a.TotalRecovered;
        });
        setFilter({ from, type: "dsc" });
      }
    }
    if (from === "deceased") {
      if (filter.type === "dsc") {
        data.sort((a, b) => {
          return a.TotalDeaths - b.TotalDeaths;
        });
        setFilter({ from, type: "asc" });
      } else {
        data.sort((a, b) => {
          return b.TotalDeaths - a.TotalDeaths;
        });
        setFilter({ from, type: "dsc" });
      }
    }
  };

  const getCountryData = async () => {
    let data = await fetch(`https://api.covid19api.com/summary`);
    const parsedData = await data.json();
    setData(parsedData.Countries);
  };

  const getGlobalData = async (url, from) => {
    try {
      let data = await fetch(url);
      const parsedData = await data.json();
      if (parsedData.message) {
        setGlobalData(parsedData);
      } else if (from === "global") {
        setGlobalData(parsedData.Global);
      } else {
        console.log(parsedData[parsedData.length - 1]);
        setGlobalData(parsedData[parsedData.length - 1]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        globalData,
        setGlobalData,
        getCountryData,
        getGlobalData,
        applyFilter,
        from,
        setFrom,
        country,
        setCountry,
        alert,
        setAlert,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataState;
