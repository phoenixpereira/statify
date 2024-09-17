import { calculateConfidenceInterval } from '../../utils/GetCI';
import GetTempoDist from '../getdistribution/GetTempoDist';

export default function TempoDistAnalysis() {
	const [lowerBound, mean, upperBound] =
		calculateConfidenceInterval(GetTempoDist());

	return (
		<div>
			<b>Tempo Analysis</b>
			<p>
				95% Confidence Interval: [{lowerBound}, {mean}, {upperBound}]
			</p>
		</div>
	);
}
