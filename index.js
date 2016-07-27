'use strict'

var exec = require('child_process').exec;
const readline = require('readline');
const IpUtils = require('./ipUtils');
var IPv4Ranges = [];

/* Get IP from guifi */
var child = exec(`whois -h whois.ripe.net -- '-i origin AS49835'|grep route|egrep -o [[:digit:]]+\.[[:digit:]]+\.[[:digit:]]+\.[[:digit:]]+\/[[:digit:]]+`);
var linereader = readline.createInterface(child.stdout, child.stdin);
//var ipUtils = new IpUtils();

linereader.on('line', function (data) {
  IPv4Ranges.push(IpUtils.cidrv4ToRange(data));
});

/* When read all ips start analisis */
child.stdout.on('end', () => { console.log(IPv4Ranges);console.log("All IPv4 Range was be created.") })
