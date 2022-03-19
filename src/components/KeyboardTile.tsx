import { TileStatus, DarkTileStatus, LightTileStatus } from "../utils/types";

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
  const darkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  return (
    <div
      className="item letter"
      onClick={() => handleClick(letter)}
      style={
        darkMode
          ? { backgroundColor: DarkTileStatus[tileStatus] }
          : { backgroundColor: LightTileStatus[tileStatus] }
      }
    >
      <span className="letterText">{letter}</span>
    </div>
  );
};

export default KeyboardTile;
