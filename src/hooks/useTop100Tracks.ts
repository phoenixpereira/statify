import { useState, useEffect } from 'react';

import { fetchFromSpotify } from '../utils/fetcher';

const useTop100Tracks = () => {
	const [top100Tracks, setTop100Tracks] = useState<
		[string[], string[], string[], string[], string[], string[]]
	>([[], [], [], [], [], []]); // Want to return a 'sextuuple' that has trackName, trackImage, trackRelease, trackPopularity, trackExplicit, trackDuration
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchTop100 = async () => {
			try {
				const url1 = 'me/top/tracks?limit=50&offset=0'; // Top 1-50
				const url2 = 'me/top/tracks?limit=50&offset=50'; // Top 51-100

				const [data1, data2] = await Promise.all([
					fetchFromSpotify(url1),
					fetchFromSpotify(url2),
				]);

				if (data1 && data2) {
					const trackName = [
						...data1.items.map((track: { name: string }) => track.name),
						...data2.items.map((track: { name: string }) => track.name),
					];

					const trackImage = [
						...data1.items.album.map((images: { url: string }) => images.url),
						...data2.items.album.map((images: { url: string }) => images.url),
					];

					const trackRelease = [
						...data1.items.map(
							(release_date: { url: string }) => release_date.url,
						),
						...data2.items.map(
							(release_date: { url: string }) => release_date.url,
						),
					];

					const trackPopularity = [
						...data1.items.map(
							(track: { popularity: string }) => track.popularity,
						),
						...data2.items.map(
							(track: { popularity: string }) => track.popularity,
						),
					];

					const trackExplicit = [
						...data1.items.map((track: { explicit: string }) => track.explicit),
						...data2.items.map((track: { explicit: string }) => track.explicit),
					];

					const trackDuration = [
						...data1.items.map(
							(track: { duration_ms: string }) => track.duration_ms,
						),
						...data2.items.map(
							(track: { duration_ms: string }) => track.duration_ms,
						),
					];

					setTop100Tracks([
						trackName,
						trackImage,
						trackRelease,
						trackPopularity,
						trackExplicit,
						trackDuration,
					]);
				} else {
					throw new Error('Failed to fetch top tracks');
				}
			} catch (err) {
				setError('Error fetching top tracks');
				console.error('Error fetching top tracks:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchTop100();
	}, []);

	return { top100Tracks, loading, error };
};

export default useTop100Tracks;
