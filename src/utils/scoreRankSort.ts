import { Player } from '../contexts/GameContext/gameContext.types';

export default (players: Player[]) =>
	players.sort((a, b) => {
		if (a.hdcp < b.hdcp) {
			return 1;
		}
		if (a.hdcp > b.hdcp) {
			return -1;
		}

		return 0;
	});
