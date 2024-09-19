import { useState, useEffect } from 'react';
import { FaSpotify } from 'react-icons/fa';

import useTop100Tracks from '../hooks/useTop100Tracks';

interface Song {
	key: string;
	name: string;
	artist: string;
	image: string;
	url: string;
}

export default function GetTopSongs() {
	const [topSongs, setTopSongs] = useState<Song[]>([]);
	const { top100Tracks } = useTop100Tracks();

	useEffect(() => {
		if (top100Tracks.length > 0) {
			const formattedSongs = top100Tracks.map((track, index) => ({
				key: String(index + 1),
				name: track.trackName,
				artist: track.artist,
				image: track.trackImage,
				url: track.spotifyLink,
			}));
			setTopSongs(formattedSongs);
		}
	}, [top100Tracks]);

	return (
		<div className="p-1 lg:p-6">
			<h2 className="mb-6 text-2xl font-bold">Top 100 Songs</h2>
			<div className="overflow-hidden rounded-lg shadow-md">
				<table className="w-full table-auto border-collapse text-left">
					<thead>
						<tr className="lg:text-md bg-steel text-sm text-white">
							<th className="p-1 lg:p-4">Image</th>
							<th className="p-1 lg:p-4">Name</th>
							<th className="p-1 lg:p-4">Artist</th>
							<th className="p-1 lg:p-4">Spotify Link</th>
						</tr>
					</thead>
					<tbody className="bg-gray-100">
						{topSongs.map((song) => (
							<tr
								key={song.key}
								className="lg:text-md bg-rose text-sm transition-colors hover:bg-apricot"
							>
								<td className="p-1 lg:p-4">
									<img
										src={song.image}
										alt={`${song.name} cover`}
										className="h-12 w-12 rounded-lg"
									/>
								</td>
								<td className="p-1 lg:p-4">{song.name}</td>
								<td className="p-1 lg:p-4">{song.artist}</td>
								<td className="p-1 lg:p-4">
									<a
										href={song.url}
										target="_blank"
										rel="noopener noreferrer"
										className="text-white hover:underline"
									>
										<FaSpotify className="text-2xl" />
									</a>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
