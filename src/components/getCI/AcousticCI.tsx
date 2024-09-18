import { getAcousticDist } from '../../api/acoustic-dist/route';
import useTop100 from '../../hooks/useTop100';
import { calculateConfidenceInterval } from '../../utils/GetCI';
import Analysis from './Analysis';

export default function AcousticDistAnalysis() {
	const { top100: songIds } = useTop100();

	const fetchAcousticDist = async () => {
		return await getAcousticDist(songIds);
	};

	return (
		<Analysis
			title="Acousticness Analysis"
			fetchData={fetchAcousticDist}
			calculateInterval={calculateConfidenceInterval}
		/>
	);
}
