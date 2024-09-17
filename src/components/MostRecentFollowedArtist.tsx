import { useState, useEffect } from 'react';

export default function GetRecentArtist() {
	const [recentArtist, setRecentArtist] = useState(String);
	useEffect(() => {
		fetch('https://api.spotify.com/v1/me/following?type=artist&limit=1', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${window.localStorage.getItem('token')}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setRecentArtist(data.artists.items[0].name);
				console.log(data);
			})
			.catch((error) => console.log(error));
	}, []);
	return (
		<div>
			{
				<h2>
					You Recently Followed: <b>{recentArtist}</b>
				</h2>
			}
		</div>
	);
}
