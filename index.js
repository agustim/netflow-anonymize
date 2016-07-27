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
    input: require('fs').createReadStream('./example/total_linies_csv.txt')
  });

  lineLog.on('line', function (line) {
    fs.appendFile('./example/ano_total_linies_csv.txt', flowAnonymize.lineAnonymize(line, IPv4Ranges) + "\n", function (err) {
      if (err) console.error("Error to write file: "+err);
    });
    process.stdout.write("+");
  });
  console.log("End of file");
}
