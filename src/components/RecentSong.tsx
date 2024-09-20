import { useState, useEffect } from 'react';
import { FaSpotify } from 'react-icons/fa';

import { fetchFromSpotify } from '../utils/fetcher';

export default function GetRecentSong() {
	const [recentSong, setRecentSong] = useState<{
		name: string;
		artist: string;
		image: string;
		url: string;
	} | null>(null);

	useEffect(() => {
		const fetchRecentSong = async () => {
			const data = await fetchFromSpotify('me/player/recently-played?limit=1');
			if (data && data.items.length > 0) {
				const { name, album, external_urls, artists } = data.items[0].track;
				setRecentSong({
					name,
					artist: artists[0].name,
					image: album.images[0].url,
					url: external_urls.spotify,
				});
			} else {
				console.log('No recently played songs found');
			}
		};

		fetchRecentSong();
	}, []);

	return (
		<div className="flex items-center justify-between rounded-lg bg-rose p-2 text-white shadow-md lg:p-4">
			{recentSong ? (
				<>
					<div className="flex items-center">
						<img
							src={recentSong.image}
							alt={`${recentSong.name} cover`}
							className="mr-4 h-16 w-16 rounded-lg"
						/>
						<div>
							<h2 className="text-lg font-bold">Most Recently Played Song</h2>
							<p className="font-bold">{recentSong.name}</p>
							<p className="font-norma">{recentSong.artist}</p>
						</div>
					</div>
					<a
						href={recentSong.url}
						target="_blank"
						rel="noopener noreferrer"
						className="text-white hover:underline"
					>
						<FaSpotify className="text-4xl" />
					</a>
				</>
			) : (
				<h2>Loading...</h2>
			)}
		</div>
	);
}
