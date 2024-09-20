export async function createPlaylist(userID: string, trackIDs: string[]) {
	const token = window.localStorage.getItem('token') || '';
	const playlistUrl = `https://api.spotify.com/v1/users/${userID}/playlists`;
	const createPlaylistBody = {
		name: 'Recommended Playlist',
		description: 'Playlist created with song recommendations',
		public: false, // set to true if you want it public
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
			throw new Error('Failed to create playlist');
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
			throw new Error('Failed to add tracks to playlist');
		}

		console.log('Playlist created and tracks added successfully!');
	} catch (err) {
		console.error('Error creating playlist:', err);
	}
}
