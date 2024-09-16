import { Button } from 'antd';
import { useEffect, useState } from 'react';

import RecentArtist from './components/MostRecentFollowedArtist';
import Profile from './components/Profile';
import Top1Songs from './components/Top3Songs';
import { loginUrl } from './spotify';

export default function App() {
	const [token, setToken] = useState('');

	useEffect(() => {
		const hash = window.location.hash;
		let token = window.localStorage.getItem('token');

		if (!token && hash) {
			token = hash
				.substring(1)
				.split('&')
				.find((elem) => elem.startsWith('access_token'))
				.split('=')[1];

			window.location.hash = '';
			window.localStorage.setItem('token', token);
		}

		setToken(token);
	}, []);

	const logout = () => {
		setToken('');
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
					<Top1Songs />
					<RecentArtist />
					<Button type="primary" onClick={logout}>
						Logout
					</Button>
				</>
			)}
		</div>
	);
}
