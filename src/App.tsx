import { BrowserRouter } from 'react-router-dom';
import GameManager from './contexts/GameContext';
import Routes from './routes';

export default function App() {
	return (
		<GameManager>
			<BrowserRouter>
				<Routes />
			</BrowserRouter>
		</GameManager>
	);
}
