import {pipeline} from 'node:stream/promises';
import * as fs from "node:fs";

import csv from 'csv-parser';
import { LatLonTransformer, NdjsonTransformer } from './transform';

/**
 * This is an immediately invoked function expression. In this case, it's taking a couple
 * of parameters (which are passed in from the npm start script in package.json.)
 */
(async (inFile: string, outFile: string) => {
    await main(inFile, outFile);
})(process.env.IN_FILE as string, process.env.OUT_FILE as string);

/**
 * Assembles the pipeline for all the steps we need. Async because we're reading from/writing to the filesystem.
 */
async function main(inFile: string, outFile: string) {
    console.log(`Reading from ${inFile}`);
    console.log(`Writing to ${outFile}`);
    const readStream: fs.ReadStream = fs.createReadStream(inFile);
    const writeStream: fs.WriteStream = fs.createWriteStream(outFile);

    await pipeline(readStream, csv(), new LatLonTransformer(), new NdjsonTransformer(), writeStream);
}
