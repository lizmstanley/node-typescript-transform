import { Transform, TransformOptions } from 'stream';
import { LatitudeCardinalDir, LongitudeCardinalDir, toGeoLoc } from './conversion';
import * as os from 'os';

/**
 * This transformer is responsible for transforming one row of csv into a json object. It doesn't know anything
 * about files, where the objects came from, or how they'll be used. The callback() puts the transformed object
 * on to the stream so the next transformer can do something with it.
 */
export class LatLonTransformer extends Transform {
    public constructor() {
        const opts: TransformOptions = {
            objectMode: true,
            transform: (row: any, encoding: string, callback: Function) => {
                let nsDir: keyof typeof LatitudeCardinalDir = row.NS;
                let ewDir: keyof typeof LongitudeCardinalDir = row.EW;
                callback(null, {
                    city: row.City,
                    state: row.State,
                    coordinates: toGeoLoc({
                        latitude: {
                            degrees: parseInt(row.LatD),
                            minutes: parseInt(row.LatM),
                            seconds: parseInt(row.LatS),
                            dir: LatitudeCardinalDir[nsDir],
                        },
                        longitude: {
                            degrees: parseInt(row.LonD),
                            minutes: parseInt(row.LonM),
                            seconds: parseInt(row.LonS),
                            dir: LongitudeCardinalDir[ewDir],
                        },
                    }),
                });
            },
        };
        super(opts);
    }
}

/**
 * This transformer takes json object and stringifies with, adding EOL. It doesn't know anything about the objects or what
 * will be done with them. It simply stringifies and add
 */
export class NdjsonTransformer extends Transform {
    public constructor() {
        const opts: TransformOptions = {
            objectMode: true,
            transform: (jsonObject: any, encoding: string, callback: Function) => {
                callback(null, JSON.stringify(jsonObject) + os.EOL);
            },
        };
        super(opts);
    }
}
