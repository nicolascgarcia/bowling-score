/* eslint-disable import/no-extraneous-dependencies */
import renderer from 'react-test-renderer';
import {
	Score,
	ScoreType,
	Player,
} from '../../contexts/GameContext/gameContext.types';
import ScoreColumn from '../ScoreColumn';

describe('<ScoreColumn/>', () => {
	it('should render ScoreColumn', () => {
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
			<ScoreColumn
				currentPlayer={0}
				userIndex={0}
				currentRound={player.currentRound}
				firstShot={player.scores[0].firstShot}
				score={player.scores[0].score}
				scoreIndex={0}
				scoreType={player.scores[0].type}
				secondShot={player.scores[0].secondShot}
				thirdShot={player.scores[0].thirdShot}
			/>
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
