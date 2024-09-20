import { useState } from 'react';

import { createTop100Playlist } from '../utils/createTop100Playlist';
import { fetchFromSpotify } from '../utils/fetcher';

interface Track {
	trackID: string;
}

interface PAProps {
	trackData: Track[];
}

export default function GetTop100Playlist({ trackData }: PAProps) {
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');

	const handleGeneratePlaylist = async () => {
		setLoading(true);
		setMessage('');

		try {
			const first100 = trackData.map((track) => track.trackID);
			console.log(first100);

			const [userDetails] = await Promise.all([fetchFromSpotify('me')]);
			const userID = userDetails.id;

			await createTop100Playlist(userID, first100);
			setMessage('Top 100 playlist created! Check your account.');
		} catch (err) {
			console.error('Error forming recommendations:', err);
			setMessage('Error creating playlist. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-center">
			<h1 className="text-xl font-bold">Form Top 100 Playlist</h1>
			<p>Generate a playlist that has your top 100 tracks.</p>
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
