import { NavLink } from "react-router-dom";
import { Fragment } from "react";

const Card = ({ country, searchValue }) => {
  const name = country.name.common;

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
  let shownName = name;
  if (searchValue.length > 0) {
    shownName = <Fragment>{highlightMatch(name)}</Fragment>;
  }

  return (
    <NavLink
      to={`/${name.replaceAll(" ", "-")}`}
      state={{ from: country }}
      className="text-decoration-none shadow-element card-container"
    >
      <div className="card border-0 bg-element text-color bg-transition">
        <img
          src={country.flags.svg}
          className="card-img-top card-image"
          alt={`${name} flag`}
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
