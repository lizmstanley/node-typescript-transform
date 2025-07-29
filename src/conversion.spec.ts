import {CooordinateDegrees, GeoLoc, LatitudeCardinalDir, LongitudeCardinalDir, toGeoLoc} from './conversion';

const bigChickenLat: CooordinateDegrees<LatitudeCardinalDir> = { degrees: 33, minutes: 57, seconds: 5, dir: LatitudeCardinalDir.N };
const bigChickenLon: CooordinateDegrees<LongitudeCardinalDir> = { degrees: 84, minutes: 31, seconds: 13, dir: LongitudeCardinalDir.W };

describe("conversion", () => {
    it('should convert from dms to geoloc', () => {
        const result: GeoLoc = toGeoLoc({ latitude: bigChickenLat, longitude: bigChickenLon });

        expect(result).toEqual(<GeoLoc>{
            coordinates: [-84.5203, 33.9514],
            type: 'Point',
        });
    });
});
