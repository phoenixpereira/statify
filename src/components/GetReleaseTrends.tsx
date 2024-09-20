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
	trackRelease: number;
}

interface PAProps {
	trackData: Track[];
}

export default function ReleaseAnalysis({ trackData }: PAProps) {
	const [analysisResult, setAnalysisResult] = useState<string | null>(null);
	const [analysisResultRaw, setAnalysisResultRaw] = useState<string | null>(
		null,
	);
	const [releaseData, setReleaseData] = useState<
		{ range: string; Count: number }[]
	>([]);
	const [lineString, setLineString] = useState<number | undefined>(undefined); // Change to number

	useEffect(() => {
		const analysis = async () => {
			try {
				const releaseYears = trackData.map((track) => track.trackRelease);
				const result = calculateConfidenceInterval(releaseYears);

				const dominantDecade = Math.floor(result[1] / 10) * 10; // Get the dominant decade
				const decadeLabel = `${dominantDecade}s`; // Format label for the decade

				setAnalysisResult(decadeLabel);
				const rawResult = result[1].toFixed(0);
				setAnalysisResultRaw(rawResult);

				const frequencyMap: { [key: string]: number } = {};
				releaseYears.forEach((year) => {
					const rangeStart = Math.floor(year / 10) * 10; // Group by decades
					const rangeEnd = rangeStart + 9; // 10-year range
					const rangeKey = `${rangeStart}s`; // Update range format to include "s"
					frequencyMap[rangeKey] = (frequencyMap[rangeKey] || 0) + 1;
				});

				const data = Object.keys(frequencyMap).map((key) => ({
					range: key,
					Count: frequencyMap[key],
				}));

				data.sort((a, b) => {
					const startA = parseInt(a.range.split('s')[0]);
					const startB = parseInt(b.range.split('s')[0]);
					return startA - startB;
				});

				setReleaseData(data);
				setLineString(dominantDecade); // Set the dominant decade for the line
			} catch (err) {
				console.error('Error forming Release analysis:', err);
				setAnalysisResult(null);
			}
		};

		analysis();
	}, [trackData]);

	return (
		<div className="flex flex-col items-center">
			<b>Release Year</b>
			{analysisResult === null ? (
				<div>Loading...</div>
			) : (
				<div>
					<p>You listen mostly to {analysisResult} music.</p>
					<p>Your average release year is: {analysisResultRaw}.</p>
				</div>
			)}
			<ResponsiveContainer width="100%" height={300}>
				<BarChart
					data={releaseData}
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
							value="Release Decade"
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
					<Tooltip wrapperStyle={{ color: 'black' }} />
					<Bar dataKey="Count" fill="#FCBB6D" />
					{lineString && (
						<ReferenceLine
							x={`${lineString}s`}
							stroke="#D3737F"
							strokeDasharray="6 6"
						/>
					)}
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
