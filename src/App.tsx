import { Button, ConfigProvider } from 'antd';
import { useEffect, useState } from 'react';

import Header from './components/Header';
import RecentArtist from './components/MostRecentFollowedArtist';
import RecentSong from './components/RecentSong';
import GetTopSong from './components/TopSong';
import AcousticDistAnalysis from './components/getCI/AcousticCI';
import DanceDistAnalysis from './components/getCI/DanceabilityCI';
import DurationDistAnalysis from './components/getCI/DurationCI';
import EnergyDistAnalysis from './components/getCI/EnergyCI';
import ModeFrequencyAnalysis from './components/getCI/ModeFrequency';
import TempoDistAnalysis from './components/getCI/TempoCI';
import { loginUrl } from './spotify';

const parseTokenFromHash = (hash: string): string | null => {
	const tokenFromHash = hash
		.substring(1)
		.split('&')
		.find((elem) => elem.startsWith('access_token'));

	return tokenFromHash ? tokenFromHash.split('=')[1] : null;
};

export default function App() {
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		const hash = window.location.hash;
		let localToken = window.localStorage.getItem('token');

		if (!localToken && hash) {
			const tokenFromHash = parseTokenFromHash(hash);
			if (tokenFromHash) {
				localToken = tokenFromHash;
				window.localStorage.setItem('token', localToken);
			}
		}

		setToken(localToken);
	}, []);

	const logout = () => {
		setToken(null);
		window.localStorage.removeItem('token');
	};

	const isLoggedIn = !!token;

	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#FCBB6D',
					colorTextLightSolid: '#000000',
				},
			}}
		>
			<div className="min-h-screen bg-white">
				<div className="container mx-auto px-4 py-8">
					<Header
						userName={undefined}
						onLogout={logout}
						loggedIn={isLoggedIn}
					/>

					{!isLoggedIn ? (
						<div className="flex justify-center">
							<Button type="primary" href={loginUrl}>
								Log in to Spotify
							</Button>
						</div>
					) : (
						<div className="grid grid-cols-1 gap-8 text-white lg:grid-cols-2">
							{[
								AcousticDistAnalysis,
								DanceDistAnalysis,
								DurationDistAnalysis,
								EnergyDistAnalysis,
								ModeFrequencyAnalysis,
								TempoDistAnalysis,
								GetTopSong,
								RecentArtist,
								RecentSong,
							].map((Component, index) => (
								<div key={index} className="rounded-lg bg-mauve p-6 shadow-md">
									<Component />
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</ConfigProvider>
	);
}
