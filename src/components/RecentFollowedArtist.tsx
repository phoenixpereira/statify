import { useState, useEffect } from 'react';
import { FaSpotify } from 'react-icons/fa';

import { fetchFromSpotify } from '../utils/fetcher';

export default function GetRecentArtist() {
	const [recentArtist, setRecentArtist] = useState<{
		name: string;
		image: string;
		url: string;
	} | null>(null);

	useEffect(() => {
		const fetchRecentArtist = async () => {
			const data = await fetchFromSpotify('me/following?type=artist&limit=1');
			if (data && data.artists.items.length > 0) {
				const { name, external_urls, images } = data.artists.items[0];
				setRecentArtist({
					name,
					image: images[0]?.url,
					url: external_urls.spotify,
				});
			} else {
				console.log('No recently followed artists found');
			}
		};

		fetchRecentArtist();
	}, []);

	return (
		<div className="flex items-center justify-between rounded-lg p-4 text-white">
			{recentArtist ? (
				<>
					<div className="flex items-center">
						<img
							src={recentArtist.image}
							alt={`${recentArtist.name} image`}
							className="mr-4 h-16 w-16 rounded-lg"
						/>
						<div>
							<h2 className="text-lg font-bold">You Recently Followed</h2>
							<p className="font-normal">{recentArtist.name}</p>
						</div>
					</div>
					<a
						href={recentArtist.url}
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
