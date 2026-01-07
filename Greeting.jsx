import { useState } from "react";

export default function Greeting() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const reg=async()=>{
  const res=await fetch("http://localhost:5000/form",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({name,email,password})
  })
  const data=await res.json();
 setMessage(data.msg);
}
  return (
    <div>
      <h1>Counter App</h1>
      <h2>{message}</h2>
      <input type="text" placeholder="Name"  name="name" onChange={(e)=>setName(e.target.value)}/>
      <input type="email" placeholder="Email"name="email" onChange={(e)=>setEmail(e.target.value)} />
      <input type="password" placeholder="Password" name="password" onChange={(e)=>setPassword(e.target.value)} />

      <button onClick={reg}>Registration</button>
<p>{message}</p>
    </div>
  );
}
