import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email === "pagaregayatri6@gmail.com" &&
      password === "admin123"
    ) {
      localStorage.setItem("role", "admin");
      localStorage.setItem("adminToken", "true"); 
      navigate("/admin");

    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div className="admin-login-page">
      <form className="admin-login-card" onSubmit={handleLogin}>
        <h2>Elite Events Admin</h2>

        <input
          type="email"
          placeholder="Admin Email"
          className="form-control mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="form-control mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-warning w-100">
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;