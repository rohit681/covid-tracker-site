import React, { useContext } from "react";
import DataContext from "../context/DataContext";
import { Link, useNavigate } from "react-router-dom";

function Background() {
  const context = useContext(DataContext);
  const { getGlobalData, setFrom, from, setCountry, setAlert } = context;
  let country = "";
  let navigate = useNavigate();
  const onLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/login");
  };

  const onSearch = async (e) => {
    e.preventDefault();
    if (!localStorage.getItem("token")) {
      navigate("/login");
      setAlert({ message: "Please Login First", type: "Alert" });
      setTimeout(() => {
        setAlert(null);
      }, 1500);
    } else {
      const arr = country.toLowerCase().split(" ");
      const finalCountry = arr.join("-");
      setFrom(finalCountry);
      setCountry(finalCountry);
      getGlobalData(
        `https://api.covid19api.com/total/country/${finalCountry}`,
        "country"
      );
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Covid-19 Tracker
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active fw-light fs-3"
                  aria-current="page"
                  to="/"
                >
                  {" "}
                  {from.substring(0, 1).toUpperCase() + from.substring(1)}{" "}
                </Link>
              </li>
            </ul>
            <form className="d-flex mx-2">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => (country = e.target.value)}
              />
              <button
                className="btn btn-outline-success"
                type="submit"
                onClick={onSearch}
              >
                Search
              </button>
            </form>
            {!localStorage.getItem("token") ? (
              <>
                <Link to="/login">
                  <button
                    className="btn btn-outline-success mx-1"
                    type="submit"
                  >
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button
                    className="btn btn-outline-success mx-1"
                    type="submit"
                  >
                    Signup
                  </button>
                </Link>
              </>
            ) : (
              <button className="btn btn-outline-success" onClick={onLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Background;
