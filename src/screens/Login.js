import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", json.authToken);
        console.log(localStorage.getItem("authToken"));
        navigate("/");
      }
      if (!json.success) {
        alert("Enter valid credentials");
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
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-area">
            <div className="form-right">
              <h2>New User?</h2>
              <p>Sign Up To Order your food...</p>
              <Link to="/createuser" className="login-button">
                <p>SIGN UP</p>
              </Link>
            </div>
            <div className="form-left">
              <div className="form-field">
                <h2 className="form-heading">LOGIN</h2>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  value={credentials.email}
                  onChange={onChange}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={onChange}
                  id="exampleInputPassword1"
                />
                <button type="submit" className="submit-button">
                  LOGIN
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer/>
    </div>
  );
}
