import { useState, useEffect } from 'react';

import { calculateConfidenceInterval } from '../utils/CI';

interface Track {
	trackDuration: number;
}

interface PAProps {
	trackData: Track[];
}

export default function DurationAnalysis({ trackData }: PAProps) {
	const [analysisResult, setAnalysisResult] = useState<string | null>(null);
	const [analysisResultRaw, setAnalysisResultRaw] = useState<string | null>(
		null,
	);

	useEffect(() => {
		const analysis = async () => {
			try {
				const durationArray = trackData.map((track) => track.trackDuration);
				const result = calculateConfidenceInterval(durationArray);
				if (result[1] < 100000) {
					setAnalysisResult('Short');
				} else {
					setAnalysisResult('Long');
				}
				const rawResult = (result[1] / 1000).toFixed(2);
				setAnalysisResultRaw(rawResult);
			} catch (err) {
				console.error('Error forming Duration analysis:', err);
				setAnalysisResult(null);
			}
		};

		analysis();
	}, [trackData]);

	return (
		<div>
			<b>Duration</b>
			{analysisResult === null ? (
				<div>Loading...</div>
			) : (
				<p>
					You listen to {analysisResult} music. Your duration result was:{' '}
					{analysisResultRaw} seconds.
				</p>
			)}
		</div>
	);
}
