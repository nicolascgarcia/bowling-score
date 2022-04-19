/* eslint-disable import/no-extraneous-dependencies */
import { createRef } from 'react';
import renderer from 'react-test-renderer';
import {
	Score,
	ScoreType,
	Player,
} from '../../contexts/GameContext/gameContext.types';
import PlayerRounds from '../PlayerRounds';

describe('<PlayerRounds/>', () => {
	it('should render PlayerRounds', () => {
		const ref = createRef<HTMLDivElement>();
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

		const player: Player = {
			name: 'Nicolas',
			photo: '',
			scores,
			currentRound: 0,
			ended: false,
			hdcp: 0,
		};

		const component = renderer.create(
			<PlayerRounds
				currentPlayer={0}
				user={player}
				playerRef={ref}
				userIndex={0}
			/>
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
