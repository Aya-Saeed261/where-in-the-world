import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";

// Imported components
import Info from "./countryInfo";
import Loader from "./loader";

// Imported icons
import arrowLight from "../images/left-arrow-light-mode.svg";
import arrowDark from "../images/left-arrow-dark-mode.svg";

const Country = ({ theme, allCountries }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { name: paramName } = useParams();
  const [country, setCountry] = useState(null);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (state) {
      setCountry(state.from);
      setShowLoader(false);
    } else {
      const countryData = allCountries.filter((element) => {
        const lowerName = element.name.common.toLowerCase();
        const lowerParam = paramName.replaceAll("-", " ").toLowerCase();
        if (lowerName === lowerParam) return element;
        return null;
      });
      setCountry(countryData[0]);
      setTimeout(() => setShowLoader(false), 1200);
    }
  }, [paramName, allCountries, state]);

  return (
    <Fragment>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="btn back-btn text-color bg-element mt-4 mb-5 ms-4 ms-lg-0 py-2 rounded-2 shadow-element d-flex align-items-center gap-2"
      >
        <img
          src={theme === "dark" ? arrowDark : arrowLight}
          alt=""
          className="arrow-icon"
        />
        <span>Back</span>
      </button>
      {country ? (
        <div className="row m-0 pt-4 pb-4 pb-lg-0 px-4 px-lg-0 justify-content-between align-items-center">
          <div className="col-lg-6 px-0 pe-lg-4 mb-5 mb-lg-0">
            <img
              src={country.flags.svg}
              alt={`${country.name.common} flag`}
              className="img-fluid"
            />
          </div>
          <div className="col-lg-5 px-0 text-color">
            <h2 className="fw-bolder mb-4">{country.name.common}</h2>
            <Info country={country} allCountries={allCountries} />
          </div>
        </div>
      ) : showLoader ? (
        <Loader />
      ) : (
        <p className="text-color text-center fw-bold fs-4 mb-0">
          Country not found!
        </p>
      )}
    </Fragment>
  );
};
export default Country;
