/* eslint-disable import/no-extraneous-dependencies */
import renderer from 'react-test-renderer';
import Rank from '../Rank';

describe('<Rank/>', () => {
	it('should render Rank', () => {
		const component = renderer.create(<Rank />);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
