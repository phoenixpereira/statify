import { useState, useEffect } from 'react';

import GetTop100 from '../GetTop100';

export default function GetDanceabilityDist() {
	const [dist, setDist] = useState<number[]>([]); // Initialize as an empty array

	const songIds = GetTop100();

	useEffect(() => {
		// Ensure songIds are fetched before making the API call
		if (songIds && songIds.length > 0) {
			const songIdsString = songIds.join(',');

			// Fetch audio features once songIds are available
			fetch(`https://api.spotify.com/v1/audio-features?ids=${songIdsString}`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${window.localStorage.getItem('token')}`,
				},
			})
				.then((response) => response.json())
				.then((data) => {
					if (data && data.audio_features) {
						const danceabilityDist = data.audio_features.map(
							(audioFeature: { danceability: number }) =>
								audioFeature.danceability,
						);
						setDist(danceabilityDist);
					}
				})
				.catch((error) =>
					console.error('Error fetching audio features:', error),
				);
		}
	}, [songIds]);

	return dist;
}
