import { RefObject } from 'react';
import { Player } from '../../contexts/GameContext/gameContext.types';
import Container from '../Container';
import ScoreColumn from '../ScoreColumn';
import UserName from '../UserName';

type PlayerRoundsProps = {
	user: Player;
	userIndex: number;
	playerRef: RefObject<HTMLDivElement>;
	currentPlayer: number;
};

export default function PlayerRounds({
	user,
	userIndex,
	playerRef,
	currentPlayer,
}: PlayerRoundsProps) {
	return (
		<Container
			ref={playerRef}
			minWidth='1500px'
			bg='#121214'
			borderWidth={currentPlayer === userIndex ? '3px' : '0px'}
			borderStyle='solid'
			borderColor='#8257e5'
			display='flex'
			flexDirection='column'
			mb={4}
			p={3}
			borderRadius='10px'
		>
			<Container width={1} display='flex' alignItems='center'>
				<img src={user.photo} alt={user.name} width={50} height={50} />
				<Container ml={3}>
					<UserName>{user.name}</UserName>
				</Container>
			</Container>
			<Container
				display='flex'
				borderColor='gray'
				borderWidth='2px'
				borderStyle='solid'
				borderRadius='10px'
			>
				{user.scores.map((score, scoreIndex) => (
					<ScoreColumn
						key={`${Math.random() * scoreIndex}`}
						currentRound={user.currentRound}
						scoreIndex={scoreIndex}
						currentPlayer={currentPlayer}
						userIndex={userIndex}
						scoreType={score.type}
						firstShot={score.firstShot}
						secondShot={score.secondShot}
						thirdShot={score.thirdShot}
						score={score.score}
					/>
				))}
				<Container
					display='flex'
					flex={1}
					flexDirection='column'
					borderRightColor='gray'
					borderRightWidth='2px'
					borderRightStyle='solid'
				>
					<Container
						width={1}
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
							HDCP SCORE
						</h1>
					</Container>
					<Container
						display='flex'
						alignItems='center'
						justifyContent='center'
						flex={1}
					>
						<h1 style={{ color: '#fff' }}>{user.hdcp}</h1>
					</Container>
				</Container>
			</Container>
		</Container>
	);
}
