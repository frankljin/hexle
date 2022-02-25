import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Grid from "./components/Grid";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

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
  const [showWinModal, setShowWinModal] = useState(true);
  const handleCloseWin = () => {
    setShowWinModal(false);
  }

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
        win={win}
        setWin={setWin}
        hexOfDay={"A0B1C2"}
      />
      <Modal show={win && showWinModal} onHide={handleCloseWin}>
      <Modal.Header>
        <Modal.Title>Congratulations!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>You got it! Press "Share Results" to get a spoiler-free look at your game copied to your clipboard.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary">Share Results</Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
}

export default App;
