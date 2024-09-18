import { useState, useEffect } from 'react';

import useTop100 from '../hooks/useTop100';
import { calculateConfidenceInterval } from '../utils/GetCI';

interface CIProps {
	title: string;
	getDist: (songIds: string[]) => Promise<number[]>;
}

export default function Analysis({ title, getDist }: CIProps) {
	const [confidenceInterval, setConfidenceInterval] = useState<
		[number, number, number] | null
	>(null);
	const { top100: songIds } = useTop100();

	useEffect(() => {
		const fetchData = async () => {
			return await getDist(songIds);
		};

		const fetchDataAndCalculate = async () => {
			try {
				const data = await fetchData();
				const interval =
					data.length > 0 ? calculateConfidenceInterval(data) : null;
				setConfidenceInterval(interval as [number, number, number] | null);
			} catch (err) {
				console.error('Error fetching data:', err);
				setConfidenceInterval(null);
			}
		};

		fetchDataAndCalculate();
	}, [songIds, getDist]);

	return (
		<div>
			<b>{title}</b>
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
