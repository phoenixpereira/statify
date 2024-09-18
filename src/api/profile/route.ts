import { fetchFromSpotify } from '../../utils/fetcher';

export const getProfileData = async () => {
	return await fetchFromSpotify('me');
};
