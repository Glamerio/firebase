import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="bg">
      <img className="background" src="assets/cyberpunk2.jpg" alt='Background' />
      <div className="container">
        <h2>Login</h2>
        <div className="sub_container">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="login_email input_box"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="login_password input_box"
          />
          <button className="button log_button" onClick={handleLogin}>Login</button>
          <a href="/register" className="create">
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
