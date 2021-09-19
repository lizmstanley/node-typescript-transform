import * as util from 'util';
import { Transform } from 'stream';
import LatLonTransformer from '../src/transform';
import { GeoLoc } from '../src/conversion';
const stream = require('stream');
const pipeline = util.promisify(stream.pipeline);

describe('testTransform', () => {
    const data = [
        { LatD: 41, LatM: 5, LatS: 59, NS: 'N', LonD: 80, LonM: 39, LonS: 0, EW: 'W', City: 'Youngstown', State: 'OH' },
        { LatD: 42, LatM: 52, LatS: 48, NS: 'N', LonD: 97, LonM: 23, LonS: 23, EW: 'W', City: 'Yankton', State: 'SD' },
        { LatD: 46, LatM: 35, LatS: 59, NS: 'N', LonD: 120, LonM: 30, LonS: 36, EW: 'W', City: 'Yakima', State: 'WA' },
        { LatD: 42, LatM: 16, LatS: 12, NS: 'N', LonD: 71, LonM: 48, LonS: 0, EW: 'W', City: 'Worcester', State: 'MA' },
        { LatD: 43, LatM: 37, LatS: 48, NS: 'N', LonD: 89, LonM: 46, LonS: 11, EW: 'W', City: 'Wisconsin Dells', State: 'WI' },
        { LatD: 36, LatM: 5, LatS: 59, NS: 'N', LonD: 80, LonM: 15, LonS: 0, EW: 'W', City: 'Winston-Salem', State: 'NC' },
        { LatD: 49, LatM: 52, LatS: 48, NS: 'N', LonD: 97, LonM: 9, LonS: 0, EW: 'W', City: 'Winnipeg', State: 'MB' },
    ];

    it('testTransformPipeline', async () => {
        const transformResult = [];
        await pipeline(
            stream.Readable.from(data),
            new LatLonTransformer(),
            new Transform({
                objectMode: true,
                transform: (geoLoc: GeoLoc, encoding, callback) => {
                    transformResult.push(geoLoc);
                    callback();
                },
            }),
        );
    });
});
