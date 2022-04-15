/* eslint-disable import/no-extraneous-dependencies */
import renderer from 'react-test-renderer';
import Container from '../Container';

describe('<Container/>', () => {
	it('should render Container', () => {
		const component = renderer.create(<Container />);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
