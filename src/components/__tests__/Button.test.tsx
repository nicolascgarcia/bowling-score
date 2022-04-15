/* eslint-disable import/no-extraneous-dependencies */
import renderer from 'react-test-renderer';
import Button from '../Button';

describe('<Button/>', () => {
	it('should render Button', () => {
		const component = renderer.create(<Button>Jest</Button>);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
