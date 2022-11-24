import { NavLink } from "react-router-dom";

// Imported icons
import sun from "../images/icon-sun.svg";
import moon from "../images/icon-moon.svg";

const Header = ({ theme, onThemeChange }) => {
  return (
    <header className="bg-element py-4 px-2 px-md-0 bg-transition position-relative shadow-element">
      <div className="container d-flex align-items-center justify-content-between">
        <h1 className="main-heading fw-bolder mb-0 lh-1">
          <NavLink to={"/"} className="text-decoration-none text-color">
            Where in the world?
          </NavLink>
        </h1>
        <button
          type="button"
          className="theme-btn btn text-color bg-main bg-transition py-1 py-sm-2 px-2 px-sm-3 text-capitalize d-flex align-items-center gap-2"
          onClick={onThemeChange}
        >
          <img
            src={theme === "dark" ? moon : sun}
            alt={`${theme === "dark" ? "moon" : "sun"} icon`}
            className="img-fluid theme-icon"
          />
          <span>{theme === "dark" ? "dark" : "light"} Mode</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
