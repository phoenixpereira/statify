import { useState, useEffect } from 'react';

export default function GetTopSong() {
	const [topSong, setTopSong] = useState(String);
	useEffect(() => {
		fetch('https://api.spotify.com/v1/me/top/tracks?limit=1', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${window.localStorage.getItem('token')}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.items && data.items.length > 0) {
					setTopSong(data.items[0].name);
				} else {
					setTopSong('Not Enough Data');
				}
				console.log(data);
			})
			.catch((error) => console.log(error));
	}, []);
	return (
		<div>
			{
				<h2>
					Top Song: <b>{topSong}</b>
				</h2>
			}
		</div>
	);
}
