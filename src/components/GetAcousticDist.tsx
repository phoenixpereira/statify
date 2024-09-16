import { useState, useEffect } from 'react';

import GetTop100 from './GetTop100';

export default function GetAcousticDist() {
	const [distAcoustic, setDistAcoustic] = useState([]);
	const songIds = GetTop100();
	const songIdsString = songIds.join(',');
	useEffect(() => {
		fetch(`https://api.spotify.com/v1/audio-features?ids=${songIdsString}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${window.localStorage.getItem('token')}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				const distAcoustic = data.map(
					(audio_features: { acousticness: any }) =>
						audio_features.acousticness,
				);
				setDistAcoustic(distAcoustic);
				console.log(data);
			})
			.catch((error) => console.log(error));
	}, []);
	return distAcoustic;
}
