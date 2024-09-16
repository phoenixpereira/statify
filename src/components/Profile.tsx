import { useState, useEffect } from 'react';

export default function GetProfile() {
	const [displayName, setDisplayName] = useState(null);
	useEffect(() => {
		fetch('https://api.spotify.com/v1/me', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${window.localStorage.getItem('token')}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setDisplayName(data.display_name);
				console.log(data);
			})
			.catch((error) => console.log(error));
	}, []);
	return (
		<div>
			<h2>Profile</h2>
			{displayName && <p>{displayName}</p>}
		</div>
	);
}
