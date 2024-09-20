import { useState, useEffect } from 'react';

import { fetchFromSpotify } from '../utils/fetcher';

interface Artist {
	key: string;
	artistName: string;
	artistImage: string;
	spotifyLink: string;
}

interface SpotifyArtist {
	id: string;
	name: string;
	images: { url: string }[];
	external_urls: { spotify: string };
}

interface SpotifyTopArtistsResponse {
	items: SpotifyArtist[];
}

export default function useTop50Artists() {
	const [top50Artists, setTop50Artists] = useState<Artist[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchTop50Artists = async () => {
			try {
				const url = 'me/top/artists?limit=50&offset=0'; // Top 1-50
				const data: SpotifyTopArtistsResponse = await fetchFromSpotify(url);

				if (data && data.items) {
					const formattedArtists = data.items.map((artist) => ({
						key: artist.id,
						artistName: artist.name,
						artistImage: artist.images[0]?.url || '',
						spotifyLink: artist.external_urls.spotify,
					}));

					setTop50Artists(formattedArtists);
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
}
