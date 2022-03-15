import { KEY_LAYOUT } from "../utils/helpers";
import { LookupType } from "../utils/types";
import KeyboardTile from "./KeyboardTile";

type KeyboardProps = {
  lookup: LookupType;
  handleClick: (key: string) => void;
};

const Keyboard = ({ lookup, handleClick }: KeyboardProps) => {
  const letterCells = KEY_LAYOUT.map((letterRow: string[], row: number) => {
    return (
      <div className="letter-row">
        {letterRow.map((letter: string, col: number) => (
          <KeyboardTile
            letter={letter}
            tileStatus={lookup[letter]}
            handleClick={(letter) => handleClick(letter)}
          />
        ))}
      </div>
    );
  });

  return <div className="letter-row-container">{letterCells}</div>;
};

export default Keyboard;
