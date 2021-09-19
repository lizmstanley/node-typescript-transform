import * as util from 'util';
import * as fs from 'fs';

const stream = require('stream');
const pipeline = util.promisify(stream.pipeline);
const csv = require('csv-parser');
import ReadableStream = NodeJS.ReadableStream;
import WritableStream = NodeJS.WritableStream;
import LatLonTransformer from './transform';

(async (inFile, outFile) => {
    await main(inFile, outFile);
})(process.env.IN_FILE, process.env.OUT_FILE);

async function main(inFile: string, outFile: string) {
    console.log(`Reading from ${inFile}`);
    console.log(`Writing to ${outFile}`);
    const readable: ReadableStream = fs.createReadStream(inFile);
    const writeable: WritableStream = fs.createWriteStream(outFile);

    await pipeline(readable, csv(), new LatLonTransformer(), writeable);
}
