import { useState, useEffect } from 'react';

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

	useEffect(() => {
		const analysis = async () => {
			try {
				const popularityArray = trackData.map((track) => track.trackPopularity);
				const result = calculateConfidenceInterval(popularityArray);
				if (result[1] > 70) {
					setAnalysisResult('Popular');
				} else {
					setAnalysisResult('Unpopular');
				}
				const rawResult = result[1].toFixed(2);
				setAnalysisResultRaw(rawResult);
			} catch (err) {
				console.error('Error forming popularity analysis:', err);
				setAnalysisResult(null);
			}
		};

		analysis();
	}, [trackData]);

	return (
		<div>
			<b>Popularity</b>
			{analysisResult === null ? (
				<div>Loading...</div>
			) : (
				<p>
					You listen to {analysisResult} music. Your popularity result was:{' '}
					{analysisResultRaw}
				</p>
			)}
		</div>
	);
}
