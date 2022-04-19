/* eslint-disable import/no-extraneous-dependencies */
import { cleanup, fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import GameContext from '../../contexts/GameContext';
import Routes from '../../routes';
import Home from '../Home';

afterEach(cleanup);

describe('<Home/>', () => {
	it('should render Home', () => {
		const component = renderer.create(
			<GameContext>
				<MemoryRouter initialEntries={['/']}>
					<Routes />
				</MemoryRouter>
			</GameContext>
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('should add user to list', async () => {
		const { getByRole } = render(
			<MemoryRouter>
				<Home />
			</MemoryRouter>
		);

		const input = getByRole('textbox', {
			name: 'name-input',
		}) as HTMLInputElement;
		const name = 'John';

		fireEvent.change(input, {
			target: { value: name },
		});

		expect(input.value).toBe(name);

		fireEvent.click(getByRole('button', { name: '+' }));

		expect(getByRole('heading', { name })).toBeVisible();
		expect(input.value).toBe('');
	});

	it('should remove user from list', async () => {
		const { getByRole, queryByRole } = render(
			<GameContext>
				<MemoryRouter initialEntries={['/']}>
					<Routes />
				</MemoryRouter>
			</GameContext>
		);

		const input = getByRole('textbox', {
			name: 'name-input',
		}) as HTMLInputElement;
		const name = 'John';

		fireEvent.change(input, {
			target: { value: name },
		});

		expect(input.value).toBe(name);

		fireEvent.click(getByRole('button', { name: '+' }));

		expect(getByRole('heading', { name })).toBeVisible();
		expect(input.value).toBe('');

		fireEvent.click(getByRole('button', { name: '-' }));

		expect(queryByRole('heading', { name })).toBeNull();
	});

	it('should start a game', async () => {
		const { getByRole, queryByRole } = render(
			<GameContext>
				<MemoryRouter initialEntries={['/']}>
					<Routes />
				</MemoryRouter>
			</GameContext>
		);

		const input = getByRole('textbox', {
			name: 'name-input',
		}) as HTMLInputElement;
		const name = 'John';

		fireEvent.change(input, {
			target: { value: name },
		});

		expect(input.value).toBe(name);

		fireEvent.click(getByRole('button', { name: '+' }));

		expect(getByRole('heading', { name })).toBeVisible();
		expect(input.value).toBe('');

		fireEvent.click(getByRole('button', { name: 'start game' }));

		expect(
			queryByRole('heading', {
				name: 'Select the numbers of pins knocked down',
			})
		).toBeVisible();
	});
});
