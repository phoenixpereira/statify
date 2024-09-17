import { Button } from 'antd';
import { useEffect, useState } from 'react';

import AcousticDistAnalysis from './components/AcousticDist';
import RecentArtist from './components/MostRecentFollowedArtist';
import Profile from './components/Profile';
import RecentSong from './components/RecentSong';
import Top1Songs from './components/Top3Songs';
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
					<Top1Songs />
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
