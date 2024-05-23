import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.geolocation,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (!json.success) {
        alert("Enter valid credentials");
      } else{
        window.location.replace('/Login');
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="form-area">
          <div className="form-left">
            <div className="form-field">
              <h2 className="form-heading">Sign Up</h2>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
                value={credentials.name}
                onChange={onChange}
              />
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                value={credentials.email}
                onChange={onChange}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                value={credentials.password}
                onChange={onChange}
                id="exampleInputPassword1"
              />
              <input
                type="text"
                className="form-control"
                placeholder="Address"
                name="geolocation"
                value={credentials.geolocation}
                onChange={onChange}
                id="exampleInputAddress"
              />
              <button type="submit" className="submit-button">
                SIGN UP
              </button>
            </div>
          </div>
          <div className="form-right">
            <h2>Already a User?</h2>
            <p>Login In To Order Again...</p>
            <Link to="/login" className="login-button">
              <p>LOGIN</p>
            </Link>
          </div>
        </div>
      </form>
    </div>
    <div><Footer/></div>
  </div>
  );
}
