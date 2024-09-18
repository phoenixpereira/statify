import { fetchFromSpotify } from '../../utils/fetcher';

export const getAcousticDist = async (songIds: string[]) => {
	const idsString = songIds.join(',');
	const data = await fetchFromSpotify(`audio-features?ids=${idsString}`);

	if (data && data.audio_features) {
		return data.audio_features.map(
			(audioFeature: { acousticness: number }) => audioFeature.acousticness,
		);
	}

	return [];
};
