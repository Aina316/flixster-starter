import "../style/SideBar.css";

const SideBar = ({ pageType, setPageType, toggleSide }) => {
  return (
    <nav className="sidebar">
      <button className="sidenav-btn" onClick={toggleSide}>
        ≣
      </button>
      <button
        onClick={() => setPageType("home")}
        className={pageType === "home" ? "home" : ""}
      >
        Home
      </button>
      <button
        onClick={() => setPageType("favorites")}
        className={pageType === "favorites" ? "favorites" : ""}
      >
        Favorites
      </button>
      <button
        onClick={() => setPageType("watched")}
        className={pageType === "watched" ? "watched" : ""}
      >
        Watched
      </button>
    </nav>
  );
};

export default SideBar;
