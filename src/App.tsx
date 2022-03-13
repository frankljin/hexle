import { useState } from "react";
import Grid from "./components/Grid";
import AboutModal from "./components/AboutModal";
import { answers } from "./answers";
import "./App.css";
import FinishModal from "./components/FinishModal";

function App() {
  const hexleNumber = (date: Date) =>
    Math.floor(
      (date.valueOf() - new Date(date.getFullYear(), 0, 0).valueOf()) /
        1000 /
        60 /
        60 /
        24
    ) - 61;

  const dayKey = hexleNumber(new Date())
  const [currRow, setCurrRow] = useState(() => {
    const saved = localStorage.getItem(dayKey.toString() + "row");
    const initialValue = saved ? parseInt(saved) : null;
    return initialValue || 0;
  });

  const [currCol, setCurrCol] = useState(() => {
    const saved = localStorage.getItem(dayKey.toString() + "col");
    const initialValue = saved ? parseInt(saved) : null;
    return initialValue || 0;
  });

  const [letters, setLetters] = useState(() => {
    const saved = localStorage.getItem(dayKey.toString() + "letters");
    const initialValue = saved ? JSON.parse(saved) : null;
    return initialValue || [
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
    ]
  });
       
  const [submitted, setSubmitted] = useState(() => {
    const saved = localStorage.getItem(dayKey.toString() + "submitted");
    const initialValue = saved ? JSON.parse(saved) : null;
    return initialValue || [
    false,
    false,
    false,
    false,
    false,
    false,
    ]
  });

  const [win, setWin] = useState(() => {
    const saved = localStorage.getItem(dayKey.toString() + "win");
    const initialValue = saved ? saved === "true" : null;
    return initialValue || false;
  });

  const [lose, setLose] = useState(() => {
    const saved = localStorage.getItem(dayKey.toString() + "lose");
    const initialValue = saved ? saved === "true" : null;
    return initialValue || false;
  });

  const [showAboutModal, setShowAboutModal] = useState(true);

  const handleCloseAbout = () => {
    setShowAboutModal(false);
  };

  const handleOpenAbout = () => {
    setShowAboutModal(true);
  };

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
        lose={lose}
        setLose={setLose}
        hexOfDay={hexOfDay}
        dayKey={dayKey}
      />
      <FinishModal
        win={win}
        lose={lose}
        letters={letters}
        hexleNumber={hexleNumber(new Date())}
        hexOfDay={hexOfDay}
      />
      <AboutModal
        showAboutModal={!win && !lose && showAboutModal}
        handleCloseAbout={handleCloseAbout}
      />
    </div>
  );
}

export default App;
