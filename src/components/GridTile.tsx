import { GridTileStruct, TileStatus } from "../utils/types";

/**
 * Singular grid tile for a letter.
 */
const GridTile = ({ value, status, row, column }: GridTileStruct) => {
  return (
    <div
      className={`item ${
        status !== TileStatus.Unsubmitted && "submitted"
      }`}
      id={`${row}${column}`}
      style={{backgroundColor: status}}
    >
      <span className="itemText" id={`${row}${column}text`}>
        {value}
      </span>
    </div>
  );
};

export default GridTile;
