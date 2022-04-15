/* eslint-disable import/no-extraneous-dependencies */
import renderer from 'react-test-renderer';
import UserName from '../UserName';

describe('<UserName/>', () => {
	it('should render UserName', () => {
		const component = renderer.create(<UserName />);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
