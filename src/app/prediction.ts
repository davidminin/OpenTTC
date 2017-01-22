export class Prediction {
	epochTime: number;
	seconds: number;
	minutes: number;
	branch: number;
	vehicleId: number;
}

export interface PredictionStopMap {
	[stopId: number]: Prediction[];
}