import { Transform, TransformOptions } from 'stream';
import { LatitudeCardinalDir, LongitudeCardinalDir, toGeoLoc } from './conversion';
import * as os from 'os';

export default class LatLonTransformer extends Transform {
    public constructor() {
        const opts: TransformOptions = {
            objectMode: true,
            transform: (row: any, encoding: string, callback: Function) => {
                let nsDir: keyof typeof LatitudeCardinalDir = row.NS;
                let ewDir: keyof typeof LongitudeCardinalDir = row.EW;
                callback(
                    null,
                    JSON.stringify({
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
                    }) + os.EOL,
                );
            },
        };
        super(opts);
    }
}
