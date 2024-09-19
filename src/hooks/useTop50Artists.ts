import { useState, useEffect } from 'react';

import { fetchFromSpotify } from '../utils/fetcher';

const useTop50Artists = () => {
	const [top50Artists, setTop50Artists] = useState<[string[], string[]]>([
		[],
		[],
	]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchTop50Artists = async () => {
			try {
				const url1 = 'me/top/artists?limit=50&offset=0'; // Top 1-50

				const [data] = await Promise.all([fetchFromSpotify(url1)]);

				if (data) {
					const artistName = [
						...data.items.map(
							(artist: { name: string }) => [artist.name] as [string],
						),
					];
					const artistImage = [
						...data.items.artist.map(
							(images: { url: string }) => [images.url] as [string],
						),
					];
					setTop50Artists([artistName, artistImage]);
				} else {
					throw new Error('Failed to fetch top artists');
				}
			} catch (err) {
				setError('Error fetching top artists');
				console.error('Error fetching top artists:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchTop50Artists();
	}, []);

	return { top50Artists, loading, error };
};

export default useTop50Artists;
