import { useEffect, useRef, Fragment, useState } from "react";

// animation
import autoAnimate from "@formkit/auto-animate";

// Imported components
import Options from "./options";
import Card from "./card";
import Loader from "./loader";
import GoToTopBtn from "./goToTopBtn";

const Homepage = ({
  theme,
  data,
  onSearch,
  searchValue,
  onFilter,
  filterValue,
  showLoader,
  handleLoadMore,
}) => {
  const [showGoToTopBtn, setShowGoToTopBtn] = useState(false);

  const parentRef = useRef();
  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, []);

  useEffect(() => {
    const checkGoToTopBtn = () => {
      if (
        (window.scrollY > 400 && showGoToTopBtn === true) ||
        (window.scrollY <= 400 && showGoToTopBtn === false)
      )
        return;
      if (window.scrollY > 400) {
        setShowGoToTopBtn(true);
      } else {
        setShowGoToTopBtn(false);
      }
    };
    window.addEventListener("scroll", checkGoToTopBtn);
    return () => window.removeEventListener("scroll", checkGoToTopBtn);
  }, [window.scrollY]);

  useEffect(() => {
    const checkForMoreContent = () => {
      const scrollTop = Math.ceil(document.documentElement.scrollTop);
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      if (scrollTop + clientHeight + 10 >= scrollHeight) {
        handleLoadMore();
      }
    };
    window.addEventListener("scroll", checkForMoreContent);
    return () => window.removeEventListener("scroll", checkForMoreContent);
  }, [data]);

  return (
    <div className="homepage">
      <GoToTopBtn show={showGoToTopBtn} />
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
