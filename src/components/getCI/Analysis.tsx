import { useState, useEffect } from 'react';

interface AnalysisProps {
	fetchData: () => Promise<number[]>;
	calculateInterval: (data: number[]) => number[];
	title: string;
}

export default function Analysis({
	fetchData,
	calculateInterval,
	title,
}: AnalysisProps) {
	const [confidenceInterval, setConfidenceInterval] = useState<
		[number, number, number] | null
	>(null);

	useEffect(() => {
		const fetchDataAndCalculate = async () => {
			try {
				const data = await fetchData();
				const interval = data.length > 0 ? calculateInterval(data) : null;
				setConfidenceInterval(interval as [number, number, number] | null);
			} catch (err) {
				console.error('Error fetching data:', err);
				setConfidenceInterval(null);
			}
		};

		fetchDataAndCalculate();
	}, [fetchData, calculateInterval]);

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
