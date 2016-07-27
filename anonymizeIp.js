'use strict'
const sha256 = require('js-sha256');
const IpUtils = require('./ipUtils');

class anonymizeIp{
  constructor(){
    this.cache = {}
    this.max_cache = 1000;
  }
  anonymize(ip){
    if(!this.cache[ip]) {
      var a = sha256(ip);
      this.cache[ip] = IpUtils.longv42ip(IpUtils.ipv42long("10.0.0.0")+parseInt(a.slice(1,7),16));
    }
    return this.cache[ip];
  }
  existSynonyms(rangs){
    var IPList = {};
    for(let x=0; x < 10; x++){
      for(let y=rangs[x][0]; y < rangs[x][1]; y++){
        var ipanon = this.anonymize(IpUtils.longv42ip(y));
        if ((IPList[ipanon]) && (IPList[ipanon] != IpUtils.longv42ip(y))) {
            return(true)
        }
        IPList[ipanon] = IpUtils.longv42ip(y)
      }
    }
    return false;
  }
  generateCache(rangs){
    for(let x=0; x < 10; x++){
      for(let y=rangs[x][0]; y < rangs[x][1]; y++){
        var ip = IpUtils.longv42ip(y);
        var ipanon = this.anonymize(ip);
        this.cache[ip] = ipanon;
      }
    }
  }

}

module.exports = anonymizeIp
