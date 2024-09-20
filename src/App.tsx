import { useEffect, useState } from 'react';

import { getProfileData } from './api/profile/route';
import DurationAnalysis from './components/GetDurationTrends';
import ExplicitAnalysis from './components/GetExplicitTrends';
import PopularityAnalysis from './components/GetPopularityTrends';
import getRecommendations from './components/GetRecommendations';
import ReleaseAnalysis from './components/GetReleaseTrends';
import GetTop100Playlist from './components/GetTop100Playlist';
import Header from './components/Header';
import RecentArtist from './components/RecentFollowedArtist';
import RecentSong from './components/RecentSong';
import GetTopArtists from './components/TopArtists';
import GetTopTracks from './components/TopTracks';
import useTop50Artists from './hooks/useTop50Artists';
import useTop100Tracks from './hooks/useTop100Tracks';
import { loginUrl } from './spotify';

interface Track {
	key: string;
	trackID: string;
	trackName: string;
	artist: string;
	trackImage: string;
	spotifyLink: string;
	trackPopularity: number;
	trackDuration: number;
	trackRelease: number;
	trackExplicit: boolean;
}

interface Artist {
	key: string;
	artistName: string;
	artistImage: string;
	spotifyLink: string;
}

interface TrackData {
	top100Tracks: Track[];
	loading: boolean;
	error: string | null;
}

interface ArtistData {
	top50Artists: Artist[];
	loading: boolean;
	error: string | null;
}

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
	const [loadingProfile, setLoadingProfile] = useState<boolean>(false);

	const trackData: TrackData = useTop100Tracks();
	const artistData: ArtistData = useTop50Artists();

	useEffect(() => {
		const hash = window.location.hash;
		let localToken = window.localStorage.getItem('token');

		if (!localToken && hash) {
			const tokenFromHash = parseTokenFromHash(hash);
			if (tokenFromHash) {
				localToken = tokenFromHash;
				window.localStorage.setItem('token', localToken);
				window.location.hash = '';
				setToken(localToken);
			}
		} else {
			setToken(localToken);
		}
	}, []);

	useEffect(() => {
		const fetchProfile = async () => {
			if (!token) return;
			setLoadingProfile(true);
			try {
				const profileData = await getProfileData();
				setProfile(profileData);
			} catch (error) {
				console.error('Failed to fetch profile data:', error);
				setProfile(null);
			} finally {
				setLoadingProfile(false);
			}
		};

		fetchProfile();
	}, [token]);

	const logout = () => {
		setToken(null);
		setProfile(null);
		window.localStorage.removeItem('token');
	};

	const isLoggedIn = !!token;

	return (
		<div className="min-h-screen bg-white">
			<div className="container mx-auto px-4 py-8">
				<Header
					userName={profile?.display_name || 'Guest'}
					onLogout={logout}
					loggedIn={isLoggedIn}
				/>

				{!isLoggedIn ? (
					<div className="flex flex-col items-center justify-center rounded-lg bg-slate p-6 text-white shadow-md">
						<h2 className="mb-4 text-center text-2xl font-semibold">
							Welcome to Statify!
						</h2>
						<p className="mb-4 text-center">
							Log in with your Spotify account to view your top tracks and
							artists, explore personalised stats, and create a recommended
							playlist just for you!
						</p>
						<button
							onClick={() => (window.location.href = loginUrl)}
							className="rounded-md bg-rose px-6 py-3 font-bold text-white shadow-lg transition-colors hover:bg-apricot hover:text-black"
						>
							Log in to Spotify
						</button>
					</div>
				) : loadingProfile ? (
					<div className="flex flex-col items-center justify-center rounded-lg bg-slate p-6 text-white shadow-md">
						<p>Loading your profile...</p>
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
							getRecommendations,
							GetTop100Playlist,
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
	);
}
