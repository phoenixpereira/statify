import { calculateConfidenceInterval } from '../../utils/GetCI';
import GetAcousticDist from '../getdistribution/GetAcousticDist';

export default function AcousticDistAnalysis() {
	const [lowerBound, mean, upperBound] =
		calculateConfidenceInterval(GetAcousticDist());

	return (
		<div>
			<b>Acousticness Analysis</b>
			<p>
				95% Confidence Interval: [{lowerBound}, {mean}, {upperBound}]
			</p>
		</div>
	);
}
