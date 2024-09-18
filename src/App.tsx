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

export default function App() {
	const [token, setToken] = useState<string | null>(null);
	const [displayName] = useState<string | undefined>(undefined);

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
					colorPrimary: '#FCBB6D',
					colorTextLightSolid: '#000000',
				},
			}}
		>
			<div className="min-h-screen bg-white">
				<div className="container mx-auto px-4 py-8">
					<Header userName={displayName} onLogout={logout} loggedIn={!!token} />

					{!token ? (
						<div className="flex justify-center">
							<Button type="primary" href={loginUrl}>
								Log in to Spotify
							</Button>
						</div>
					) : (
						<div className="grid grid-cols-1 gap-8 text-white lg:grid-cols-2">
							<div className="rounded-lg bg-mauve p-6 shadow-md">
								<AcousticDistAnalysis />
							</div>
							<div className="rounded-lg bg-mauve p-6 shadow-md">
								<DanceDistAnalysis />
							</div>
							<div className="rounded-lg bg-mauve p-6 shadow-md">
								<DurationDistAnalysis />
							</div>
							<div className="rounded-lg bg-mauve p-6 shadow-md">
								<EnergyDistAnalysis />
							</div>
							<div className="rounded-lg bg-mauve p-6 shadow-md">
								<ModeFrequencyAnalysis />
							</div>
							<div className="rounded-lg bg-mauve p-6 shadow-md">
								<TempoDistAnalysis />
							</div>
							<div className="rounded-lg bg-mauve p-6 shadow-md">
								<GetTopSong />
							</div>
							<div className="rounded-lg bg-mauve p-6 shadow-md">
								<RecentArtist />
							</div>
							<div className="rounded-lg bg-mauve p-6 shadow-md">
								<RecentSong />
							</div>
						</div>
					)}
				</div>
			</div>
		</ConfigProvider>
	);
}
