import React, { useEffect } from "react";

type GridProps = {
  letters: string[][];
  setLetters: React.Dispatch<React.SetStateAction<string[][]>>;
  currCol: number;
  setCurrCol: React.Dispatch<React.SetStateAction<number>>;
  currRow: number;
  setCurrRow: React.Dispatch<React.SetStateAction<number>>;
  submitted: boolean[];
  setSubmitted: React.Dispatch<React.SetStateAction<boolean[]>>;
};
const Grid = ({
  letters,
  setLetters,
  currCol,
  setCurrCol,
  currRow,
  setCurrRow,
  submitted,
  setSubmitted,
}: GridProps) => {
  const hexChecker = (letterList: string[], row: number) => {
    if (letterList[0] !== "A") {
      window.alert("Not a valid hex code!");
      return false;
    } else {
      setSubmitted((curr: boolean[]) => {
        let changedCurr = [...curr];
        changedCurr[row] = true;
        return changedCurr;
      });
      return true;
    }
  };

  useEffect(() => {
    function handleKeyDown(e: any) {
      let copyLetters = JSON.parse(JSON.stringify(letters));
      if (e.key === "Enter") {
        if (!(currRow > 0 && currCol === 0)) return;
        hexChecker(letters[currRow - 1], currRow - 1);
        return;
      }

      if (e.key === "Backspace") {
        if (currCol === 0 && currRow === 0) {
          copyLetters[0][0] = "";
          setLetters(copyLetters);
          return;
        }
        if (currCol === 0 && currRow > 0 && submitted[currRow - 1]) {
          return;
        } else if (currCol === 0 && currRow > 0) {
          copyLetters[currRow - 1][5] = "";
          setCurrCol(5);
          setCurrRow(currRow - 1);
        } else {
          copyLetters[currRow][currCol - 1] = "";
          setCurrCol(currCol - 1);
        }
        setLetters(copyLetters);
        return;
      }

      if (currCol === 0 && currRow > 0 && !submitted[currRow - 1]) return;
      copyLetters[currRow][currCol] = e.key.toUpperCase();
      setLetters(copyLetters);
      if (currCol + 1 < 6) {
        setCurrCol(currCol + 1);
      } else {
        setCurrCol(0);
        setCurrRow(currRow + 1);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currRow, currCol, letters, submitted]);

  const cells = letters.map((letterRow: string[]) =>
    letterRow.map((letter: string) => (
      <div className="item">
        <span className="itemText">{letter}</span>
      </div>
    ))
  );

  return <div className="container">{cells}</div>;
};

export default Grid;
