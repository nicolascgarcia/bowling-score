import { Route, Routes as DomRouters } from 'react-router-dom';
import { Home, Rank, Score } from '../pages';

export default function Routes() {
	return (
		<DomRouters>
			<Route path='/' element={<Home />} />
			<Route path='/score' element={<Score />} />
			<Route path='/rank' element={<Rank />} />
		</DomRouters>
	);
}
