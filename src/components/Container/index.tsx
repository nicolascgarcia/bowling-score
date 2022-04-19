import styled from 'styled-components';
import {
	background,
	border,
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

export default styled.div<CustomViewProps>`
	${background} ${border} ${color} ${flexbox} ${layout} ${space}

	::-webkit-scrollbar {
		width: 10px;
		height: 10px;
	}

	::-webkit-scrollbar-track {
		box-shadow: inset 0 0 5px grey;
		border-radius: 10px;
	}

	::-webkit-scrollbar-thumb {
		background: #8257e5;
		border-radius: 10px;
	}

	::-webkit-scrollbar-thumb:hover {
		background: #6946b9;
	}

	::-webkit-scrollbar-corner {
		display: none;
	}
`;
