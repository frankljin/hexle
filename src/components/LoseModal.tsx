import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import internal from "stream";

type LoseModalProps = {
  lose: boolean;
  letters: string[][];
  hexOfDay: string;
  hexleNumber: number;
};

const LoseModal = ({ lose, letters, hexOfDay, hexleNumber }: LoseModalProps) => {
  const [showLoseModal, setShowLoseModal] = useState(true);
  const [copyText, setCopyText] = useState("");
  const handleCloseLose = () => {
    setShowLoseModal(false);
  };

  const copyToClipboard = () => {
    let lettersText = "Hexle " + hexleNumber + " X/6\n";
    for (let i = 0; i < 6; i++) {
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
    <Modal show={lose && showLoseModal} onHide={handleCloseLose}>
      <Modal.Header>
        <Modal.Title>Better luck tomorrow!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          The answer was #{hexOfDay}! Press "Share Results" to get a spoiler-free shareable
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

export default LoseModal;
