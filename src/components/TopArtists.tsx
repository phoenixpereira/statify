import { useState, useEffect } from 'react';
import { FaSpotify } from 'react-icons/fa';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface Artist {
	key: string;
	artistName: string;
	artistImage: string;
	spotifyLink: string;
}

interface GetTopArtistsProps {
	artistData: Artist[];
}

export default function GetTopArtists({ artistData }: GetTopArtistsProps) {
	const [topArtists, setTopArtists] = useState<Artist[]>([]);
	const [isCollapsed, setIsCollapsed] = useState(true);

	useEffect(() => {
		if (artistData.length > 0) {
			const formattedArtists = artistData.map((artist, index) => ({
				...artist,
				key: String(index + 1),
			}));
			setTopArtists(formattedArtists);
		}
	}, [artistData]);

	const toggleCollapse = () => {
		setIsCollapsed(!isCollapsed);
	};

	// Show only top 10 when collapsed, otherwise show all
	const displayedArtists = isCollapsed ? topArtists.slice(0, 10) : topArtists;

	return (
		<div className="p-1 lg:p-6">
			<div className="mb-6 flex items-center justify-between">
				<h2 className="text-2xl font-bold">Top 50 Artists</h2>
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
							<th className="p-1 lg:p-4">Spotify Link</th>
						</tr>
					</thead>
					<tbody>
						{displayedArtists.map((artist, index) => (
							<tr
								key={artist.key}
								className="lg:text-md bg-rose text-sm transition-colors hover:bg-apricot"
							>
								<td className="p-1 font-bold lg:px-4 lg:py-2">{index + 1}</td>
								<td className="p-1 lg:px-4 lg:py-2">
									<img
										src={artist.artistImage}
										alt={`${artist.artistName} cover`}
										className="h-12 w-12 rounded-lg"
									/>
								</td>
								<td className="p-1 lg:px-4 lg:py-2">{artist.artistName}</td>
								<td className="p-1 lg:px-4 lg:py-2">
									<a
										href={artist.spotifyLink}
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
