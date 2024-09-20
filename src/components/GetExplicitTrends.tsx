import { useState, useEffect } from 'react';

interface Track {
	isExplicit: number;
}

interface PAProps {
	trackData: Track[];
}

export default function ExplicitAnalysis({ trackData }: PAProps) {
	const [analysisResult, setAnalysisResult] = useState<string | null>(null);

	useEffect(() => {
		const analysis = async () => {
			try {
				let trueCount = 0;
				let falseCount = 0;

				// Count occurrences of explicit (1) and clean (0)
				trackData.forEach((track) => {
					if (track.isExplicit === 1) {
						trueCount++;
					} else if (track.isExplicit === 0) {
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

		analysis();
	}, [trackData]);

	return (
		<div>
			<b>Explicit</b>
			{analysisResult === null ? (
				<div>Loading...</div>
			) : (
				<p>You listen to {analysisResult} music.</p>
			)}
		</div>
	);
}
