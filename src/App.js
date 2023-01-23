import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [listOfInterviews, setListOfInterviews] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/Interviews").then((response) => {
      console.log(response.data);
      const interviews = response.data;
      setListOfInterviews(interviews);
    });
  }, []);

  return (
    <div className="App">
      {listOfInterviews.map((value, key) => (
        <li key={key}>{value.jobTitle}</li>
      ))}
    </div>
  );
}

export default App;
