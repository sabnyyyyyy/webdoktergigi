import "./Login.css";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import dentist from "./gambar2.jpg";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <div className="login-card">

        {/* IMAGE */}
        <div className="login-image">
          <img src={dentist} alt="dentist" />
        </div>

        {/* FORM */}
        <div className="login-form">
          <label>USERNAME</label>
          <input type="text" />

          <label>PASSWORD</label>
          <input type="password" />

          <div className="btn-group">
            <button onClick={() => navigate("/dashboard")}>
              LOGIN
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;