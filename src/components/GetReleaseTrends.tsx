import { useState, useEffect } from 'react';

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

	useEffect(() => {
		const analysis = async () => {
			try {
				const releaseYears = trackData.map((track) => track.trackRelease);
				const result = calculateConfidenceInterval(releaseYears);

				if (result[1] < 1990) {
					setAnalysisResult('Old');
				} else {
					setAnalysisResult('New');
				}
				const rawResult = result[1].toFixed(0);
				setAnalysisResultRaw(rawResult);
			} catch (err) {
				console.error('Error forming Release analysis:', err);
				setAnalysisResult(null);
			}
		};

		analysis();
	}, [trackData]);

	return (
		<div>
			<b>Release</b>
			{analysisResult === null ? (
				<div>Loading...</div>
			) : (
				<p>
					You listen to {analysisResult} music. Your release year result was:{' '}
					{analysisResultRaw}
				</p>
			)}
		</div>
	);
}
