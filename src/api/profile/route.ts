import { fetchFromSpotify } from '../../utils/fetcher';

export const getProfileData = async (token: string) => {
	return await fetchFromSpotify('me', token);
};
