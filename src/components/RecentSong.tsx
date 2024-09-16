import { useState, useEffect } from 'react';

export default function GetRecentSong() {
	const [recentSong, setRecentSong] = useState(null);
	useEffect(() => {
		fetch('https://api.spotify.com/v1/me/player/recently-played?limit=10', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${window.localStorage.getItem('token')}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setRecentSong(data.items[0].track.name);
				console.log(data);
			})
			.catch((error) => console.log(error));
	}, []);
	return (
		<div>
			{
				<h2>
					Most Recently Listened to Song: <b>{recentSong}</b>
				</h2>
			}
		</div>
	);
}
