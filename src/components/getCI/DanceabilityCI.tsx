import { calculateConfidenceInterval } from '../../utils/GetCI';
import GetDanceabilityDist from '../getdistribution/GetDanceabilityDist';

export default function DanceDistAnalysis() {
	const [lowerBound, mean, upperBound] = calculateConfidenceInterval(
		GetDanceabilityDist(),
	);

	return (
		<div>
			<b>Danceability Analysis</b>
			<p>
				95% Confidence Interval: [{lowerBound}, {mean}, {upperBound}]
			</p>
		</div>
	);
}
