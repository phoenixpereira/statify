import { Button, ConfigProvider, Space } from 'antd';
import { useEffect, useState } from 'react';

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
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#475C7A',
				},
			}}
		>
			<div className="min-h-screen bg-white">
				<div className="container mx-auto px-4 py-8">
					<h1 className="mb-8 text-center text-3xl font-bold">Statify</h1>

					{!token ? (
						<div className="flex justify-center">
							<Button type="primary" href={loginUrl}>
								Log in to Spotify
							</Button>
						</div>
					) : (
						<div className="grid grid-cols-1 gap-8 text-white lg:grid-cols-2">
							<div className="rounded-lg bg-mauve p-6 shadow-md">
								<Profile />
							</div>
							<div className="rounded-lg bg-mauve p-6 shadow-md">
								<Top1Songs />
							</div>
							<div className="rounded-lg bg-mauve p-6 shadow-md">
								<RecentArtist />
							</div>
							<div className="rounded-lg bg-mauve p-6 shadow-md">
								<RecentSong />
							</div>
							<div className="col-span-1 mt-4 flex justify-center lg:col-span-2">
								<Button type="primary" onClick={logout}>
									Logout
								</Button>
							</div>
						</div>
					)}
				</div>
			</div>
		</ConfigProvider>
	);
}
