const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// submit form
let user=[]
app.post("/form",async(req,res)=>{
  const {name,email,password}=req.body;
  if(!name||!email||!password){
    return res.status(400).json({msg:"Please enter all fields"});
  }
  const userexist= await user.find(user=>user.email===email);
  if(userexist){
    return res.status(400).json({msg:"User already exists"});
  }
  user.push({name,email,password});
  res.status(200).json({msg:"Registration successful"});
})


app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
