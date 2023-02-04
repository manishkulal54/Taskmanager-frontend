import React, { useState } from "react";
import "../stylesheets/Auth.css";

export default function Signin() {
  const [cred, setCred] = useState({
    email: "",
    pass: "",
  });
  const [err,setErr]=useState("")
  const [loadSign,setLoadSign]=useState(false)
  
  // to read and show the values in input field
  const handleOnChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  // on submitting the data
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoadSign(true)
    if (!cred.email || !cred.pass) {
      return setErr("fill all the fields");
    }
    if (cred.email.indexOf("@") < 0) {
      return  setErr("Invalid Email");
    }

    // fetching the data from the backend
    // const url="http://localhost:3001/api/user"
    const url="https://tender-foal-tunic.cyclic.app"
    const response=await fetch(url+'api/user/signin',{
      method:"POST",
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify({
        email:cred.email,
        password:cred.pass
      })
    })
    const data=await response.json()
    if(data.message==="error"){
      setErr(data.error)
    }
    else{
      sessionStorage.setItem("userid",data.data._id)
      window.location.href="/home"
    }
  setLoadSign(false)
  };

if(loadSign){
  document.title="Signing in..."
}else{
  document.title="Task Manager"
}

  return (
    <div className="authContainer disflex-col">
      <h1>Sign-in</h1>
      <form className="disflex-col">
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleOnChange}
          value={cred.email}
          autoComplete="off"
        />
        <input
          type="password"
          name="pass"
          placeholder="Password"
          onChange={handleOnChange}
          value={cred.pass}
        />
        <p>{err}</p>
        <button type="submit" onClick={handleOnSubmit}>
          Sign in
        </button>
      </form>
      <a href="/signup">Create your account</a>
    </div>
  );
}
