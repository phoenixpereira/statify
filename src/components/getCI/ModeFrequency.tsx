import { getFrequencyAnalysis } from '../../utils/GetFrequencyAnalysis';
import GetModeDist from '../getdistribution/GetModeDist';

export default function ModeFrequencyAnalysis() {
	const [leastFrequent, mostFrequent] = getFrequencyAnalysis(GetModeDist());

	return (
		<div>
			<b>Mode Analysis</b>
			<p>Most Frequent Mode : {mostFrequent}</p>
			<p>Least Frequent Mode : {leastFrequent}</p>
		</div>
	);
}
