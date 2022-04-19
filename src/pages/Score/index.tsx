import { createRef, RefObject, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, PlayerRounds, UserName } from '../../components';
import { useGame } from '../../contexts/GameContext';
import scoreRankSort from '../../utils/scoreRankSort';

export default function Score() {
	const { players, userPlay, currentPlayer, pins, gameEnded } = useGame();

	const navigate = useNavigate();

	const [playerRef, setPlayerRefs] = useState<RefObject<HTMLDivElement>[]>([]);
	const playersLength = useMemo(() => players.length, [players]);

	const scoreRank = useMemo(() => scoreRankSort(players), [gameEnded]);

	useEffect(() => {
		if (playersLength === 0) {
			navigate('/');
		}

		setPlayerRefs((ref) =>
			new Array(playersLength)
				.fill(null)
				.map((_, i) => ref[i] || createRef<HTMLDivElement>())
		);
	}, [playersLength]);

	useEffect(() => {
		if (playerRef[currentPlayer] && playerRef[currentPlayer].current) {
			playerRef[currentPlayer]!.current!.scrollIntoView({
				behavior: 'smooth',
			});
		}
	}, [currentPlayer]);

	return (
		<Container
			bg='#0a0906'
			minHeight='100vh'
			display='flex'
			flexDirection='column'
			px={3}
		>
			<Container
				py={4}
				px={2}
				display='flex'
				flexDirection='column'
				height='50vh'
				overflow='auto'
				overflowX='auto'
			>
				{players.map((user, userIndex) => (
					<PlayerRounds
						playerRef={playerRef[userIndex]}
						userIndex={userIndex}
						user={user}
						currentPlayer={currentPlayer}
						key={`${user.name}-${Math.random() * userIndex}`}
					/>
				))}
			</Container>
			<Container
				display='flex'
				flex={1}
				flexDirection='column'
				justifyContent='center'
				alignItems='center'
				py={5}
			>
				{gameEnded ? (
					<>
						<h1 style={{ color: '#fff' }}>GAME ENDED!</h1>
						<Container width={['80%', '80%', '30%', '30%']}>
							{scoreRank.map((player, index) => (
								<Container
									key={`${player.name}-${Math.random() * index}`}
									width={1}
									display='flex'
									alignItems='center'
								>
									<Container flex={1} display='flex' alignItems='center'>
										<img
											src={player.photo}
											alt={player.name}
											width={50}
											height={50}
										/>
										<Container ml={3} width={['70%']}>
											<UserName>{player.name}</UserName>
										</Container>
									</Container>
									<h1 style={{ color: '#fff' }}>{player.hdcp}</h1>
								</Container>
							))}
						</Container>
					</>
				) : (
					<>
						<h1 style={{ color: '#fff', textAlign: 'center' }}>
							Select the numbers of pins knocked down
						</h1>
						<Container display='flex' flexWrap='wrap' justifyContent='center'>
							{pins.map((_, index) => (
								<Container m={1} key={`${Math.random() * index}`}>
									<Button
										disabled={gameEnded}
										onClick={() => userPlay(index + 1)}
									>
										{index + 1}
									</Button>
								</Container>
							))}
						</Container>
					</>
				)}
			</Container>
		</Container>
	);
}
