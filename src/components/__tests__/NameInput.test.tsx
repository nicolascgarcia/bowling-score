/* eslint-disable import/no-extraneous-dependencies */
import renderer from 'react-test-renderer';
import NameInput from '../NameInput';

describe('<NameInput/>', () => {
	it('should render NameInput', () => {
		const component = renderer.create(<NameInput />);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
