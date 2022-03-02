import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

type WinModalProps = {
  win: boolean;
  letters: string[][];
  hexleNumber: number;
};

const WinModal = ({ win, letters, hexleNumber }: WinModalProps) => {
  const [showWinModal, setShowWinModal] = useState(true);
  const [copyText, setCopyText] = useState("");
  const handleCloseWin = () => {
    setShowWinModal(false);
  };

  const copyToClipboard = () => {
    let tries = 0;
    for (let i = 0; i < 6; i++) {
      if (letters[i][0] === "") {
        tries = i;
        break;
      }
    }
    let lettersText = "Hexle " + hexleNumber + " " + tries + "/6\n";
    for (let i = 0; i < 6; i++) {
      if (letters[i][0] === "") break;
      for (let j = 0; j < 6; j++) {
        const color = document.getElementById(i.toString() + j.toString())!.style.backgroundColor;
        if (color === "rgb(144, 238, 144)") {
          lettersText += "🟩";
        } else if (color === "rgb(255, 252, 187)") {
          lettersText += "🟨";
        } else {
          lettersText += "⬜";
        }
      }
      lettersText += "\n";
    }
    navigator.clipboard.writeText(lettersText);
    setCopyText("Results have been copied to your clipboard!");
  }
  return (
    <Modal show={win && showWinModal} onHide={handleCloseWin}>
      <Modal.Header>
        <Modal.Title>Congratulations!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          You got it! Press "Share Results" to get a spoiler-free shareable
          copied to your clipboard.
        </p>
        <p className="text-primary">{copyText}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => copyToClipboard()}>Share Results</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WinModal;
