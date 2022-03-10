export enum TileStatus {
	Correct = "#90ee90",
	Partial = "#fffcbb",
	Incorrect = "#e1e1e1",
	Unsubmitted = "#f1f1f1"
}

export interface GridTileStruct {
  value: string,
  status: TileStatus,
	row: number,
	column: number
}

export type GridRowData = GridTileStruct[];

export type GridData = GridRowData[];