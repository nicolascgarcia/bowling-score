/* eslint-disable import/no-extraneous-dependencies */
import { cleanup, fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Home from '../Home';

afterEach(cleanup);

describe('<Home/>', () => {
	it('should render Home', () => {
		const component = renderer.create(<Home />);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('should add user to list', async () => {
		const { getByRole } = render(<Home />);

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
		const { getByRole, queryByRole } = render(<Home />);

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
});
