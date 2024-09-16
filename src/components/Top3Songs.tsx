import { useState, useEffect } from 'react';

export default function GetTop1Songs() {
	const [top1Songs, setTop1Songs] = useState(String);
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
					setTop1Songs(data.items[0].name);
				} else {
					setTop1Songs('Not Enough Data');
				}
				console.log(data);
			})
			.catch((error) => console.log(error));
	}, []);
	return (
		<div>
			{
				<h2>
					Top Song: <b>{top1Songs}</b>
				</h2>
			}
		</div>
	);
}
