import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const Border = ({ allCountries, cca3 }) => {
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    const data = allCountries.filter((country) => country.cca3 === cca3)[0];
    setCountryData(data);
  }, [allCountries, cca3]);

  return countryData ? (
    <NavLink
      to={`/${countryData.name.common.replaceAll(" ", "-")}`}
      state={{ from: countryData }}
      className="d-block text-decoration-none text-color bg-element py-1 px-3 rounded-1 shadow-element"
    >
      {countryData.name.common}
    </NavLink>
  ) : (
    ""
  );
};

export default Border;
