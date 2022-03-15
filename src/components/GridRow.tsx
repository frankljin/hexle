import { toColourString } from "../utils/helpers";
import { GridRowData, GridTileStruct, TileStatus } from "../utils/types";
import GridTile from "./GridTile";

type GridRowProps = {
  tiles: GridRowData;
  hexOfDay: string;
};

/**
 * Dumb row component used solely for rendering.
 */
const GridRow = ({ tiles, hexOfDay }: GridRowProps) => {
  return (
    <div className="letter-row">
      {tiles.map((tile: GridTileStruct, col: number) => (
        <GridTile key={col} {...tile} />
      ))}
      <div className="separator" />
      <div
        className={`item color-cell ${
          tiles[0].status !== TileStatus.Unsubmitted ? "submitted" : ""
        }`}
      >
        <div
          className="inner-color-tile"
          style={
            tiles[0].status !== TileStatus.Unsubmitted
              ? {
                  backgroundColor: toColourString(
                    tiles.map((tile) => tile.value)
                  ),
                }
              : {}
          }
        ></div>
        <div
          className="inner-color-tile"
          style={
            tiles[0].status !== TileStatus.Unsubmitted
              ? { backgroundColor: toColourString(hexOfDay) }
              : {}
          }
        ></div>
      </div>
    </div>
  );
};

export default GridRow;
