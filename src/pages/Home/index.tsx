import { ChangeEvent, FormEvent, useState } from 'react';
import { Container, NameInput, Button, UserName } from '../../components';

type User = {
	photo: string;
	name: string;
};

export default function Home() {
	const [userName, setUserName] = useState<string>('');
	const [users, setUsers] = useState<User[]>([]);

	const removeUser = (index: number): void => {
		const currentUsers = [...users];
		currentUsers.splice(index, 1);
		setUsers(currentUsers);
	};

	const changeName = (event: ChangeEvent<HTMLInputElement>): void => {
		setUserName(event.target.value);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();

		const user: User = {
			name: userName,
			photo: `https://avatars.dicebear.com/api/identicon/${userName}.svg`,
		};

		setUsers([...users, user]);
		setUserName('');
	};

	return (
		<Container
			bg='#0a0906'
			display='flex'
			justifyContent='center'
			alignItems='center'
			minHeight='100vh'
		>
			<Container
				width={['75vw', '50vw', '50vw', '30vw']}
				maxWidth='500px'
				bg='#121214'
				p={[4, 5, 5, 5]}
				borderRadius={10}
			>
				<form onSubmit={handleSubmit}>
					<Container display='flex'>
						<NameInput
							aria-label='name-input'
							type='text'
							placeholder="Add the player's name"
							value={userName}
							onChange={changeName}
							required
						/>
						<Container ml={1}>
							<Button type='submit' fontSize={28}>
								+
							</Button>
						</Container>
					</Container>
				</form>
				<Container my={3}>
					{users.map((user, index) => (
						<Container
							key={`${user.name}-${Math.random() * index}`}
							display='flex'
							alignItems='center'
						>
							<img src={user.photo} alt={user.name} width={50} height={50} />
							<Container ml={3} width={['60%', '65%', '65%', '65%']}>
								<UserName>{user.name}</UserName>
							</Container>
							<Container display='flex' flex={1} justifyContent='flex-end'>
								<Button
									type='button'
									onClick={() => removeUser(index)}
									fontSize={28}
								>
									-
								</Button>
							</Container>
						</Container>
					))}
				</Container>
				<Container>
					<Button type='button' width='100%'>
						start game
					</Button>
				</Container>
			</Container>
		</Container>
	);
}
