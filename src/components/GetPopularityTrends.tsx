import { useState, useEffect } from 'react';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Label,
	ReferenceLine,
	ResponsiveContainer,
} from 'recharts';

import { calculateConfidenceInterval } from '../utils/CI';

interface Track {
	trackPopularity: number;
}

interface PAProps {
	trackData: Track[];
}

export default function PopularityAnalysis({ trackData }: PAProps) {
	const [analysisResult, setAnalysisResult] = useState<string | null>(null);
	const [analysisResultRaw, setAnalysisResultRaw] = useState<string | null>(
		null,
	);
	const [popularityData, setPopularityData] = useState<
		{ range: string; count: number }[]
	>([]);
	const [lineString, setLineString] = useState<string | undefined>(undefined);

	useEffect(() => {
		const analysis = async () => {
			try {
				const popularityArray = trackData.map((track) => track.trackPopularity);
				const result = calculateConfidenceInterval(popularityArray);

				// Calculate the range as "X - Y" with Y being X + 4
				const rangeStart = Math.floor(result[0] / 5) * 5;
				const rangeEnd = rangeStart + 4;
				const rangeKey = `${rangeStart} - ${rangeEnd}`;
				setLineString(rangeKey);

				const rawResult = result[1].toFixed(2);
				setAnalysisResultRaw(rawResult);

				if (result[1] > 85) {
					setAnalysisResult('very popular');
				} else if (result[1] > 70) {
					setAnalysisResult('popular');
				} else if (result[1] > 50) {
					setAnalysisResult('average in popularity');
				} else if (result[1] > 30) {
					setAnalysisResult('obscure');
				} else {
					setAnalysisResult('very obscure');
				}

				const frequencyMap: { [key: string]: number } = {};
				popularityArray.forEach((popularity) => {
					const rangeStart = Math.max(0, Math.floor(popularity / 5) * 5);
					const rangeEnd = Math.min(100, rangeStart + 4);
					const rangeKey = `${rangeStart} - ${rangeEnd}`;
					frequencyMap[rangeKey] = (frequencyMap[rangeKey] || 0) + 1;
				});

				const data = Object.keys(frequencyMap).map((key) => ({
					range: key,
					count: frequencyMap[key],
				}));

				data.sort((a, b) => {
					const startA = parseInt(a.range.split(' - ')[0]);
					const startB = parseInt(b.range.split(' - ')[0]);
					return startA - startB;
				});

				setPopularityData(data);
			} catch (err) {
				console.error('Error forming popularity analysis:', err);
				setAnalysisResult(null);
			}
		};

		analysis();
	}, [trackData]);

	return (
		<div className="flex flex-col items-center">
			<b>Popularity</b>
			{analysisResult === null ? (
				<div>Loading...</div>
			) : (
				<div>
					<p>You listen to music that is considered {analysisResult}.</p>
					<p>Your popularity result was: {analysisResultRaw}</p>
				</div>
			)}
			<ResponsiveContainer width="100%" height={300}>
				<BarChart
					data={popularityData}
					margin={{
						top: 20,
						right: 30,
						left: 20,
						bottom: 10,
					}}
				>
					<CartesianGrid strokeOpacity="0" stroke="#F7F4EF" />
					<XAxis dataKey="range" stroke="#F7F4EF">
						<Label
							value="Popularity"
							position="bottom"
							offset={-5}
							fill="#F7F4EF"
						/>
					</XAxis>
					<YAxis stroke="#F7F4EF">
						<Label
							value="Count"
							angle={-90}
							position="left"
							offset={10}
							fill="#F7F4EF"
						/>
					</YAxis>
					<Tooltip />
					<Bar dataKey="count" fill="#FCBB6D" />
					<ReferenceLine
						x={lineString}
						stroke="#D3737F"
						strokeDasharray="6 6"
					/>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
