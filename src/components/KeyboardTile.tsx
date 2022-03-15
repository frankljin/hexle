import { TileStatus } from "../utils/types";

type KeyboardTileProps = {
  letter: string;
  tileStatus: TileStatus;
  handleClick: (letter: string) => void;
};

const KeyboardTile = ({
  letter,
  tileStatus,
  handleClick,
}: KeyboardTileProps) => {
  return (
    <div
      className="item letter"
      onClick={() => handleClick(letter)}
      style={{ backgroundColor: tileStatus }}
    >
      <span className="letterText">{letter}</span>
    </div>
  );
};

export default KeyboardTile;
