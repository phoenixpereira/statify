export function calculateConfidenceInterval(data: number[]) {
	const n = data.length;
	const mean = data.reduce((a, b) => a + b, 0) / n;

	// Calculate standard deviation
	const variance =
		data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (n - 1);
	const stdDev = Math.sqrt(variance);

	// Z-score for 95% confidence interval (two-tailed)
	const z = 1.96;

	// Calculate margin of error
	const marginOfError = z * (stdDev / Math.sqrt(n));

	// Confidence interval
	const lowerBound = mean - marginOfError;
	const upperBound = mean + marginOfError;

	return [lowerBound, mean, upperBound];
}
