import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface Track {
	trackExplicit: boolean;
}

interface PAProps {
	trackData: Track[];
}

export default function ExplicitAnalysis({ trackData }: PAProps) {
	const [analysisResult, setAnalysisResult] = useState<string | null>(null);
	const [chartData, setChartData] = useState<{ name: string; value: number }[]>(
		[],
	);
	const [explicitPercentage, setExplicitPercentage] = useState<number | null>(
		null,
	);

	useEffect(() => {
		const analysis = async () => {
			try {
				let trueCount = 0;
				let falseCount = 0;

				// Count occurrences of explicit and clean
				trackData.forEach((track) => {
					if (track.trackExplicit === true) {
						trueCount++;
					} else {
						falseCount++;
					}
				});

				// Set chart data for the pie chart
				setChartData([
					{ name: 'Explicit', value: trueCount },
					{ name: 'Clean', value: falseCount },
				]);

				// Calculate the explicit percentage
				const totalCount = trueCount + falseCount;
				setExplicitPercentage(
					totalCount > 0 ? (trueCount / totalCount) * 100 : 0,
				);

				// Determine the most common value
				setAnalysisResult(trueCount > falseCount ? 'explicit' : 'clean');
			} catch (err) {
				console.error('Error forming Explicit analysis:', err);
				setAnalysisResult(null);
			}
		};

		analysis();
	}, [trackData]);

	return (
		<div className="flex flex-col items-center">
			<b>Content Rating</b>
			{analysisResult === null ? (
				<div>Loading...</div>
			) : (
				<p>You listen to mostly {analysisResult} music.</p>
			)}
			{explicitPercentage !== null && (
				<p>Explicit Tracks: {explicitPercentage.toFixed(2)}%</p>
			)}
			<PieChart width={300} height={300}>
				<Pie
					data={chartData}
					dataKey="value"
					nameKey="name"
					cx="50%"
					cy="50%"
					outerRadius={80}
					fill="#8884d8"
					label
				>
					{chartData.map((entry, index) => (
						<Cell
							key={`cell-${index}`}
							fill={index === 0 ? '#FCBB6D' : '#D3737F'}
						/>
					))}
				</Pie>
				<Tooltip />
				<Legend />
			</PieChart>
		</div>
	);
}
