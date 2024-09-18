const API_BASE_URL = 'https://api.spotify.com/v1/';

export const fetchFromSpotify = async (endpoint: string, token: string) => {
	try {
		const response = await fetch(`${API_BASE_URL}${endpoint}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		return await response.json();
	} catch (error) {
		console.error('Fetch error:', error);
		return null;
	}
};
