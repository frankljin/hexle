export enum TileStatus {
	Correct = "#90ee90",
	Partial = "#fffcbb",
	Incorrect = "#c1c1c1",
	Unsubmitted = "#f1f1f1"
}

export interface GridTileStruct {
	value: string,
	status: TileStatus,
	row: number,
	column: number
}
export interface KeyboardTileStruct {
	value: string,
	status: TileStatus,
}

export type LookupType = {
	[key: string]: TileStatus;
}

export type GridRowData = GridTileStruct[];

export type GridData = GridRowData[];