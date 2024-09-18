import { useState, useEffect } from 'react';

import { fetchFromSpotify } from '../utils/fetcher';

const useTop100 = () => {
	const [top100, setTop100] = useState<string[]>([]);
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
					const songIds = [
						...data1.items.map((track: { id: string }) => track.id),
						...data2.items.map((track: { id: string }) => track.id),
					];
					setTop100(songIds);
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

	return { top100, loading, error };
};

export default useTop100;
