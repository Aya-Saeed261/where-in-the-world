const regions = [
  { name: "All", id: 0 },
  { name: "Africa", id: 1 },
  { name: "Americas", id: 2 },
  { name: "Asia", id: 3 },
  { name: "Europe", id: 4 },
  { name: "Oceania", id: 5 },
];

const Options = ({ theme, onSearch, searchValue, onFilter, filterValue }) => {
  const handleSearch = (e) => {
    const newValue = e.target.value.toLowerCase();
    onSearch(newValue);
  };

  return (
    <div className="sticky-top bg-main mb-0 mb-4 mb-md-5 py-3">
      <form
        className="row m-0 justify-content-between align-items-center gap-4 pb-2 pb-md-0"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="col-md-6 col-lg-5 col-xl-4 bg-element mb-3 mb-md-0 pe-0 ps-4 rounded-2 d-flex align-items-center gap-2 bg-transition shadow-element">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style={{
              fill: `${theme === "dark" ? "#fff" : "hsl(200, 15%, 8%)"}`,
            }}
          >
            <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"></path>
          </svg>
          <input
            className="form-control bg-element py-3 fs-main border-0 text-color bg-transition"
            type="text"
            placeholder="Search for a country..."
            value={searchValue}
            onChange={handleSearch}
          />
        </div>
        <div className="col-7 col-md-4 col-lg-3 col-xl-2 px-0 ps-md-5 ps-lg-4 position-relative">
          <button
            className="dropdown-toggle btn w-100 text-start py-3 ps-4 pe-3 rounded-2 text-color bg-element fs-main bg-transition shadow-element position-relative"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {filterValue}
          </button>
          <ul className="dropdown-menu bg-element shadow-element">
            {regions.map((region) => (
              <li key={region.id}>
                <button
                  type="button"
                  className={`btn ${
                    region.name === filterValue ||
                    (region.name === "All" && filterValue.startsWith("Filter"))
                      ? "active"
                      : ""
                  } dropdown-item ps-4 text-color fs-main rounded-0`}
                  onClick={() => onFilter(region.name)}
                >
                  {region.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
};

export default Options;
