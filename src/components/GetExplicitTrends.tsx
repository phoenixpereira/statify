import { useState, useEffect } from 'react';

interface PAProps {
	array: number[];
}

export default function ExplicitAnalysis({ array }: PAProps) {
	const [analysisResult, setAnalysisResult] = useState<String | null>(null);

	useEffect(() => {
		const Analysis = async () => {
			try {
				let trueCount = 0;
				let falseCount = 0;

				// Use forEach to count the occurrences of true and false
				array.forEach((value) => {
					if (value == 1) {
						trueCount++;
					} else if (value == 0) {
						falseCount++;
					}
				});

				// Determine the most common value
				if (trueCount > falseCount) {
					setAnalysisResult('Explicit');
				} else {
					setAnalysisResult('Clean');
				}
			} catch (err) {
				console.error('Error forming Explicit analysis:', err);
				setAnalysisResult(null);
			}
		};

		Analysis();
	}, []);

	return (
		<div>
			<b>Explicit</b>
			{analysisResult === null ? (
				<div>Loading...</div>
			) : (
				<>
					<p>You Listen to {analysisResult} Music</p>
				</>
			)}
		</div>
	);
}
