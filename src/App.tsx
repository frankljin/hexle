import { useState } from "react";
import Grid from "./components/Grid";
import AboutModal from "./components/AboutModal";
import { answers } from "./answers";
import "./App.css";
import FinishModal from "./components/FinishModal";
import { GridData } from "./utils/types";

function App() {
  const hexleNumber = (date: Date) =>
    Math.floor(
      (date.valueOf() - new Date(date.getFullYear(), 0, 0).valueOf()) /
        1000 /
        60 /
        60 /
        24
    ) - 61;

  const dayKey = hexleNumber(new Date());

  const [endingGrid, setEndingGrid] = useState<null | GridData>();

  const [win, setWin] = useState(false);
  const [lose, setLose] = useState(false);

  const [showAboutModal, setShowAboutModal] = useState(() => {
    return !localStorage.getItem(dayKey.toString())
  });

  const hexOfDay = answers[hexleNumber(new Date())];

  const handleWin = (gridData: GridData) => {
    setWin(true);
    setEndingGrid(gridData);
  };

  const handleLose = (gridData: GridData) => {
    setLose(true);
    setEndingGrid(gridData);
  };

  return (
    <div className="main">
      <div>
        <h1
          className="title"
          onClick={() => setShowAboutModal(true)}
          style={{ color: "#" + hexOfDay }}
        >
          #Hexle
        </h1>
      </div>
      <p>
        Guess the colour of{" "}
        <span style={{ color: "#" + hexOfDay }}>#Hexle</span> in 6 tries! New
        colour daily.
      </p>
      <Grid
        hexOfDay={hexOfDay}
        handleWin={(gridData) => handleWin(gridData)}
        handleLose={(gridData) => handleLose(gridData)}
        dayKey={dayKey.toString()}
      />
      <FinishModal
        win={win}
        lose={lose}
        endingGrid={endingGrid || []}
        hexleNumber={hexleNumber(new Date())}
        hexOfDay={hexOfDay}
      />
      <AboutModal
        showAboutModal={!win && !lose && showAboutModal}
        handleCloseAbout={() => setShowAboutModal(false)}
      />
    </div>
  );
}

export default App;
