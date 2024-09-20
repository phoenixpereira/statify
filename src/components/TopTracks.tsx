import { useState, useEffect } from 'react';
import { FaSpotify } from 'react-icons/fa';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface Track {
	key: string;
	trackName: string;
	artist: string;
	trackImage: string;
	spotifyLink: string;
}

interface GetTopTracksProps {
	trackData: Track[];
}

export default function GetTopTracks({ trackData }: GetTopTracksProps) {
	const [topTracks, setTopTracks] = useState<Track[]>([]);
	const [isCollapsed, setIsCollapsed] = useState(true);

	useEffect(() => {
		if (trackData.length > 0) {
			const formattedTracks = trackData.map((track, index) => ({
				...track,
				key: String(index + 1),
			}));
			setTopTracks(formattedTracks);
		}
	}, [trackData]);

	const toggleCollapse = () => {
		setIsCollapsed(!isCollapsed);
	};

	// Show only top 10 when collapsed, otherwise show all
	const displayedTracks = isCollapsed ? topTracks.slice(0, 10) : topTracks;

	return (
		<div className="p-1 lg:p-6">
			<div className="mb-6 flex items-center justify-between">
				<h2 className="text-2xl font-bold">Top 100 Tracks</h2>
				<button
					onClick={toggleCollapse}
					className="flex items-center text-lg text-white hover:underline"
				>
					{isCollapsed ? (
						<>
							Show Full Table <FaChevronDown className="ml-2" />
						</>
					) : (
						<>
							Hide Full Table <FaChevronUp className="ml-2" />
						</>
					)}
				</button>
			</div>
			<div className="overflow-hidden rounded-lg shadow-md">
				<table className="w-full table-auto border-collapse text-left">
					<thead>
						<tr className="lg:text-md bg-steel text-sm text-white">
							<th className="p-1 lg:p-4">#</th>
							<th className="p-1 lg:p-4">Image</th>
							<th className="p-1 lg:p-4">Name</th>
							<th className="p-1 lg:p-4">Artist</th>
							<th className="py-1 lg:p-4">Spotify Link</th>
						</tr>
					</thead>
					<tbody>
						{displayedTracks.map((track, index) => (
							<tr
								key={track.key}
								className="lg:text-md bg-rose text-sm transition-colors hover:bg-apricot"
							>
								<td className="p-1 font-bold lg:px-4 lg:py-2">{index + 1}</td>
								<td className="p-1 lg:px-4 lg:py-2">
									<img
										src={track.trackImage}
										alt={`${track.trackName} cover`}
										className="h-12 w-12 rounded-lg"
									/>
								</td>
								<td className="p-1 lg:px-4 lg:py-2">{track.trackName}</td>
								<td className="p-1 lg:px-4 lg:py-2">{track.artist}</td>
								<td className="p-1 lg:px-4 lg:py-2">
									<a
										href={track.spotifyLink}
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
