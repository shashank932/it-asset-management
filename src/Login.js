import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      alert("Login Successful!");
      window.location.href = "/";
    } catch (error) {
      alert("Invalid Email or Password!");
    }
  };

  return (
    <div
      style={{
        width: "450px",
        margin: "60px auto",
        padding: "30px",
        borderRadius: "10px",
        border: "1px solid #ddd",
        boxShadow: "0px 3px 10px rgba(0,0,0,0.1)"
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Admin Login
      </h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            fontSize: "16px",
            borderRadius: "6px"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            fontSize: "16px",
            borderRadius: "6px"
          }}
        />

        <button
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            background: "blue",
            borderRadius: "6px",
            border: "none",
            color: "white",
            cursor: "pointer",
            marginTop: "10px"
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
