const authEndpoint = 'https://accounts.spotify.com/authorize';

const redirectUri = import.meta.env.VITE_REDIRECT_URI;

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

const scopes = [
	'user-read-currently-playing',
	'user-read-recently-played',
	'user-read-playback-state',
	'user-top-read',
	'user-modify-playback-state',
	'user-follow-read',
];

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
