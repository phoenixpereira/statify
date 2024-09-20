import { useState, useEffect } from 'react';

import { calculateConfidenceInterval } from '../utils/CI';

interface PAProps {
	array: number[];
}

export default function PopularityAnalysis({ array }: PAProps) {
	const [analysisResult, setAnalysisResult] = useState<String | null>(null);
	const [analysisResultRaw, setAnalysisResultRaw] = useState<String | null>(
		null,
	);

	useEffect(() => {
		const Analysis = async () => {
			try {
				const result = calculateConfidenceInterval(array);
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

		Analysis();
	}, []);

	return (
		<div>
			<b>Popularity</b>
			{analysisResult === null ? (
				<div>Loading...</div>
			) : (
				<>
					<p>
						You Listen to {analysisResult} Music Your Popularity Result was:{' '}
						{analysisResultRaw}
					</p>
				</>
			)}
		</div>
	);
}
