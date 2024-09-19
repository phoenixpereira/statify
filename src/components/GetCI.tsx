import { useState, useEffect } from 'react';

import { calculateConfidenceInterval } from '../utils/CI';

interface CIProps {
	array: number[];
	name: String;
}

export default function Analysis({ name, array }: CIProps) {
	const [confidenceInterval, setConfidenceInterval] = useState<
		[number, number, number] | null
	>(null);

	useEffect(() => {
		const Calculate = async () => {
			try {
				const interval =
					array.length > 0 ? calculateConfidenceInterval(array) : null;
				setConfidenceInterval(interval as [number, number, number] | null);
			} catch (err) {
				console.error('Error calculating confidence interval:', err);
				setConfidenceInterval(null);
			}
		};

		Calculate();
	}, []);

	return (
		<div>
			<b>{name}</b>
			{confidenceInterval === null ? (
				<div>Loading...</div>
			) : (
				<p>
					95% Confidence Interval: [
					{confidenceInterval.map((value) => value.toFixed(2)).join(', ')}]
				</p>
			)}
		</div>
	);
}
