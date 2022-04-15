/* eslint-disable import/no-extraneous-dependencies */
import renderer from 'react-test-renderer';
import Score from '../Score';

describe('<Score/>', () => {
	it('should render Score', () => {
		const component = renderer.create(<Score />);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
