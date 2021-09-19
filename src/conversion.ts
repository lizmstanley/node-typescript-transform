export enum LatitudeCardinalDir {
    N = 1,
    S = -1,
}

export enum LongitudeCardinalDir {
    E = 1,
    W = -1,
}

export interface CooordinateDegrees<D> {
    degrees: number;
    minutes: number;
    seconds: number;
    dir: D;
}

export class GeoLoc {
    readonly coordinates: number[];
    readonly type: string = 'Point';

    constructor(coordinates: number[]) {
        this.coordinates = coordinates;
    }
}

export function toGeoLoc({ latitude, longitude }): GeoLoc {
    return new GeoLoc([convertDMS(longitude), convertDMS(latitude)]);
}

function convertDMS({ dir, degrees, minutes, seconds }): number {
    return parseFloat((dir * (degrees + minutes / 60 + seconds / 3600)).toFixed(4));
}
