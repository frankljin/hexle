import { useState } from "react";
import Grid from "./components/Grid";
import WinModal from "./components/WinModal";
import LoseModal from "./components/LoseModal";
import AboutModal from "./components/AboutModal";
import { answers } from "./answers";
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
  const [win, setWin] = useState(false);
  const [lose, setLose] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(true);

  const handleCloseAbout = () => {
    setShowAboutModal(false);
  };

  const handleOpenAbout = () => {
    setShowAboutModal(true);
  };

  const hexleNumber = (date: Date) =>
    Math.floor(
      (date.valueOf() - new Date(date.getFullYear(), 0, 0).valueOf()) /
        1000 /
        60 /
        60 /
        24
    ) - 61;

  const hexOfDay = answers[hexleNumber(new Date())];

  return (
    <div className="main">
      <h1
        className="title"
        onClick={handleOpenAbout}
        style={{ color: "#" + hexOfDay }}
      >
        #Hexle
      </h1>
      <p>
        Guess the colour of{" "}
        <span style={{ color: "#" + hexOfDay }}>#Hexle</span> in 6 tries! New
        colour daily.
      </p>
      <Grid
        letters={letters}
        setLetters={setLetters}
        currCol={currCol}
        setCurrCol={setCurrCol}
        currRow={currRow}
        setCurrRow={setCurrRow}
        submitted={submitted}
        setSubmitted={setSubmitted}
        win={win}
        setWin={setWin}
        setLose={setLose}
        hexOfDay={hexOfDay}
      />
      <WinModal win={win} letters={letters} hexleNumber={hexleNumber(new Date())}/>
      <LoseModal lose={lose} letters={letters} hexOfDay={hexOfDay} hexleNumber={hexleNumber(new Date())}/>
      <AboutModal
        showAboutModal={showAboutModal}
        handleCloseAbout={handleCloseAbout}
      />
    </div>
  );
}

export default App;
