const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3001;
app.use(express.json());


app.use(express.static("public"));
const dataFilePath = path.join(__dirname, "data.json");


const readData = () => {
  if (!fs.existsSync(dataFilePath)) {
    return [];
  }
  const data = fs.readFileSync(dataFilePath);
  if(!isJsonString(data))
  {
    return []
  }
  return JSON.parse(data);
};


const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};


function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

//get all data
app.get("/note/getAll", (req,res) => {
  const note = readData();
  res.status(200).json(note);
});

//get data by id
app.get("/note/:id", (req, res) => {
  const {id} = req.params;
  const note = readData().find((n) => n.id === parseInt(id))
  if (note) {
    res.status(200).json(note);
  } else {
    res.status(404).send("Note not found");
  }
});


//post
app.post("/note", (req, res) => {
  const newNotes = { id: uuidv4(), ...req.body ,"created_date": new Date() };
  const note = readData();
  note.push(newNotes);
  writeData(note);
  res.status(200).json({ message: "Notes saved successfully" , data: newNotes });
  
});

// update
app.put("/note", (req, res) => {
  const newNotes = {...req.body ,"created_date": new Date() };
  const id = req.body['id'];
  const data = readData();  
  const newData =[];
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      newData.push(newNotes);
    }else{
      newData.push(data[i]);
    }
  }

  writeData(newData);
  res.status(200).json(newData);
});

//delete
app.delete("/note/:id", (req, res) => {
  const {id} = req.params;
  const data = readData();
  const newData=[];
  for(let i=0; i<data.length; i++){
    if(data[i].id!==id){
      newData.push(data[i]);
    }
  }
  writeData(newData);
  res.status(200).json({message: "Note deleted successfully" });
});

//start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});