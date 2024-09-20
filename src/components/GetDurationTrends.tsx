import { useState, useEffect } from 'react';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ReferenceLine,
	Label,
	ResponsiveContainer,
} from 'recharts';

import { calculateConfidenceInterval } from '../utils/CI';

interface Track {
	trackDuration: number; // Duration in milliseconds
}

interface PAProps {
	trackData: Track[];
}

export default function DurationAnalysis({ trackData }: PAProps) {
	const [analysisResult, setAnalysisResult] = useState<string | null>(null);
	const [analysisResultRaw, setAnalysisResultRaw] = useState<string | null>(
		null,
	);
	const [durationData, setDurationData] = useState<
		{ range: string; count: number }[]
	>([]);
	const [lineString, setLineString] = useState<string | undefined>(undefined);

	useEffect(() => {
		const analysis = async () => {
			try {
				const durationArray = trackData.map((track) => track.trackDuration);
				const result = calculateConfidenceInterval(durationArray);

				// Calculate the range as "X - Y" with Y being X + 4999
				const rangeStart = Math.floor(result[0] / 5000) * 5000 + 5000;
				const rangeEnd = rangeStart + 4999;
				const rangeKey = `${rangeStart / 1000} - ${(rangeEnd / 1000).toFixed(0)}`; // Convert to seconds
				setLineString(rangeKey);

				const rawResult = (result[1] / 1000).toFixed(2); // Convert milliseconds to seconds
				setAnalysisResultRaw(rawResult);

				// Set analysisResult based on the duration
				if (result[1] < 90000) {
					setAnalysisResult('very short');
				} else if (result[1] < 180000) {
					setAnalysisResult('short');
				} else if (result[1] < 270000) {
					setAnalysisResult('medium');
				} else if (result[1] < 360000) {
					setAnalysisResult('long');
				} else {
					setAnalysisResult('very long');
				}

				const frequencyMap: { [key: string]: number } = {};
				durationArray.forEach((duration) => {
					const rangeStart = Math.max(0, Math.floor(duration / 5000) * 5000);
					const rangeEnd = rangeStart + 4999; // 5-second range
					const rangeKey = `${rangeStart / 1000} - ${(rangeEnd / 1000).toFixed(0)}`; // Convert to seconds
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

				setDurationData(data);
			} catch (err) {
				console.error('Error forming Duration analysis:', err);
				setAnalysisResult(null);
			}
		};

		analysis();
	}, [trackData]);

	return (
		<div className="flex flex-col items-center">
			<b>Duration</b>
			{analysisResult === null ? (
				<div>Loading...</div>
			) : (
				<div>
					<p>
						You listen to music with a {analysisResult} duration.
						<p>Your duration result was: {analysisResultRaw} seconds.</p>
					</p>
				</div>
			)}
			<ResponsiveContainer width="100%" height={300}>
				<BarChart
					data={durationData}
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
							value="Duration (seconds)"
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
