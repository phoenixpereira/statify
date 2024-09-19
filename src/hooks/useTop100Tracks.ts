import { useState, useEffect } from 'react';

import { fetchFromSpotify } from '../utils/fetcher';

interface Track {
	trackName: string;
	trackImage: string;
	trackRelease: number;
	trackPopularity: number;
	trackExplicit: number;
	trackDuration: number;
	artist: string;
	spotifyLink: string;
}

const useTop100Tracks = () => {
	const [top100Tracks, setTop100Tracks] = useState<Track[]>([]);
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
					const combinedData = [...data1.items, ...data2.items];

					const formattedTracks = combinedData.map((track: any) => ({
						trackName: track.name,
						trackImage: track.album.images[0]?.url || '',
						trackRelease: parseInt(track.album.release_date.slice(0, 4), 10),
						trackPopularity: track.popularity,
						trackExplicit: track.explicit,
						trackDuration: track.duration_ms,
						artist: track.artists
							.map((artist: { name: string }) => artist.name)
							.join(', '),
						spotifyLink: track.external_urls.spotify,
					}));

					setTop100Tracks(formattedTracks);
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
