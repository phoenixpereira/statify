import { useState, useEffect } from 'react';

import { calculateConfidenceInterval } from '../utils/CI';

interface PAProps {
	array: number[];
}

export default function ReleaseAnalysis({ array }: PAProps) {
	const [analysisResult, setAnalysisResult] = useState<String | null>(null);
	const [analysisResultRaw, setAnalysisResultRaw] = useState<String | null>(
		null,
	);

	useEffect(() => {
		const Analysis = async () => {
			try {
				const result = calculateConfidenceInterval(array);
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

		Analysis();
	}, []);

	return (
		<div>
			<b>Release</b>
			{analysisResult === null ? (
				<div>Loading...</div>
			) : (
				<>
					<p>
						You Listen to {analysisResult} Music Your Release Result was:{' '}
						{analysisResultRaw}
					</p>
				</>
			)}
		</div>
	);
}
