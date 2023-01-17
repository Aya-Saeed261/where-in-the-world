// Imported components
import Border from "./countryBorder";

const Info = ({ country, allCountries }) => {
  return (
    <ul className="list-unstyled mb-0">
      <div className="row m-0 flex-column flex-md-row justify-content-between  list-unstyled mb-0">
        <div className="col-md-6 px-0 mb-5 mb-md-0">
          <li className="mb-2">
            <span className="fw-semibold text-capitalize">native name: </span>
            {country.name.nativeName
              ? country.name.nativeName[Object.keys(country.name.nativeName)[0]]
                  .common
              : country.name.official}
          </li>
          <li className="mb-2">
            <span className="fw-semibold text-capitalize">population: </span>
            {country.population.toLocaleString("en-US")}
          </li>
          <li className="mb-2">
            <span className="fw-semibold text-capitalize">region: </span>
            {country.region}
          </li>
          <li className="mb-2">
            <span className="fw-semibold text-capitalize">sub region: </span>
            {country.subregion ? country.subregion : "none"}
          </li>
          <li>
            <span className="fw-semibold text-capitalize">capital: </span>
            {country.capital ? country.capital.join(", ") : "none"}
          </li>
        </div>
        <div className="col-md-5 px-0">
          <li className="mb-2">
            <span className="fw-semibold text-capitalize">
              top level domain:{" "}
            </span>
            {country.tld.join(", ")}
          </li>
          <li className="mb-2">
            <span className="fw-semibold text-capitalize">currencies: </span>
            {country.currencies
              ? Object.keys(country.currencies).join(", ")
              : "none"}
          </li>
          <li>
            <span className="fw-semibold text-capitalize">languages: </span>
            {country.languages
              ? Object.keys(country.languages)
                  .map((lang) => country.languages[lang])
                  .join(", ")
              : "none"}
          </li>
        </div>
      </div>
      <li className="d-flex flex-column flex-md-row gap-2 mt-5">
        <span className="fw-semibold text-capitalize">borders: </span>
        {country.borders ? (
          <ul className="list-unstyled mb-0 d-flex flex-wrap gap-2">
            {country.borders.map((border) => (
              <li key={border}>
                <Border allCountries={allCountries} cca3={border} />
              </li>
            ))}
          </ul>
        ) : (
          "none"
        )}
      </li>
    </ul>
  );
};

export default Info;
