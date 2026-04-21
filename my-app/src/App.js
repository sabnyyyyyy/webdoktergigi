import "./App.css";
import bg from "./gambardepan.jpg";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="home">

      <img src={bg} alt="dentist" className="bg" />

      <div className="overlay">
        <h1>MEET OUR DENTIST</h1>
        <p>Pelayanan terbaik untuk kesehatan gigi Anda 🦷</p>

        <button onClick={() => navigate("/register")}>
          Get Started
        </button>
      </div>

    </div>
  );
}

export default Home;