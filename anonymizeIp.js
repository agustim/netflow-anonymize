'use strict'
const EventEmitter = require('events').EventEmitter;
const sha256 = require('js-sha256');
const IpUtils = require('./ipUtils');

class anonymizeIp{
  constructor(){
    this.cache = {}
    this.max_cache = 1000;
  }
  anonymize(ip){
    if(!this.cache[ip])
      var a = sha256(ip);
      this.cache[ip] = IpUtils.longv42ip(parseInt(a.slice(0,8),16));
    return this.cache[ip];
  }

}

module.exports = anonymizeIp
