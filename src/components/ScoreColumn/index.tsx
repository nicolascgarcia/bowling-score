import { useMemo } from 'react';
import { ScoreType } from '../../contexts/GameContext/gameContext.types';
import Container from '../Container';

type ScoreColumnProps = {
	currentRound: number;
	scoreIndex: number;
	currentPlayer: number;
	userIndex: number;
	scoreType: ScoreType;
	firstShot: number;
	secondShot: number;
	thirdShot: number | undefined;
	score: number;
};

export default function ScoreColumn({
	currentRound,
	scoreIndex,
	currentPlayer,
	userIndex,
	scoreType,
	firstShot,
	secondShot,
	thirdShot,
	score,
}: ScoreColumnProps) {
	const handleSecondShot = useMemo(() => {
		if (currentRound !== 9) {
			if (scoreType === ScoreType.NORMAL) {
				return secondShot;
			}
			if (scoreType === ScoreType.SPAIR) {
				return '/';
			}
			return 'X';
		}
		return secondShot;
	}, [currentRound, scoreType, secondShot]);

	return (
		<Container
			flex={1}
			display='flex'
			flexWrap='wrap'
			borderRightColor='gray'
			borderRightWidth='2px'
			borderRightStyle='solid'
			bg={
				currentRound === scoreIndex && currentPlayer === userIndex
					? '#8257e5'
					: undefined
			}
		>
			<Container
				width={1}
				display='flex'
				flexDirection='column'
				justifyContent='center'
				alignItems='center'
				borderBottomColor='gray'
				borderBottomWidth='2px'
				borderBottomStyle='solid'
			>
				<h1
					style={{
						textAlign: 'center',
						fontWeight: 'bold',
						color: '#fff',
					}}
				>
					{scoreIndex + 1}
				</h1>
				{scoreType !== ScoreType.NORMAL && (
					<Container
						bg={scoreType === ScoreType.STRIKE ? 'blue' : 'orange'}
						width={1}
						display='flex'
						justifyContent='center'
						py={1}
					>
						<span
							style={{
								color: '#fff',
								textTransform: 'uppercase',
								fontWeight: 'bold',
							}}
						>
							{scoreType === ScoreType.STRIKE ? 'strike' : 'spair'}
						</span>
					</Container>
				)}
			</Container>
			<Container flex={1} display='flex' flexDirection='column'>
				<Container display='flex' flexWrap='nowrap'>
					<Container width={1 / 2}>
						<h2 style={{ textAlign: 'center', color: '#fff' }}>{firstShot}</h2>
					</Container>
					<Container
						width={1 / 2}
						display='flex'
						justifyContent='space-around'
						borderBottomColor='gray'
						borderBottomWidth='2px'
						borderBottomStyle='solid'
						borderLeftColor='gray'
						borderLeftWidth='2px'
						borderLeftStyle='solid'
						borderBottomLeftRadius='10px'
					>
						<h2 style={{ textAlign: 'center', color: '#fff' }}>
							{handleSecondShot}
						</h2>
						{(thirdShot || thirdShot === 0) && (
							<h2 style={{ textAlign: 'center', color: '#fff' }}>
								{thirdShot}
							</h2>
						)}
					</Container>
				</Container>
				<Container
					width={1}
					flex={1}
					display='flex'
					flexDirection='column'
					justifyContent='center'
					alignItems='center'
				>
					<h2 style={{ color: '#fff' }}>{score}</h2>
				</Container>
			</Container>
		</Container>
	);
}
