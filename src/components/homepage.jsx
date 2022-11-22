import { useEffect, useRef, Fragment } from "react";
import autoAnimate from "@formkit/auto-animate";

// Imported components
import Options from "./options";
import Card from "./card";
import Loader from "./loader";

const Homepage = ({
  theme,
  data,
  onLoadMore,
  onSearch,
  searchValue,
  onFilter,
  filterValue,
  showMoreBtn,
  showLoader,
}) => {
  const parentRef = useRef();
  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parentRef]);

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
        {showMoreBtn ? (
          <button
            type="button"
            className="load-more-btn btn text-color d-block mt-5 mx-auto text-capitalize fs-5 fw-semibold px-4 shadow-element"
            onClick={onLoadMore}
          >
            load more
          </button>
        ) : (
          ""
        )}
      </Fragment>
    </div>
  );
};

export default Homepage;
