import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

import "./Header.css";

function Header() {
  const categories = ["Health", "Food", "Travel", "Technology"];

  const navigate = useNavigate();

  return (
    <div className="header-container">
      <FaHome onClick={() => navigate("/")} className="home-icon" />
      <div className="categories-container">
        {categories.map((item) => (
          <Link to={`/category/${item}`} className="nav-link">
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Header;
