import { useState } from "react";

export default function Greeting() {
  const [message, setMessage] = useState(0);

  const increment = async () => {
    const res = await fetch("http://localhost:5000/count");
    const data = await res.json();
    setMessage(data.count);
  };

  const decrement = async () => {
    const res = await fetch("http://localhost:5000/discount");
    const data = await res.json();
    setMessage(data.count);
  };

  return (
    <div>
      <h1>Counter App</h1>
      <h2>{message}</h2>

      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}
