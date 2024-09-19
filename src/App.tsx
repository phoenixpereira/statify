import { Button, ConfigProvider } from 'antd';
import { useEffect, useState } from 'react';

import { getProfileData } from './api/profile/route';
import Analysis from './components/GetCI';
import Header from './components/Header';
import RecentArtist from './components/MostRecentFollowedArtist';
import RecentSong from './components/RecentSong';
import GetTopSong from './components/TopSong';
import useTop100Tracks from './hooks/useTop100Tracks';
import { loginUrl } from './spotify';

const parseTokenFromHash = (hash: string): string | null => {
	const tokenFromHash = hash
		.substring(1)
		.split('&')
		.find((elem) => elem.startsWith('access_token'));

	return tokenFromHash ? tokenFromHash.split('=')[1] : null;
};

export default function App() {
	interface ProfileData {
		display_name: string;
	}

	const [token, setToken] = useState<string | null>(null);
	const [profile, setProfile] = useState<ProfileData | null>(null);

	const trackData = useTop100Tracks();

	useEffect(() => {
		const hash = window.location.hash;
		let localToken = window.localStorage.getItem('token');

		if (!localToken && hash) {
			const tokenFromHash = parseTokenFromHash(hash);
			if (tokenFromHash) {
				localToken = tokenFromHash;
				window.localStorage.setItem('token', localToken);
				window.location.hash = '';
			}
		}

		setToken(localToken);
	}, []);

	useEffect(() => {
		if (token) {
			const fetchProfile = async () => {
				const profileData = await getProfileData();
				setProfile(profileData);
			};

			fetchProfile();
		}
	}, [token]);

	const logout = () => {
		setToken(null);
		window.localStorage.removeItem('token');
	};

	const isLoggedIn = !!token;

	const trackPopularityArray = trackData.top100Tracks.map(
		(track) => track.trackPopularity,
	);
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
						userName={profile?.display_name || 'Guest'}
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
							{[GetTopSong, RecentArtist, RecentSong].map(
								(Component, index) => (
									<div
										key={index}
										className="rounded-lg bg-mauve p-6 shadow-md"
									>
										<Component />
									</div>
								),
							)}
						</div>
					)}
				</div>
				<Analysis name="Track Data Analysis" array={trackPopularityArray} />
			</div>
		</ConfigProvider>
	);
}
