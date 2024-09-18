export function getFrequencyAnalysis(data: any[]) {
	const frequencyMap: { [key: number]: number } = {};

	data.forEach((item) => {
		frequencyMap[item] = (frequencyMap[item] || 0) + 1;
	});

	let leastFrequentValue: any = null;
	let leastFrequency = Infinity;

	for (const key in frequencyMap) {
		if (frequencyMap[key] < leastFrequency) {
			leastFrequency = frequencyMap[key];
			leastFrequentValue = key;
		}
	}

	let mostFrequentValue: any = null;
	let mostFrequency = -Infinity;

	for (const key in frequencyMap) {
		if (frequencyMap[key] > mostFrequency) {
			mostFrequency = frequencyMap[key];
			mostFrequentValue = key;
		}
	}

	return [leastFrequentValue, mostFrequentValue];
}
