import styled from 'styled-components';
import {
	layout,
	LayoutProps,
	typography,
	TypographyProps,
} from 'styled-system';

type ButtonProps = TypographyProps & LayoutProps;

export default styled.button<ButtonProps>`
	min-width: 50px;
	height: 50px;
	background-color: #8257e5;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	border: none;
	color: #fff;
	font-weight: bold;
	font-size: 22px;
	text-transform: uppercase;
	${layout}
	${typography}

  :hover {
		background-color: #6946b9;
	}
`;
