import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import dentist from "./gambar2.jpg";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("⚠️ Semua field wajib diisi");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        setError("❌ Email atau password salah");
      }
    } catch {
      setError("⚠️ Server error");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        {/* IMAGE */}
        <div className="login-image">
          <img src={dentist} alt="dentist" />
        </div>

        {/* FORM */}
        <div className="login-form">
          <h2>Welcome Back 👋</h2>
          <p className="subtitle">Login untuk melanjutkan</p>

          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <div className="error-box">{error}</div>}

          <button onClick={handleLogin}>LOGIN</button>

          {/* REGISTER LINK */}
          <p className="register-text">
            Belum punya akun?{" "}
            <span onClick={() => navigate("/register")}>
              Daftar sekarang
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;