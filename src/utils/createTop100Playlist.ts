export async function createTop100Playlist(userID: string, trackIDs: string[]) {
	const token = window.localStorage.getItem('token') || '';
	const playlistUrl = `https://api.spotify.com/v1/users/${userID}/playlists`;
	const createPlaylistBody = {
		name: 'Statify Top 100 Tracks',
		description: 'Playlist created by Statify',
		public: false,
	};

	try {
		// Step 1: Create the playlist
		const createPlaylistResponse = await fetch(playlistUrl, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(createPlaylistBody),
		});

		if (!createPlaylistResponse.ok) {
			const errorResponse = await createPlaylistResponse.json();
			throw new Error(
				`Failed to create playlist: ${errorResponse.error.message}`,
			);
		}

		const playlistData = await createPlaylistResponse.json();
		const playlistID = playlistData.id;

		// Step 2: Add tracks to the created playlist
		const addTracksUrl = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
		const trackUris = trackIDs.map((id) => `spotify:track:${id}`);

		const addTracksResponse = await fetch(addTracksUrl, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				uris: trackUris,
			}),
		});

		if (!addTracksResponse.ok) {
			const errorResponse = await addTracksResponse.json();
			throw new Error(
				`Failed to add tracks to playlist: ${errorResponse.error.message}`,
			);
		}

		console.log('Playlist created and tracks added successfully!');
	} catch (err) {
		console.error('Error creating playlist:', err);
	}
}
