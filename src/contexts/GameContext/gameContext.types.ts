export type User = {
	photo: string;
	name: string;
};

// eslint-disable-next-line no-shadow
export enum ScoreType {
	'NORMAL',
	'STRIKE',
	'SPAIR',
}

export type Score = {
	firstShot: number;
	secondShot: number;
	thirdShot?: number;
	score: number;
	shots: number;
	type: ScoreType;
};

export type Player = User & {
	scores: Score[];
	currentRound: number;
	ended: boolean;
	hdcp: number;
};

export type ContextType = {
	addPlayers: Function;
	userPlay: Function;
	players: Player[];
	currentPlayer: number;
	pins: null[];
	gameEnded: boolean;
};
