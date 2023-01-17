import { Fragment, useEffect, useState } from "react";

// react router
import { Routes, Route } from "react-router-dom";

// Imported components
import Header from "./header";
import Homepage from "./homepage";
import Country from "./country";

const App = () => {
  const [theme, setTheme] = useState("dark");
  const [data, setData] = useState([]);
  const [numOfShownData, setNumOfShownData] = useState(8);
  const [shownData, setShownData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("Filter by Region");
  const [showLoader, setShowLoader] = useState(false);
  const increment = 8;

  const handleDataChange = (newData, newNumOfShownData = numOfShownData) => {
    setFilteredData(newData);
    setNumOfShownData(newNumOfShownData);
    const newShownData = newData.slice(0, newNumOfShownData);
    setShownData(newShownData);
  };

  const handleFilter = (filter) => {
    setFilterValue(filter);
    let newData = data;
    if (searchValue.length > 0) {
      newData = data.filter((country) => {
        if (country.name.common.toLowerCase().includes(searchValue)) {
          return country;
        }
        return null;
      });
    }
    if (filter === "All") {
      handleDataChange(newData);
      return;
    }
    const filtered = newData.filter((country) => country.region === filter);
    handleDataChange(filtered);
  };

  const handleSearch = (input) => {
    setSearchValue(input);
    const filtered = data.filter((country) => {
      if (country.name.common.toLowerCase().includes(input)) {
        if (filterValue !== "Filter by Region" && filterValue !== "All") {
          if (country.region === filterValue) {
            return country;
          } else {
            return null;
          }
        }
        return country;
      }
      return null;
    });
    handleDataChange(filtered);
  };

  const handleLoadMore = () => {
    if (shownData.length === filteredData.length) return;
    const newNum = numOfShownData + increment;
    handleDataChange(filteredData, newNum);
  };

  const handleThemeSet = (newTheme) => {
    document.documentElement.dataset.theme = newTheme;
    setTheme(newTheme);
  };

  const handleThemeChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    handleThemeSet(newTheme);
    window.localStorage.setItem(
      "rest-countries-theme",
      JSON.stringify(newTheme)
    );
  };

  const checkForStoredTheme = () => {
    const storedValue =
      JSON.parse(window.localStorage.getItem("rest-countries-theme")) || null;
    if (storedValue) {
      handleThemeSet(storedValue);
      return true;
    }
    return false;
  };

  const checkSystemTheme = () => {
    const isDefaultDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const newTheme = isDefaultDark ? "dark" : "light";
    handleThemeSet(newTheme);
  };

  const getData = () => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
        setShownData(data.slice(0, numOfShownData));
      })
      .then(() => setShowLoader(false))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (!checkForStoredTheme()) checkSystemTheme();
    setShowLoader(true);
    getData();
  }, []);

  return (
    <Fragment>
      <Header onThemeChange={handleThemeChange} theme={theme} />
      <main className="bg-main pb-5 pt-4 pt-md-5 bg-transition position-relative">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <Homepage
                  theme={theme}
                  data={shownData}
                  onSearch={handleSearch}
                  searchValue={searchValue}
                  onFilter={handleFilter}
                  filterValue={filterValue}
                  showLoader={showLoader}
                  handleLoadMore={handleLoadMore}
                />
              }
            />
            <Route
              path=":name"
              element={<Country theme={theme} allCountries={data} />}
            />
          </Routes>
        </div>
      </main>
    </Fragment>
  );
};

export default App;
