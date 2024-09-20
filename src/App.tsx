import { Button, ConfigProvider } from 'antd';
import { useEffect, useState } from 'react';

import { getProfileData } from './api/profile/route';
import DurationAnalysis from './components/GetDurationTrends';
import ExplicitAnalysis from './components/GetExplicitTrends';
import PopularityAnalysis from './components/GetPopularityTrends';
import ReleaseAnalysis from './components/GetReleaseTrends';
import Header from './components/Header';
import RecentArtist from './components/RecentFollowedArtist';
import RecentSong from './components/RecentSong';
import GetTopArtists from './components/TopArtists';
import GetTopTracks from './components/TopTracks';
import useTop50Artists from './hooks/useTop50Artists';
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
	const artistData = useTop50Artists();

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
						<div className="grid grid-cols-1 gap-8 text-white xl:grid-cols-2">
							<div className="rounded-lg bg-slate p-4 shadow-md lg:p-6">
								<GetTopTracks trackData={trackData.top100Tracks} />
							</div>
							<div className="rounded-lg bg-slate p-4 shadow-md lg:p-6">
								<GetTopArtists artistData={artistData.top50Artists} />
							</div>

							{[RecentSong, RecentArtist].map((Component, index) => (
								<div
									key={index}
									className="rounded-lg bg-slate p-4 shadow-md lg:p-6"
								>
									<Component />
								</div>
							))}
							{[
								PopularityAnalysis,
								DurationAnalysis,
								ReleaseAnalysis,
								ExplicitAnalysis,
							].map((Component, index) => (
								<div
									key={index}
									className="rounded-lg bg-slate p-4 shadow-md lg:p-6"
								>
									<Component trackData={trackData.top100Tracks} />
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</ConfigProvider>
	);
}
