import React, { useContext, useEffect } from "react";
import dataContext from "../context/DataContext";
import Charts from "./Charts";

function CountryList() {
  const context = useContext(dataContext);
  const { data, getCountryData, applyFilter, globalData, country } = context;

  useEffect(() => {
    getCountryData();
  }, []);
  if (country && localStorage.getItem("token")) {
    return (
      <>
        <Charts />
      </>
    );
  } else {
    return (
      <div className="mx-5">
        <table className="table table-borderless">
          <thead style={{ position: "sticky", top: "0px", zIndex: "1" }}>
            <tr className="table-secondary">
              <th scope="col">Countries</th>
              <th
                scope="col"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  applyFilter("confirm");
                }}
              >
                <span className="text-danger">Confirmed</span>
              </th>
              <th
                scope="col"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  applyFilter("active");
                }}
              >
                <span className="text-primary">Active</span>
              </th>
              <th
                scope="col"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  applyFilter("recover");
                }}
              >
                <span className="text-success">Recovered</span>
              </th>
              <th
                scope="col"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  applyFilter("deceased");
                }}
              >
                <span className="text-secondary">Deceased</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((countries) => {
              return (
                <tr key={countries.ID}>
                  <th scope="row">{countries.Country}</th>
                  <td>{countries.TotalConfirmed}</td>
                  <td>
                    {countries.TotalConfirmed -
                      (countries.TotalDeaths + countries.TotalRecovered)}
                  </td>
                  <td>{countries.TotalRecovered}</td>
                  <td>{countries.TotalDeaths}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CountryList;
