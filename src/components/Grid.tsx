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
  win: boolean;
  setWin: React.Dispatch<React.SetStateAction<boolean>>;
  setLose: React.Dispatch<React.SetStateAction<boolean>>;
  hexOfDay: string;
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
  win,
  setWin,
  setLose,
  hexOfDay,
}: GridProps) => {
  const validNumber = (letter: string) => {
    return letter >= "0" && letter <= "9";
  };

  const validLetter = (letter: string) => {
    return letter >= "A" && letter <= "F";
  };

  const keys = [
    ["A", "B", "C", "D", "E", "F"],
    ["0", "1", "2", "3", "4", "5"],
    ["Delete", "6", "7", "8", "9", "Enter"],
  ];

  const checkIfAnswer = (
    letterlist: string[],
    row: number,
    hexOfDay: string
  ) => {
    let currHex = "#";
    for (let i = 0; i < 6; i++) {
      currHex += letters[row][i];
    }

    let letterCounts = new Map<string, any>();
    for (let i = 0; i < 6; i++) {
      if (letterCounts.has(hexOfDay[i])) {
        letterCounts.set(hexOfDay[i], letterCounts.get(hexOfDay[i]) + 1);
      } else {
        letterCounts.set(hexOfDay[i], 1);
      }
    }
    for (let i = 0; i < 6; i++) {
      if (letterlist[i] === hexOfDay[i]) {
        document.getElementById(
          row.toString() + i.toString()
        )!.style.backgroundColor = "#90ee90";
        letterCounts.set(letterlist[i], letterCounts.get(letterlist[i]) - 1);
      }
    }
    for (let i = 0; i < 6; i++) {
      if (
        letterCounts.has(letterlist[i]) &&
        letterCounts.get(letterlist[i]) > 0 &&
        document.getElementById(row.toString() + i.toString())!.style
          .backgroundColor !== "rgb(144, 238, 144)"
      ) {
        document.getElementById(
          row.toString() + i.toString()
        )!.style.backgroundColor = "#fffcbb";
        letterCounts.set(letterlist[i], letterCounts.get(letterlist[i]) - 1);
      }
    }
    for (let i = 0; i < 6; i++) {
      if (!letterCounts.has(letterlist[i])) {
        for (let j = 0; j < 3; j++) {
          for (let k = 0; k < 6; k++) {
            if (keys[j][k] === letterlist[i]) {
              document.getElementById(
                letterlist[i] + "Color"
              )!.style.backgroundColor = "#bbbbbb";
            }
          }
        }
      }
    }
    for (let i = 0; i < 6; i++) {
      if (letterlist[i] !== hexOfDay[i]) {
        if (row === 5) setLose(true);
        return;
      }
    }
    setWin(true);
  };

  const isValidHex = (letterlist: string[], row: number) => {
    for (let i = 0; i < letterlist.length; i++) {
      if (!validNumber(letterlist[i]) && !validLetter(letterlist[i]))
        return false;
    }
    checkIfAnswer(letterlist, row, hexOfDay);
    return true;
  };

  const manageInput = (letterList: string[], row: number) => {
    if (!isValidHex(letterList, row)) {
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

  const handleKeyDownString = (key: string) => {
    if (win) return;
    if (
      !(key >= "A" && key <= "F" && key.length === 1) &&
      !(key >= "a" && key <= "f" && key.length === 1) &&
      !(key >= "0" && key <= "9" && key.length === 1) &&
      key !== "Backspace" &&
      key !== "Enter" &&
      key !== "Delete"
    )
      return;
    let copyLetters = JSON.parse(JSON.stringify(letters));
    if (key === "Enter") {
      if (!(currRow > 0 && currCol === 0)) return;
      manageInput(letters[currRow - 1], currRow - 1);
      return;
    }

    if (key === "Backspace" || key === "Delete") {
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
    copyLetters[currRow][currCol] = key.toUpperCase();
    setLetters(copyLetters);
    if (currCol + 1 < 6) {
      setCurrCol(currCol + 1);
    } else {
      setCurrCol(0);
      setCurrRow(currRow + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      handleKeyDownString(e.key);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currRow, currCol, letters, submitted]);

  const cells = letters.map((letterRow: string[], row: number) => {
    return (
      <div className="letter-row">
        {letterRow.map((letter: string, col: number) => (
          <div
            className={`item ${submitted[row] && "submitted"}`}
            id={`${row}${col}`}
          >
            <span className="itemText" id={`${row}${col}text`}>
              {letter}
            </span>
          </div>
        ))}
        <div
          style={{
            margin: "0px 5px",
            borderRight: "2px solid #BBBBBB",
          }}
        />
        <div
          className={`item color-cell`}
          style={
            submitted[row]
              ? {
                  backgroundColor: `#${letterRow.join("")}`,
                }
              : {}
          }
        />
      </div>
    );
  });

  const letterCells = keys.map((letterRow: string[], row: number) => {
    return (
      <div className="letter-row">
        {letterRow.map((letter: string, col: number) => (
          <div
            className="item letter"
            id={`${letter}Color`}
            onClick={() => handleKeyDownString(letter)}
          >
            <span className="letterText">{letter}</span>
          </div>
        ))}
      </div>
    );
  });

  return (
    <>
      <div className="letter-row-container">{cells}</div>
      <br />
      <div className="letter-row-container">{letterCells}</div>
    </>
  );
};

export default Grid;
