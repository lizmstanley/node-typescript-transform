import * as util from 'util';
import * as fs from 'fs';

const stream = require('stream');
const pipeline = util.promisify(stream.pipeline);
const csv = require('csv-parser');
import ReadableStream = NodeJS.ReadableStream;
import WritableStream = NodeJS.WritableStream;
import { LatLonTransformer, NdjsonTransformer } from './transform';

/**
 * This is an immediately-invoked function expression. In this case it's taking a couple
 * of parameters (which are passed in from the npm start script in package.json.)
 */
(async (inFile, outFile) => {
    await main(inFile, outFile);
})(process.env.IN_FILE, process.env.OUT_FILE);

/**
 * Assembles the pipeline for all the steps we need. Async because we're reading from/writing to the filesystem.
 */
async function main(inFile: string, outFile: string) {
    console.log(`Reading from ${inFile}`);
    console.log(`Writing to ${outFile}`);
    const readable: ReadableStream = fs.createReadStream(inFile);
    const writeable: WritableStream = fs.createWriteStream(outFile);

    await pipeline(readable, csv(), new LatLonTransformer(), new NdjsonTransformer(), writeable);
}
