import { GridData, GridRowData, TileStatus } from "./types";

const colorMapping: any = {
  [TileStatus.Correct]: "🟩",
  [TileStatus.Partial]: "🟨",
  [TileStatus.Incorrect]: "⬜",
};

/**
 * Gets the clipboard text to share.
 *
 * @param endingGrid Ending state of the board
 * @param isWin
 * @param hexleNumber Number associated with the daily hexle.
 */
const getClipboardText = (
  endingGrid: GridData,
  isWin: boolean,
  hexleNumber: number
): string => {
  let tries: string;

  // Lost
  if (!isWin) tries = "X";
  else {
    tries = endingGrid.length.toString();
  }
  let lettersText = `Hexle ${hexleNumber} ${tries}/6\nhttps://frankljin.github.io/hexle/\n`;

  // Loop over each row and reduce into a single string
  lettersText += endingGrid.map((row: GridRowData) => {
    // Get squares of each row
    return row
      .map((gridTile) => {
        return colorMapping[gridTile.status] || "⬜";
      })
      .join("");
  }).join('\n');

  return lettersText;
};

export { getClipboardText };
