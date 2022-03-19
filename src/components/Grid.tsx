import { useEffect, useState } from "react";
import {
  flattenGridData,
  generateRowFromLetters,
  getGridRow,
  isGridRowWin,
  isValidKey,
} from "../utils/helpers";
import { GridData, LookupType } from "../utils/types";
import GridRow from "./GridRow";
import Keyboard from "./Keyboard";

type GridProps = {
  hexOfDay: string;
  handleWin: (gridData: GridData) => void;
  handleLose: (gridData: GridData) => void;
  dayKey: string;
};

const Grid = ({ hexOfDay, handleWin, handleLose, dayKey }: GridProps) => {
  // GridData stores all the grid data. Everything. Check types.ts for details.
  const [gridData, setGridData] = useState<GridData>(() => {
    const saved = localStorage.getItem(dayKey);
    return saved ? JSON.parse(saved) : [];
  });

  // Whenver gridData is updated, update localstorage.
  useEffect(() => {
    localStorage.setItem(dayKey, JSON.stringify(gridData));
  }, [gridData, dayKey]);

  // Keep track of the letters for the active row.
  const [currentRowLetters, setCurrentRowLetters] = useState<string[]>([]);
  // Which row is the user on?
  const currentRowIndex = gridData.length;

  /**
   * Handle a keypress or a on-screen keyboard press.
   */
  const handleKeyDownString = (key: string) => {
    const appendLetter = (newLetter: string) => {
      if (currentRowLetters.length >= 6) return;
      setCurrentRowLetters([...currentRowLetters, newLetter.toUpperCase()]);
    };

    const onBackspace = () => {
      if (currentRowLetters.length === 0) return;
      setCurrentRowLetters(currentRowLetters.slice(0, -1));
    };

    const onEnter = (submittedLetters: string[]) => {
      if (submittedLetters.length !== 6) return;
      const gridDataCopy = JSON.parse(JSON.stringify(gridData));
      const newGridRow = getGridRow(
        submittedLetters,
        hexOfDay.split(""),
        currentRowIndex
      );

      // Invalid hex code, do not do anything.
      if (!newGridRow) return;

      // Append the row to gridData.
      const newGridData: GridData = [...gridDataCopy, newGridRow];
      setGridData(newGridData);
      setCurrentRowLetters([]);

      if (isGridRowWin(newGridRow)) {
        handleWin(newGridData);
      } else if (currentRowIndex >= 5) {
        handleLose(newGridData);
      }
    };

    if (!isValidKey(key)) return;

    if (key === "Enter") {
      onEnter(currentRowLetters);
    } else if (key === "Backspace" || key === "Del") {
      onBackspace();
    } else {
      appendLetter(key);
    }
  };

  /**
   * Used for listening to keypresses. Dependency array is needed because of document.addEventListener.
   */
  useEffect(() => {
    const handleKeyDown = (e: any) => {
      handleKeyDownString(e.key);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentRowLetters]);

  // This useEffect checks on initialRender whether the user has won/lost, from localstorage.
  useEffect(() => {
    if (gridData[0] && isGridRowWin(gridData[gridData.length - 1])) {
      handleWin(gridData);
    } else if (currentRowIndex >= 5) {
      handleLose(gridData);
    }
  }, []);

  const keyboardLookup: LookupType = flattenGridData(gridData);

  console.log(gridData);

  return (
    <>
      <div className="letter-row-container">
        {Array(6)
          .fill("")
          .map((_, rowIndex: number) => {
            if (rowIndex < currentRowIndex) {
              return (
                <GridRow
                  tiles={gridData[rowIndex]}
                  key={rowIndex}
                  hexOfDay={hexOfDay}
                ></GridRow>
              );
            }
            const letters = rowIndex > currentRowIndex ? [] : currentRowLetters;
            return (
              <GridRow
                tiles={generateRowFromLetters(letters, rowIndex)}
                key={rowIndex}
                hexOfDay={hexOfDay}
              />
            );
          })}
      </div>
      <br />
      <Keyboard
        lookup={keyboardLookup}
        handleClick={(key) => handleKeyDownString(key)}
      />
    </>
  );
};

export default Grid;
