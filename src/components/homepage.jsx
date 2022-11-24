import { useEffect, useRef, Fragment } from "react";
import autoAnimate from "@formkit/auto-animate";

// Imported components
import Options from "./options";
import Card from "./card";
import Loader from "./loader";

const Homepage = ({
  theme,
  data,
  onSearch,
  searchValue,
  onFilter,
  filterValue,
  showLoader,
  numOfShownData,
  onScroll,
}) => {
  const parentRef = useRef();
  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [data, numOfShownData]);

  return (
    <div className="homepage">
      <Options
        theme={theme}
        onSearch={onSearch}
        searchValue={searchValue}
        onFilter={onFilter}
        filterValue={filterValue}
      />
      <Fragment>
        <div
          className={`${
            data.length > 0 ? "cards-grid" : ""
          } content px-md-0 position-relative`}
          ref={parentRef}
        >
          {data.length > 0 ? (
            data.map((country) => (
              <Card
                key={country.ccn3}
                country={country}
                searchValue={searchValue}
              />
            ))
          ) : showLoader ? (
            <Loader />
          ) : searchValue.length > 0 ? (
            <p className="text-color text-center fw-bold fs-4 mb-0">
              Sorry, no results were found!
            </p>
          ) : (
            ""
          )}
        </div>
      </Fragment>
    </div>
  );
};

export default Homepage;
