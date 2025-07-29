/**
 * Creating a couple of enums to enforce specific cardinal directional values. That way, we don't have to do any validation.
 * We'll also leverage the numeric values here for determining positive/negative when converting to decimal coordinates.
 */
export enum LatitudeCardinalDir {
    N = 1,
    S = -1,
}

export enum LongitudeCardinalDir {
    E = 1,
    W = -1,
}

/**
 * The only difference between latitude and longitude is the type of the "dir" property. We can use generics for that.
 */
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

export function toGeoLoc({latitude, longitude}: {
    latitude: CooordinateDegrees<LatitudeCardinalDir>,
    longitude: CooordinateDegrees<LongitudeCardinalDir>
}): GeoLoc {
    return new GeoLoc([convertDMS<LongitudeCardinalDir>(longitude), convertDMS<LatitudeCardinalDir>(latitude)]);
}

function convertDMS<D>({dir, degrees, minutes, seconds}: CooordinateDegrees<D>): number {
    return parseFloat((dir as number * (degrees + minutes / 60 + seconds / 3600)).toFixed(4));
}
