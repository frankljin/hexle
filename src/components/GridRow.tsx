import { toColourString } from "../utils/helpers";
import { GridRowData, GridTileStruct, TileStatus } from "../utils/types";
import GridTile from "./GridTile";

type GridRowProps = {
  tiles: GridRowData;
};

/**
 * Dumb row component used solely for rendering.
 */
const GridRow = ({ tiles }: GridRowProps) => {
  return (
    <div className="letter-row">
      {tiles.map((tile: GridTileStruct, col: number) => (
        <GridTile key={col} {...tile} />
      ))}
      <div className="separator" />
      <div
        className={`item color-cell`}
        style={
          tiles[0].status !== TileStatus.Unsubmitted
            ? {
                backgroundColor: toColourString(tiles.map(tile => tile.value)),
              }
            : {}
        }
      />
    </div>
  );
};

export default GridRow;
