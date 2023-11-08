import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';


function App() {

  const [desc, setDesc] = useState("");

  const [prompt, setPrompt] = useState("");

  const [resp,setResp] = useState('');

  const [spin, setSpin] = useState(false)



  const handleClick =()=>{
    console.log(desc,prompt)

    setSpin(true)

    axios.post(`https://api.openai.com/v1/chat/completions`,{
      model : "gpt-3.5-turbo",
      messages : [{
        role : "user",
        content : `Generate a ${prompt} about ${desc}.`
      }]
    },{
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${import.meta.env.VITE_key}`
      }
    })
    .then((res)=>{
      console.log(res);
      console.log(res.data.choices[0].message.content);
      setSpin(false)
      setResp(res.data.choices[0].message.content);
    })
    .catch((err)=>{
      console.log(err);
      setSpin(false)
    })


  }
  return (
    <>

    <h1 style={{
      color:"Green"
    }}>
        Content Generator
    </h1>
      <div id="form">
        <div>
          <TextField label="Description" variant="outlined" 
            sx={{
              backgroundColor:"#FFF8E1",
           borderRadius : "5px" 
            }}

            onChange={(e)=>setDesc(e.target.value)}
          />
        </div>
        <br />

        <div>
          <FormControl sx={{ m: 1,
           minWidth: 220, 
           backgroundColor:"#FFF8E1",
           borderRadius : "5px" }}>
            <InputLabel >Select a Prompt</InputLabel>
            <Select onChange={(e)=> setPrompt(e.target.value)}>
              <MenuItem value="none">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"shayari"}>Shayari</MenuItem>
              <MenuItem value={"joke"}>Joke</MenuItem>
              <MenuItem value={"story"}>Story</MenuItem>
              <MenuItem value={"quote"}>Quote</MenuItem>
              <MenuItem value={"paragraph"}>Paragraph</MenuItem>
            </Select>
          </FormControl>
        </div>

        <br />

        <div>

        {
          spin ? <CircularProgress/> :
         ( <Button
            sx={{
              color: "white",
              backgroundColor: "#42A5F5",
              padding: "10px",
              "&:hover": {
                backgroundColor: "#1565C0",
                color: "white",
                scale: "1.1",
                transition: "500ms",
              },
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}

            onClick={handleClick}
          >
            Generate
          </Button>)
        }
        </div>
      </div>

      <div>
      
         <TextField
          label="Generated Response"
          multiline
          maxRows={10}
          sx={{
            m: 1,
            minWidth: 550,
            marginY: "60px",
            backgroundColor : "#E8EAF6",
            borderRadius :"5px"
          }}
          value={resp}
        />
      
      </div>
    </>
  );
}

export default App;

