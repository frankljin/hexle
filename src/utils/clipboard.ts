// Holy this is yucky
const colorMapping: any = {
	"rgb(144, 238, 144)": "🟩",
	"rgb(255, 252, 187)": "🟨",
	"rgb(225, 225, 225)": "⬜",
};

/**
 * Gets the clipboard text to share.
 * 
 * @param letters Letters of the board
 * @param isWin 
 * @param hexleNumber Number associated with the daily hexle.
 */
const getClipboardText = (letters: string[][], isWin: boolean, hexleNumber: number): string => {
	let tries: string | number;
	if (!isWin) tries = "X";
	else {
		tries = letters.findIndex((row) => row[0] === "");
		// If empty row not found, this is a win in 6 guesses.
		tries = tries === -1 ? 6 : tries;
	}
	let lettersText = `Hexle${hexleNumber} ${tries}/6\n`;

	lettersText += letters.reduce((prevValue, row, i) => {
		const squares = row
			.map((letter, j) => {
				const color = document.getElementById(i.toString() + j.toString())!
					.style.backgroundColor;
				return colorMapping[color] || "⬜";
			})
			.join("");
		return `${prevValue}${squares}\n`;
	}, "");

	return lettersText;
};

export { getClipboardText };