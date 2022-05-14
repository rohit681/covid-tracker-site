import React, { useContext, useEffect } from "react";
import DataContext from "../context/DataContext";
import CountryList from "./CountryList";

export default function Body() {
  const context = useContext(DataContext);
  const { globalData, getGlobalData, setFrom, from } = context;

  useEffect(() => {
    setFrom("global");
    getGlobalData(`https://api.covid19api.com/summary`, "global");
  }, []);

  if (!globalData) {
    return (
      <div className="container" style={{ color: "black" }}>
        <div
          className="spinner-border my-3"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="visually-hidden" style={{ color: "black" }}>
            Loading...!!!
          </span>
        </div>
      </div>
    );
  }
  if (globalData && globalData.message) {
    return (
      <div className="text-danger mx-5">
        <h2>Not found...!!</h2>
      </div>
    );
  }
  return (
    <div>
      <div
        className="d-flex flex-wrap justify-content-center fw-bold"
        style={{ color: "black" }}
      >
        <div
          className="card my-5 mx-5 shadow-lg p-3 mb-5 bg-body rounded"
          style={{
            width: "250px",
            height: "250px",
            transition: "all 0.4 ease 0s",
          }}
        >
          <div className="card-body" style={{ display: "contents" }}>
            Confirmed
          </div>
          <h5 className="card-title my-3 mx-2 fw-bold fs-5">
            {from === "global" ? (
              <span className="text-danger">{globalData.TotalConfirmed}</span>
            ) : (
              <span className="text-danger">{globalData.Confirmed}</span>
            )}
          </h5>
          <p className="card-text text-dark">
            {globalData.Date.slice(0, 10)}
            <br />
            <strong>Number of Confirmed Cases of </strong>
            Covid-19
          </p>
        </div>

        <div
          className="card my-5 mx-5 shadow-lg p-3 mb-5 bg-body rounded"
          style={{ width: "250px", height: "250px" }}
        >
          <div className="card-body" style={{ display: "contents" }}>
            Active
          </div>
          <h5 className="card-title my-3 mx-2 fw-bold fs-5">
            {from === "global" ? (
              <span className="text-primary">
                {" "}
                {globalData.TotalConfirmed -
                  (globalData.TotalDeaths + globalData.TotalRecovered)}
              </span>
            ) : (
              <span className="text-primary">{globalData.Active}</span>
            )}
          </h5>
          <p className="card-text text-dark">
            {globalData.Date.slice(0, 10)}
            <br />
            <strong>Number of Active Cases of </strong>
            Covid-19
          </p>
        </div>

        <div
          className="card my-5 mx-5 shadow-lg p-3 mb-5 bg-body rounded"
          style={{ width: "250px", height: "250px" }}
        >
          <div className="card-body" style={{ display: "contents" }}>
            Recovered
          </div>
          <h5 className="card-title my-3 mx-2 fw-bold fs-5">
            {from === "global" ? (
              <span className="text-success">{globalData.TotalRecovered}</span>
            ) : (
              <span className="text-success">{globalData.Recovered}</span>
            )}
          </h5>
          <p className="card-text text-dark">
            {globalData.Date.slice(0, 10)}
            <br />
            <strong>Number of Recoveries from </strong>
            Covid-19
          </p>
        </div>

        <div
          className="card my-5 mx-5 shadow-lg p-3 mb-5 bg-body rounded"
          style={{ width: "250px", height: "250px" }}
        >
          <div className="card-body" style={{ display: "contents" }}>
            Deceased
          </div>
          <h5 className="card-title my-3 mx-2 fw-bold fs-5">
            {from === "global" ? (
              <span className="text-secondary">{globalData.TotalDeaths}</span>
            ) : (
              <span className="text-secondary">{globalData.Deaths}</span>
            )}
          </h5>
          <p className="card-text text-dark">
            {globalData.Date.slice(0, 10)}
            <br />
            <strong>Number of Deaths caused by </strong>
            Covid-19
          </p>
        </div>
      </div>
      <CountryList />
    </div>
  );
}
