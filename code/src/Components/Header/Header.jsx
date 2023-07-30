import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "./Header.css";
import { auth } from "../../config/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

import "./Header.css";

function Header() {
  const categories = ["Health", "Food", "Travel", "Technology"];

  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  return (
    <div className="header-container">
      <FaHome onClick={() => navigate("/")} className="home-icon" />
      {user && <Link to="/addarticle" className="auth-link">Add Article</Link>}
      <div className="categories-container">
        {categories.map((item) => (
          <Link key={item} to={`/category/${item}`} className="nav-link">
            {item}
          </Link>
        ))}
      </div>
      {user ? (
        <div>
          <span className="username">
            {user?.displayName ? user?.displayName : user?.email}
          </span>
          <button className="auth-link" onClick={() => signOut(auth)}>
            Logout
          </button>
        </div>
      ) : (
        <Link className="auth-link" to="/auth">
          Signup
        </Link>
      )}
    </div>
  );
}

export default Header;
