import { calculateConfidenceInterval } from '../../utils/GetCI';
import GetDurationDist from '../getdistribution/GetDurationDist';

export default function DurationDistAnalysis() {
	const [lowerBound, mean, upperBound] =
		calculateConfidenceInterval(GetDurationDist());

	return (
		<div>
			<b>Duration Analysis</b>
			<p>
				95% Confidence Interval: [{lowerBound}, {mean}, {upperBound}]
			</p>
		</div>
	);
}
