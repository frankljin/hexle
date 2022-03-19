import { Modal } from "react-bootstrap";

type AboutModalProps = {
  showAboutModal: boolean;
  handleCloseAbout: () => void;
};

const AboutModal = ({ showAboutModal, handleCloseAbout }: AboutModalProps) => {
  return (
    <Modal show={showAboutModal} onHide={handleCloseAbout} class="game-modal">
      <Modal.Header>
        <Modal.Title>How to play</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Guess the hex code in six tries. <br />
          <br />
          Each guess must be a valid hex code (Each of the 6 characters must be
          either between A-F or 0-9). <br />
          <br />
          After each guess, the color of the tiles will change to show how close
          your guess was to the answer. <br />
          <br />
          Green tiles indicate that the letter/number is in the right position,
          and yellow tiles indicate that the letter/number is within the hex
          code but not in the right position.
          <br />
          <br />
          There will be a new hex code to guess every day. Hint: the solution is
          the colour of Hexle :)
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default AboutModal;
