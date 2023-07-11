import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { initializeApp } from "firebase/app";

import "./Header.css";

function Header() {
  const categories = ["Health", "Food", "Travel", "Technology"];

  const firebaseConfig = {
    apiKey: "AIzaSyB77QYUf_6OcdviofBI3PGONF_nCtk9T0A",
    authDomain: "blogapp-248aa.firebaseapp.com",
    projectId: "blogapp-248aa",
    storageBucket: "blogapp-248aa.appspot.com",
    messagingSenderId: "229406200800",
    appId: "1:229406200800:web:a8166cfa52ae5b5714d185",
  };

  const app = initializeApp(firebaseConfig);

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
