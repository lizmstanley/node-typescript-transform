# node-typescript-transform
A small project to illustrate using Node.js transform streams and Typescript. I'm a big fan of
Node.js transform streams to process data, because they break up what could be a very complex process,
into standalone steps. These steps can be mixed and matched to form a pipeline, and also are easy to unit 
test because they are completely independent of each other.

This is a simple scenario: transform a csv file having the format

```text
LatD,LatM,LatS,NS,LonD,LonM,LonS,EW,City,State
41,5,59,N,80,39,0,W,Youngstown,OH
42,52,48,N,97,23,23,W,Yankton,SD
46,35,59,N,120,30,36,W,Yakima,WA
42,16,12,N,71,48,0,W,Worcester,MA
```

Into this format, and write the result as ndjson to a new file:

```json
{"city":"Youngstown","state":"OH","geometry":{"type":"Point","coordinates":[-80.65,41.0997]}}
{"city":"Yankton","state":"SD","geometry":{"type":"Point","coordinates":[-97.3897,42.88]}}
{"city":"Yakima","state":"WA","geometry":{"type":"Point","coordinates":[-120.51,46.5997]}}
{"city":"Worcester","state":"MA","geometry":{"type":"Point","coordinates":[-71.8,42.27]}}
```

Note that by leveraging transform streams, Typescript enums, etc. I'm able to do this without using any if/else statements!

Run tests with `npm run test`.
Example execution (assuming cities.csv as the input file, and cities.ndjson as the output), with the shell script:

`./convert.sh cities.csv cities.ndjson`