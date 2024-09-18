interface ProfileData {
	display_name: string;
}

export const fetchProfile = async (token: string): Promise<string | null> => {
	try {
		const response = await fetch('https://api.spotify.com/v1/me', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const data: ProfileData = await response.json();
		return data.display_name || null;
	} catch (error) {
		console.error('Fetch error:', error);
		return null;
	}
};
