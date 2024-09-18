import { useState, useEffect } from 'react';

export default function GetTop100() {
	const [top100, setTop100] = useState<string[]>([]);
	useEffect(() => {
		const url1 = 'https://api.spotify.com/v1/me/top/tracks?limit=50&offset=0'; // Top 1-50
		const url2 = 'https://api.spotify.com/v1/me/top/tracks?limit=50&offset=50'; // Top 51-100

		Promise.all([
			fetch(url1, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${window.localStorage.getItem('token')}`,
				},
			}).then((response) => response.json()),

			fetch(url2, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${window.localStorage.getItem('token')}`,
				},
			}).then((response) => response.json()),
		])
			.then(([data1, data2]) => {
				const songIds = [...data1.items, ...data2.items].map(
					(track) => track.id,
				); // Extract track IDs from both
				setTop100(songIds);
			})
			.catch((error) => console.log(error));
	}, []);
	return top100;
}
