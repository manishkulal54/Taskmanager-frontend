import React, { useState } from "react";
import "../stylesheets/Auth.css";

export default function Signup() {
  const [cred, setCred] = useState({
    name: "",
    email: "",
    pass: "",
    cpass: "",
  });
  const [err, setErr] = useState("");



  const handleOnChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };


  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!cred.email || !cred.pass || !cred.cpass) {
      return setErr("fill all the fields");
    }
    if (cred.email.indexOf("@") < 0) {
      return setErr("Invalid Email");
    }
    document.title="Singing up...."
    // const url = "http://localhost:3001/api/user";
    const url = "https://tender-foal-tunic.cyclic.app";
    const response = await fetch(url + "/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cred.name,
        email: cred.email,
        password: cred.pass,
      }),
    });
    const data = await response.json();
    if (data.message === "error") {
      setErr(data.error);
    } else {
      sessionStorage.setItem("userid", data.data._id);
      window.location.href = "/home";
    }
  };
  return (
    <div className="authContainer disflex-col">
      <h1>Sign-up</h1>
      <form className="disflex-col">
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleOnChange}
          value={cred.name}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleOnChange}
          value={cred.email}
        />
        <input
          type="password"
          name="pass"
          placeholder="Password"
          onChange={handleOnChange}
          value={cred.pass}
        />
        <input
          type="password"
          name="cpass"
          placeholder="Confirm your password"
          onChange={handleOnChange}
          value={cred.cpass}
        />
        <p>{err}</p>
        <button type="submit" onClick={handleOnSubmit}>
          Sign up
        </button>
      </form>
      <a href="/signin">Already have an account</a>
    </div>
  );
}
