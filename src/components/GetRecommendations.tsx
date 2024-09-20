import { useState, useEffect } from 'react';

import { createPlaylist } from '../utils/createPlaylist';
import { fetchFromSpotify } from '../utils/fetcher';

interface Track {
	trackID: string;
}

interface PAProps {
	trackData: Track[];
}

export default function getRecommendations({ trackData }: PAProps) {
	useEffect(() => {
		const Playlist = async () => {
			try {
				const firstThree = trackData.slice(0, 3).map((track) => track.trackID);
				console.log(firstThree);

				const recommendations = await fetchFromSpotify(
					`recommendations?seed_tracks=${firstThree}`,
				);
				console.log(recommendations);
				const trackIDs = recommendations.tracks.map(
					(track: { id: string }) => track.id,
				);
				console.log(trackIDs);

				const [userDetails] = await Promise.all([
					// getting parameters for API call
					fetchFromSpotify('me'),
				]);
				const userID = userDetails.id;

				createPlaylist(userID, trackIDs);
			} catch (err) {
				console.error('Error forming recommendations:', err);
			}
		};

		Playlist();
	}, []);

	return (
		<div>
			<b>AI Recommended Playlist Created! Check your Account</b>
		</div>
	);
}
