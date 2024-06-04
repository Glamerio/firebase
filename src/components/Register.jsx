import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const db = getDatabase();
      await set(ref(db, "users/" + user.uid), {
        username: username,
        email: email,
      });

      console.log("Kullanıcı başarıyla kaydedildi.");
      history.push("/");
    } catch (error) {
      console.log(setError(error.message));
    }
  };

  return (
    <div className="bg">
      <img className="background" src="assets/cyberpunk2.jpg" alt="Background"/>
      <div className="container">
        <h2>Register</h2>
        <div className="sub_container">
          <div>
            <input
              maxLength={18}
              minLength={4}
              type="text"
              placeholder="Kullanıcı Adı"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="register_username input_box"
            />
          </div>
          <input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="register_email input_box"
          />
          <div>
            <input
              minLength={8}
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="register_password input_box"
            />
          </div>
        </div>


        <button className="button log_button" onClick={handleRegister}>
          Kayıt Ol
        </button>
        <a href="/">Go Login Page</a>
        {error && <p>{error}</p>}
      </div>

    </div>
  );
}

export default Register;
