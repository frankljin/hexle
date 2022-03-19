import {
  GridTileStruct,
  TileStatus,
  LightTileStatus,
  DarkTileStatus,
} from "../utils/types";

/**
 * Singular grid tile for a letter.
 */
const GridTile = ({ value, status, row, column }: GridTileStruct) => {
  const darkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  return (
    <div
      className={`item ${status !== TileStatus.Unsubmitted && "submitted"}`}
      id={`${row}${column}`}
      style={
        darkMode
          ? { backgroundColor: DarkTileStatus[status] }
          : { backgroundColor: LightTileStatus[status] }
      }
    >
      <span className="itemText" id={`${row}${column}text`}>
        {value}
      </span>
    </div>
  );
};

export default GridTile;
