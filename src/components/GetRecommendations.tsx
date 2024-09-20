import { useState } from 'react';

import { createPlaylist } from '../utils/createPlaylist';
import { fetchFromSpotify } from '../utils/fetcher';

interface Track {
	trackID: string;
}

interface PAProps {
	trackData: Track[];
}

export default function GetRecommendations({ trackData }: PAProps) {
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');

	const handleGeneratePlaylist = async () => {
		setLoading(true);
		setMessage('');

		try {
			const firstThree = trackData.slice(0, 5).map((track) => track.trackID);
			console.log(firstThree);

			const recommendations = await fetchFromSpotify(
				`recommendations?seed_tracks=${firstThree.join(',')}`,
			);
			console.log(recommendations);
			const trackIDs = recommendations.tracks.map(
				(track: { id: string }) => track.id,
			);
			console.log(trackIDs);

			const [userDetails] = await Promise.all([fetchFromSpotify('me')]);
			const userID = userDetails.id;

			await createPlaylist(userID, trackIDs);
			setMessage('Recommended playlist created! Check your account.');
		} catch (err) {
			console.error('Error forming recommendations:', err);
			setMessage('Error creating playlist. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-center">
			<h1 className="text-xl font-bold">Get Recommendations</h1>
			<p>Generate a playlist based on your top five tracks.</p>
			<button
				onClick={handleGeneratePlaylist}
				disabled={loading}
				className={`mt-4 rounded-md px-6 py-3 font-semibold text-white shadow-lg ${
					loading ? 'cursor-not-allowed bg-steel' : 'bg-rose hover:bg-apricot'
				} transition-all duration-200 ease-in-out`}
			>
				{loading ? 'Generating Playlist...' : 'Generate Playlist'}
			</button>
			{message && <p className="mt-4 text-lg font-semibold">{message}</p>}
		</div>
	);
}
