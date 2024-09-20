import { useState, useEffect } from 'react';

import { calculateConfidenceInterval } from '../utils/CI';

interface PAProps {
	array: number[];
}

export default function DurationAnalysis({ array }: PAProps) {
	const [analysisResult, setAnalysisResult] = useState<string | null>(null);
	const [analysisResultRaw, setAnalysisResultRaw] = useState<string | null>(
		null,
	);

	useEffect(() => {
		const Analysis = async () => {
			try {
				const result = calculateConfidenceInterval(array);
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

		Analysis();
	}, []);

	return (
		<div>
			<b>Duration</b>
			{analysisResult === null ? (
				<div>Loading...</div>
			) : (
				<>
					<p>
						You Listen to {analysisResult} Music Your Duration Result was:{' '}
						{analysisResultRaw} Seconds
					</p>
				</>
			)}
		</div>
	);
}
