export class Stop {
	id: number;
	code: number;
	title: string;
	lat: number;
	lon: number;
	nextScheduleArrival: string;
	nextPredictArrival: string;
	predictedMinutes: number;
	nextScheduleArrivalEpoch: number;
	nextPredictArrivalEpoch: number;
	diffMinutes: number;
}