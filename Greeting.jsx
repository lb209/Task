import React,{useState,useEffect} from 'react'

export default function Greeting() {
  const [text,setText]=useState("");
  const [todos,setTodos]=useState([]);

  // READ todos
  useEffect(()=>{
    fetch("http://localhost:5000/todos")
      .then(res=>res.json())
      .then(data=>setTodos(data))
  },[])

  // ADD todo
  const add=()=>{
    fetch("http://localhost:5000/add",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({ data:text })
    })
    .then(res=>res.json())
    .then(data=>{
      if(Array.isArray(data)){
        setTodos(data)
        setText("")
      }else{
        alert(data.error)
      }
    })
  }

  // ❌ DELETE todo
  const del = (id) => {
    fetch(`http://localhost:5000/delete/${id}`,{
      method:"DELETE"
    })
    .then(res=>res.json())
    .then(data=>setTodos(data))
  }

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={e=>setText(e.target.value)}
        placeholder="Enter todo"
      />
      <button onClick={add}>Add</button>

      <hr />

      {todos.map(todo=>(
        <div key={todo.id}>
          <span>{todo.data}</span>
          <button onClick={()=>del(todo.id)}>❌ Delete</button>
        </div>
      ))}
    </div>
  )
}
