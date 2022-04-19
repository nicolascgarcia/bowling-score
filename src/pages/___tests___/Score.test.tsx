/* eslint-disable import/no-extraneous-dependencies */
import { fireEvent, render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Score from '../Score';
import GameContext from '../../contexts/GameContext';
import Routes from '../../routes';

window.HTMLElement.prototype.scrollIntoView = () => {};

let componentRender: RenderResult;

beforeEach(() => {
	componentRender = render(
		<GameContext>
			<MemoryRouter initialEntries={['/']}>
				<Routes />
			</MemoryRouter>
		</GameContext>
	);

	const input = componentRender.getByRole('textbox', {
		name: 'name-input',
	}) as HTMLInputElement;

	fireEvent.change(input, {
		target: { value: 'John' },
	});
	fireEvent.click(componentRender.getByRole('button', { name: '+' }));

	fireEvent.click(componentRender.getByRole('button', { name: 'start game' }));
});

describe('<Score/>', () => {
	it('should render Score', () => {
		const component = renderer.create(
			<MemoryRouter>
				<Score />
			</MemoryRouter>
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('should score points', async () => {
		fireEvent.click(componentRender.getByRole('button', { name: '5' }));

		const firstShot = componentRender.getByRole('heading', {
			name: 'firstshot-user0-score0',
		});
		expect(firstShot).toHaveTextContent('5');

		fireEvent.click(componentRender.getByRole('button', { name: '2' }));

		const secondShot = componentRender.getByRole('heading', {
			name: 'secondshot-user0-score0',
		});
		expect(secondShot).toHaveTextContent('2');

		const score = componentRender.getByRole('heading', {
			name: 'score-user0-score0',
		});
		expect(score).toHaveTextContent('7');
	});

	it('should score a spair', async () => {
		fireEvent.click(componentRender.getByRole('button', { name: '5' }));

		const firstShot = componentRender.getByRole('heading', {
			name: 'firstshot-user0-score0',
		});
		expect(firstShot).toHaveTextContent('5');

		fireEvent.click(componentRender.getByRole('button', { name: '5' }));

		const secondShot = componentRender.getByRole('heading', {
			name: 'secondshot-user0-score0',
		});
		expect(secondShot).toHaveTextContent('/');

		const score = componentRender.getByRole('heading', {
			name: 'score-user0-score0',
		});
		expect(score).toHaveTextContent('10');

		fireEvent.click(componentRender.getByRole('button', { name: '4' }));

		const secondScoreFirstShot = componentRender.getByRole('heading', {
			name: 'firstshot-user0-score1',
		});
		expect(secondScoreFirstShot).toHaveTextContent('4');

		expect(score).toHaveTextContent('14');
	});

	it('should score a strike', async () => {
		fireEvent.click(componentRender.getByRole('button', { name: '10' }));

		const firstShot = componentRender.getByRole('heading', {
			name: 'firstshot-user0-score0',
		});
		expect(firstShot).toHaveTextContent('10');

		const secondShot = componentRender.getByRole('heading', {
			name: 'secondshot-user0-score0',
		});
		expect(secondShot).toHaveTextContent('X');

		const score = componentRender.getByRole('heading', {
			name: 'score-user0-score0',
		});
		expect(score).toHaveTextContent('10');

		fireEvent.click(componentRender.getByRole('button', { name: '3' }));

		const secondScoreFirstShot = componentRender.getByRole('heading', {
			name: 'firstshot-user0-score1',
		});
		expect(secondScoreFirstShot).toHaveTextContent('3');

		expect(score).toHaveTextContent('13');

		fireEvent.click(componentRender.getByRole('button', { name: '6' }));

		const secondScoreSecondShot = componentRender.getByRole('heading', {
			name: 'secondshot-user0-score1',
		});

		expect(secondScoreSecondShot).toHaveTextContent('6');

		expect(score).toHaveTextContent('19');
	});
});
