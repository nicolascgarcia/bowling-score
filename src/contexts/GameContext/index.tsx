import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
	ContextType,
	Player,
	Score,
	ScoreType,
	User,
} from './gameContext.types';

export const GameContext = createContext<ContextType>({
	addPlayers: () => {},
	userPlay: () => {},
	players: [],
	currentPlayer: 0,
	pins: [],
	gameEnded: false,
});

export const useGame = () => useContext<ContextType>(GameContext);

export default function GameManager({ children }: { children: any }) {
	const [players, setPlayers] = useState<Player[]>([]);
	const [currentPlayer, setCurrentPlayer] = useState<number>(0);
	const [pins, setPins] = useState<null[]>(new Array(10).fill(null));
	const [gameEnded, setGameEnded] = useState<boolean>(false);

	const addPlayers = (users: User[]): void => {
		const newPlayers = users.map((user) => {
			const scores: Score[] = new Array(9).fill(null).map(() => ({
				firstShot: 0,
				secondShot: 0,
				score: 0,
				shots: 0,
				type: ScoreType.NORMAL,
			}));

			scores.push({
				firstShot: 0,
				secondShot: 0,
				thirdShot: 0,
				score: 0,
				shots: 0,
				type: ScoreType.NORMAL,
			});

			return {
				...user,
				scores,
				currentRound: 0,
				ended: false,
				hdcp: 0,
			};
		});

		setPlayers(newPlayers);
	};

	const verifyGameEnded = (): void => {
		const playingPlayers = players.filter((player) => player.ended === false);
		if (playingPlayers.length === 0 && players.length > 0) {
			setGameEnded(true);
		}
	};

	const userPlay = (pinsDown: number) => {
		const allPlayers = [...players];

		const currentPlayerScore = allPlayers[currentPlayer];
		const { currentRound } = currentPlayerScore;

		const scores = [...currentPlayerScore.scores];

		const nextPlayer =
			players.length - 1 === currentPlayer ? 0 : currentPlayer + 1;

		switch (scores[currentRound].shots) {
			case 0: {
				scores[currentRound].firstShot = pinsDown;
				scores[currentRound].shots = 1;

				setPins(new Array(10 - pinsDown).fill(null));

				if (pinsDown === 10) {
					scores[currentRound].type = ScoreType.STRIKE;
					setPins(new Array(10).fill(null));

					if (currentRound !== 9) {
						currentPlayerScore.currentRound = currentRound + 1;
						setCurrentPlayer(nextPlayer);

						setPins(new Array(10).fill(null));
					}
				}

				currentPlayerScore.scores = scores;
				allPlayers[currentPlayer] = currentPlayerScore;

				setPlayers(allPlayers);

				break;
			}
			case 1: {
				const totalRoundPoints = scores[currentRound].firstShot + pinsDown;

				scores[currentRound].secondShot = pinsDown;
				scores[currentRound].shots = 2;

				if (currentRound === 9) {
					if (scores[currentRound].type !== ScoreType.STRIKE) {
						if (totalRoundPoints === 10) {
							scores[currentRound].type = ScoreType.SPAIR;
							setPins(new Array(10).fill(null));
						} else {
							scores[currentRound].score = totalRoundPoints;
							currentPlayerScore.ended = true;

							setCurrentPlayer(nextPlayer);

							setPins(new Array(10).fill(null));
						}
					}
				} else {
					if (totalRoundPoints === 10) {
						scores[currentRound].type = ScoreType.SPAIR;
					} else {
						scores[currentRound].score = totalRoundPoints;
					}

					currentPlayerScore.currentRound = currentRound + 1;

					setCurrentPlayer(nextPlayer);

					setPins(new Array(10).fill(null));
				}

				currentPlayerScore.scores = scores;
				allPlayers[currentPlayer] = currentPlayerScore;

				setPlayers(allPlayers);
				break;
			}
			case 2: {
				scores[currentRound].thirdShot = pinsDown;
				scores[currentRound].shots = 3;

				currentPlayerScore.scores = scores;
				currentPlayerScore.ended = true;

				allPlayers[currentPlayer] = currentPlayerScore;

				setPlayers(allPlayers);
				setCurrentPlayer(nextPlayer);

				setPins(new Array(10).fill(null));
				break;
			}
			default: {
				break;
			}
		}

		const newScores = scores.map((score, index) => {
			switch (score.type) {
				case ScoreType.SPAIR: {
					const addPoints =
						index === 9
							? scores[index].thirdShot || 0
							: scores[index + 1].firstShot;
					return {
						...score,
						score: 10 + addPoints,
					};
				}
				case ScoreType.STRIKE: {
					if (index === 9) {
						const testss =
							scores[index].secondShot + (scores[index].thirdShot || 0);

						return {
							...score,
							score: 10 + testss,
						};
					}

					const newAddPoints =
						scores[index + 1].type !== ScoreType.STRIKE
							? scores[index + 1].firstShot + scores[index + 1].secondShot
							: scores[index + 1].firstShot + scores[index + 2].firstShot;

					return {
						...score,
						score: 10 + newAddPoints,
					};
				}
				default: {
					return score;
				}
			}
		});

		const allTotals = newScores.map((score) => score.score);
		const totalScore = allTotals.reduce((prev, curr) => prev + curr);

		currentPlayerScore.scores = newScores;
		currentPlayerScore.hdcp = totalScore;
		allPlayers[currentPlayer] = currentPlayerScore;

		setPlayers(allPlayers);
		verifyGameEnded();
	};

	useEffect(() => {
		setPins(new Array(10).fill(null));
	}, [currentPlayer]);

	const value = useMemo<ContextType>(
		() => ({
			pins,
			players,
			userPlay,
			gameEnded,
			addPlayers,
			currentPlayer,
		}),
		[players, currentPlayer]
	);

	return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
