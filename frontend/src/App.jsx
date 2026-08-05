import { useEffect, useState} from "react";
import axios from "axios";

function App(){

  const [message,setMessage] = useState("");

  const [name,setName] = useState("");

  useEffect(()=> {
   axios
   .get("http://127.0.0.1:5000/")
   .then((response) => {
    console.log(response);

    setMessage(response.data.message);
   })
   .catch((error) => {
    console.log(error);
   });
  },[]);

  const handleSubmit = () => {
    axios
     .post("http://127.0.0.1:5000/greet",{
      name
     })
     .then((response) => {
      setMessage(response.data.message);
     })
     .catch((error) => {
      console.log(error);
     })
  }

  return (
    <div style={{padding: "20px"}}>
      <h1>SecureTask</h1>

      <input
      type="text"
      placeholder="Enter your name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>
        Submit
      </button>

      <h2>{message}</h2> 
    </div>
  );
}

export default App;