import { CooordinateDegrees, GeoLoc, LatitudeCardinalDir, LongitudeCardinalDir, toGeoLoc } from '../src/conversion';
import { assert } from 'chai';

const bigChickenLat: CooordinateDegrees<LatitudeCardinalDir> = { degrees: 33, minutes: 57, seconds: 5, dir: LatitudeCardinalDir.N };
const bigChickenLon: CooordinateDegrees<LongitudeCardinalDir> = { degrees: 84, minutes: 31, seconds: 13, dir: LongitudeCardinalDir.W };

describe('testConversion', () => {
    it('should convert from dms to geoloc', () => {
        const result: GeoLoc = toGeoLoc({ latitude: bigChickenLat, longitude: bigChickenLon });

        assert.deepStrictEqual(result, <GeoLoc>{
            coordinates: [-84.5203, 33.9514],
            type: 'Point',
        });
    });
});
