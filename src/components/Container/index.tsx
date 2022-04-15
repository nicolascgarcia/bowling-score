import styled from 'styled-components';
import {
	background,
	border,
	compose,
	color,
	flexbox,
	layout,
	space,
	BackgroundProps,
	BorderProps,
	ColorProps,
	LayoutProps,
	FlexboxProps,
	SpaceProps,
} from 'styled-system';

type CustomViewProps = BackgroundProps &
	BorderProps &
	ColorProps &
	FlexboxProps &
	LayoutProps &
	SpaceProps;

export default styled.div<CustomViewProps>(
	compose(background, border, color, flexbox, layout, space)
);
