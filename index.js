'use strict'

var exec = require('child_process').exec;
const readline = require('readline');
const fs  = require("fs");
const IpUtils = require('./ipUtils');
const AnonymizeIp = require('./anonymizeIp');
const FlowAnonymize = require('./flowAnonymize');

var flowAnonymize = new FlowAnonymize();
var anonymizeIp = new AnonymizeIp();
var IPv4Ranges = [];
var inputFile;
var outputFile;

if (process.argv.length < 4){
  console.log("Need input file in csv, and name to output file.");
  console.log("<program> <input_file> <output_file>");
  process.exit();
}
inputFile = process.argv[2];
outputFile = process.argv[3];

/* Get IP from guifi */
var child = exec(`whois -h whois.ripe.net -- '-i origin AS49835'|grep route|egrep -o [[:digit:]]+\.[[:digit:]]+\.[[:digit:]]+\.[[:digit:]]+\/[[:digit:]]+`);
var linereader = readline.createInterface(child.stdout, child.stdin);
//var ipUtils = new IpUtils();

linereader.on('line', function (data) {
  IPv4Ranges.push(IpUtils.cidrv4ToRange(data));
});

/* When read all ips start analisis */
child.stdout.on('end', () => { console.log("All IPv4 Range was be created."); stepTwo() })

function stepTwo(){

  var lineLog = require('readline').createInterface({
    input: require('fs').createReadStream('./example/' + inputFile)
  });

  lineLog.on('line', function (line) {
    fs.appendFile('./def/' + outputFile, flowAnonymize.lineAnonymize(line, IPv4Ranges) + "\n", function (err) {
      if (err) console.error("Error to write file: "+err);
    });
    process.stdout.write("+");
  });
  console.log("End of file");
}
