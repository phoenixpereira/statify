export function getFrequencyAnalysis(
	data: number[],
): [number | null, number | null] {
	const frequencyMap: { [key: string]: number } = {};

	data.forEach((item) => {
		frequencyMap[item] = (frequencyMap[item] || 0) + 1;
	});

	let leastFrequentValue: number | null = null;
	let leastFrequency = Infinity;

	let mostFrequentValue: number | null = null;
	let mostFrequency = -Infinity;

	for (const key in frequencyMap) {
		const keyAsNumber = Number(key);
		const frequency = frequencyMap[key];

		if (frequency < leastFrequency) {
			leastFrequency = frequency;
			leastFrequentValue = keyAsNumber;
		}

		if (frequency > mostFrequency) {
			mostFrequency = frequency;
			mostFrequentValue = keyAsNumber;
		}
	}

	return [leastFrequentValue, mostFrequentValue];
}
