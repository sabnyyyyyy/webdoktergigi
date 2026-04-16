import React from "react";
import "./App.css";
import hero from "./gambardepan.jpg";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div
        className="hero"
        style={{ backgroundImage: `url(${hero})` }}
      >
        <div className="nav-center">
          <span onClick={() => navigate("/login")}>LOGIN</span>
          <span onClick={() => navigate("/register")}>REGISTRASI</span>
          <span onClick={() => navigate("/about")}>ABOUT US</span>
        </div>

        <div className="overlay-box">
          <h1>MEET OUR DENTIST</h1>
        </div>

        <div className="bottom-box"></div>
      </div>
    </div>
  );
}

export default App;