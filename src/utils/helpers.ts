import { GridRowData, GridTileStruct, TileStatus } from "../utils/types";

export const HEX_LENGTH = 6;

/**
 * Converts letters (either array of chars or string) to a hex code.
 */
export const toColourString = (letters: string[] | string) => {
  if (letters.length !== HEX_LENGTH) {
    return "";
  }
  if (Array.isArray(letters)) {
    return `#${letters.join("")}`;
  } else {
    return `#${letters}`;
  }
};

const validNumber = (letter: string) => {
  return letter >= "0" && letter <= "9";
};

const validLetter = (letter: string) => {
  return letter >= "A" && letter <= "F";
};

/**
 * Check if an entered keystroke is valid.
 */
export const isValidKey = (key: string): boolean => {
  const specialKeys = ["Backspace", "Enter", "Delete"];

  if (key.length === 1) {
    return validLetter(key.toUpperCase()) || validNumber(key);
  } else {
    return specialKeys.includes(key);
  }
};

/**
 * Given an array of submitted letters and the correct letters,
 * return an array representing the tile statuses (i.e find the colour of each tile)
 */
const getTileStatuses = (
  submittedLetters: string[],
  correctLetters: string[]
): TileStatus[] => {
  const lettersCopy = [...submittedLetters];
  const correctLettersCopy = [...correctLetters];
  const statuses = Array(HEX_LENGTH).fill(TileStatus.Incorrect);

  // Iterate through correct letters, check for green (correct) letters.
  correctLettersCopy.forEach((correctLetter: string, index: number) => {
    if (lettersCopy[index] === correctLetter) {
      statuses[index] = TileStatus.Correct;
      // Reset the letter so that it cannot be modified in the following loop.
      lettersCopy[index] = "";
      // Reset the correct letter to skip its iteration in the next loop
			// E.g We don't want the player to think there are 2 S's when there is only 1 S. 
			correctLettersCopy[index] = "";
    }
  });

  // Iterate through correct letters, check for yellow (partially correct) letters.
  correctLettersCopy.forEach((correctLetter: string, index: number) => {
		if (!correctLetter) return;
    const partiallyCorrectIndex = lettersCopy.findIndex(
      (letter) => letter === correctLetter
    );
    if (partiallyCorrectIndex !== -1) {
      // Mark as yellow if letter was found.
      statuses[partiallyCorrectIndex] = TileStatus.Partial;
			// Make sure the letter is not searched for again by unsetting it.
      lettersCopy[partiallyCorrectIndex] = "";
    }
  });

  return statuses;
};

/**
 * Check if an array of 6 letters forms a valid hex code.
 */
const isValidHex = (submittedLetters: string[]): boolean => {
  return (
    submittedLetters.every(
      (letter) => validLetter(letter.toUpperCase()) || validNumber(letter)
    ) && submittedLetters.length === HEX_LENGTH
  );
};

/**
 * Given an array of submitted letters and the correct letters,
 * generate the GridRowData.
 *
 * Returns null if submitted letters do not form a valid hex code.
 */
export const getGridRow = (
  submittedLetters: string[],
  correctLetters: string[],
  row: number
): GridRowData | null => {
  if (!isValidHex(submittedLetters)) return null;

  const tileStatuses: TileStatus[] = getTileStatuses(
    submittedLetters,
    correctLetters
  );

  return submittedLetters.map((letter: string, column: number) => {
    return {
      value: letter.toUpperCase(),
      status: tileStatuses[column],
      row,
      column,
    };
  });
};

/**
 * Check if a grid row represents a win.
 */
export const isGridRowWin = (gridRow: GridRowData): boolean => {
	return gridRow.every((tile: GridTileStruct) => tile.status === TileStatus.Correct);
}

/**
 * If the row is the currently active row, or a future row, we want to generate
 * a row since there is no existing data.
 */
export const generateRowFromLetters = (
  letters: string[],
  row: number
): GridRowData => {
  return Array(6)
    .fill("")
    .map((_, column: number) => {
      return {
        value: letters.length <= column ? "" : letters[column],
        status: TileStatus.Unsubmitted,
        row,
        column,
      };
    });
};
