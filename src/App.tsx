import { Button } from 'antd';
import { useEffect, useState } from 'react';

import RecentArtist from './components/MostRecentFollowedArtist';
import Profile from './components/Profile';
import RecentSong from './components/RecentSong';
import GetTopSong from './components/TopSong';
import AcousticDistAnalysis from './components/getCI/AcousticCI';
import DanceDistAnalysis from './components/getCI/DanceabilityCI';
import DurationDistAnalysis from './components/getCI/DurationCI';
import EnergyDistAnalysis from './components/getCI/EnergyCI';
import ModeFrequencyAnalysis from './components/getCI/ModeFrequency';
import TempoDistAnalysis from './components/getCI/TempoCI';
import { loginUrl } from './spotify';

export default function App() {
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		const hash = window.location.hash;
		let localToken = window.localStorage.getItem('token');

		if (!localToken && hash) {
			const tokenFromHash = hash
				.substring(1)
				.split('&')
				.find((elem) => elem.startsWith('access_token'));

			if (tokenFromHash) {
				localToken = tokenFromHash.split('=')[1];
				window.localStorage.setItem('token', localToken);
			}

			window.location.hash = '';
		}

		setToken(localToken);
	}, []);

	const logout = () => {
		setToken(null);
		window.localStorage.removeItem('token');
	};

	return (
		<div className="App">
			<h1>Hello World!</h1>
			{!token ? (
				<Button type="primary" href={loginUrl}>
					Log in to Spotify
				</Button>
			) : (
				<>
					<Profile />
					<AcousticDistAnalysis />
					<DanceDistAnalysis />
					<DurationDistAnalysis />
					<EnergyDistAnalysis />
					<ModeFrequencyAnalysis />
					<TempoDistAnalysis />
					<GetTopSong />
					<RecentArtist />
					<RecentSong />
					<Button type="primary" onClick={logout}>
						Logout
					</Button>
				</>
			)}
		</div>
	);
}
