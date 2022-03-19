export enum TileStatus {
	Correct,
	Partial,
	Incorrect,
	Unsubmitted
}

export let DarkTileStatus = {
	[TileStatus.Correct]: "#01b636",
	[TileStatus.Partial]: "#ffcc00",
	[TileStatus.Incorrect]: "#242526",
	[TileStatus.Unsubmitted]: "#3a3b3c"
}

export let LightTileStatus = {
	[TileStatus.Correct]: "#90ee90",
	[TileStatus.Partial]: "#fffcbb",
	[TileStatus.Incorrect]: "#c1c1c1",
	[TileStatus.Unsubmitted]: "#f1f1f1"
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