import "./Login.css"; 
import dentist from "./gambar2.jpg";

function Register() {
  return (
    <div className="login-page">
      <div className="login-card">

        {/* IMAGE */}
        <div className="login-image">
          <img src={dentist} alt="dentist" />
        </div>

        {/* FORM */}
        <div className="login-form">
          <label>E-MAIL</label>
          <input type="text" />

          <label>USERNAME</label>
          <input type="text" />

          <label>NOMER TELPON</label>
          <input type="text" />

          <label>PASSWORD</label>
          <input type="password" />

          <label>KONFRIM PASSWORD</label>
          <input type="password" />

          <div className="btn-group single">
            <button>REGISTER</button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;