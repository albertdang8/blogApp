import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { auth } from "../../config/firebaseConfig";

function Auth() {
  const [form, setForm] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        updateProfile(auth.currentUser, { displayName: name });
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => alert(err.com));
  };

  return (
    <div className="auth-container">
      {form ? (
        <form className="auth-form" onSubmit={handleLogin}>
          <h1>Login with your email</h1>
          <div className="form-group">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit">Login</button>
          <p>
            Don't have an account?
            <span className="form-link" onClick={() => setForm(false)}>
              Signup
            </span>
          </p>
        </form>
      ) : (
        <form className="auth-form" onSubmit={handleSignup}>
          <h1>Signup with your email</h1>
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit">Register</button>
          <p>
            Already have an account?
            <span className="form-link" onClick={() => setForm(true)}>
              Login
            </span>
          </p>
        </form>
      )}
    </div>
  );
}

export default Auth;
