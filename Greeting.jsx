import { useEffect, useState } from "react";

export default function Greeting() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  // 🔄 Load users
  const getUsers = async () => {
    const res = await fetch("http://localhost:5000/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  // ➕ Add user
  const addUser = async () => {
    const res = await fetch("http://localhost:5000/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    setMsg(data.msg || "");
    if (res.ok) {
      setUsers(data.users);
      setName("");
      setEmail("");
      setPassword("");
    }
  };

  // ❌ Delete user
  const deleteUser = async (id) => {
    const res = await fetch(`http://localhost:5000/delete/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    setUsers(data.users);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>User CRUD App</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      /><br /><br />

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      /><br /><br />

      <input
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      /><br /><br />

      <button onClick={addUser}>Create User</button>

      <p style={{ color: "red" }}>{msg}</p>

      <hr />

      <h3>All Users</h3>

      {users.map(user => (
        <div
          key={user.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "5px",
          }}
        >
          <b>{user.name}</b> | {user.email}
          <button
            style={{ marginLeft: "10px", color: "red" }}
            onClick={() => deleteUser(user.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
