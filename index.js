const express = require("express");
const app = express();
const cors = require("cors");
const { genSaltSync } = require("bcrypt");


app.use(cors()); // React ke liye
app.use(express.json()); 

let todos=[]

//read todo
app.get("/todos", (req, res) => {
  res.json(todos);
});

//add todo
app.post('/add',(req,res)=>{
const {data}= req.body;
if(!data||data.trim()===""){
    return res.status(400).json({error:"Todo data is required"})    
}
todos.push({id:Date.now(),data})
  res.json(todos);
})
// DELETE todo by id
app.delete("/delete/:id", (req, res) => {

  const id = Number(req.params.id); // string → number

  // filter todos (jis ki id match ho usko hata do)
  todos = todos.filter(todo => todo.id !== id);

  // updated list return
  res.json(todos);
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
