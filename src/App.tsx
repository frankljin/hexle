import { useState } from "react";
import Grid from "./components/Grid";
import "./App.css";

function App() {
  const [currRow, setCurrRow] = useState(0);
  const [currCol, setCurrCol] = useState(0);
  const [letters, setLetters] = useState([
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
  ]);
  const [submitted, setSubmitted] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  return (
    <div className="main">
      <h1>Hexle</h1>
      <Grid
        letters={letters}
        setLetters={setLetters}
        currCol={currCol}
        setCurrCol={setCurrCol}
        currRow={currRow}
        setCurrRow={setCurrRow}
        submitted={submitted}
        setSubmitted={setSubmitted}
      />
    </div>
  );
}

export default App;
