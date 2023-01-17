import { Fragment, useEffect, useState } from "react";

// react router
import { NavLink } from "react-router-dom";

const Card = ({ country, searchValue }) => {
  const [shownName, setShownName] = useState("");

  const highlightMatch = (name) => {
    const regex = new RegExp(searchValue, "i");
    const destructuredName = name.split(regex);
    const highlighted = destructuredName.map((piece, indx, arr) => {
      if (indx < arr.length - 1) {
        return (
          <Fragment key={indx}>
            {piece}
            <mark
              className={`${
                indx === 0 && piece === "" ? "text-capitalize" : ""
              } p-0 text-color`}
            >
              {searchValue}
            </mark>
          </Fragment>
        );
      }
      return <Fragment key={indx}>{piece}</Fragment>;
    });
    return highlighted;
  };

  useEffect(() => {
    if (country) {
      let shownName = country.name.common;
      if (searchValue.length > 0) {
        shownName = highlightMatch(shownName);
      }
      setShownName(shownName);
    }
  }, [country, searchValue]);

  return (
    <NavLink
      to={`/${country.name.common.replaceAll(" ", "-")}`}
      state={{ from: country }}
      className="card-container text-decoration-none d-block shadow-element"
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
    >
      <div className="card border-0 bg-element text-color bg-transition">
        <img
          src={country.flags.svg}
          className="card-image card-img-top"
          alt={`${country.name.common} flag`}
        />
        <div className="card-body pt-4 px-4">
          <h2 className="card-title fs-5 fw-semibold mb-3">{shownName}</h2>
          <ul className="list-unstyled fs-main mb-0">
            <li className="mb-1">
              <span className="fw-semibold">Population: </span>
              {country.population.toLocaleString("en-US")}
            </li>
            <li className="mb-1">
              <span className="fw-semibold">Region: </span>
              {country.region}
            </li>
            <li>
              <span className="fw-semibold">Capital: </span>
              {country.capital ? country.capital[0] : "none"}
            </li>
          </ul>
        </div>
      </div>
    </NavLink>
  );
};

export default Card;
