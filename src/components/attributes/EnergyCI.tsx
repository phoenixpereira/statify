import { calculateConfidenceInterval } from '../../utils/GetCI';
import GetEnergyDist from '../getdistribution/GetEnergyDist';

export default function EnergyDistAnalysis() {
	const [lowerBound, mean, upperBound] =
		calculateConfidenceInterval(GetEnergyDist());

	return (
		<div>
			<b>Energy Analysis</b>
			<p>
				95% Confidence Interval: [{lowerBound}, {mean}, {upperBound}]
			</p>
		</div>
	);
}
