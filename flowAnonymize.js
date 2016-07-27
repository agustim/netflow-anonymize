'use strict'
const EventEmitter = require('events').EventEmitter;
var AnonymizeIp = require('./anonymizeIp.js');
const IpUtils = require('./ipUtils');

class flowAnonymize extends EventEmitter{
  constructor(){
    super();
    this.anonymizeIp = new AnonymizeIp();
  }
  lineAnonymize(line, range){
    //split by ,
    var aLine = line.split(",")
    for(let x=0; x < aLine.length; x++){
      if (aLine[x].match(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)){
        if(IpUtils.isInRangv4(aLine[x], range))
          aLine[x] = this.anonymizeIp.anonymize(aLine[x]);
      }
    }
    return aLine.join(",")
  }

}

module.exports = flowAnonymize
