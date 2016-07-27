'use strict'

class ipUtilsClass{

  cidrv4ToRange(cidr) {
     var range = [2];
     cidr = cidr.split('/');
     var cidr_1 = parseInt(cidr[1])
     range[0] = this.int32ToUint( (this.ipv42long(cidr[0])) & ((-1 << (32 - cidr_1))) );
     range[1] = this.int32ToUint( range[0] + Math.pow(2, (32 - cidr_1)) - 1);
     return range;
  }

  cidrv4ToRangeIP(cidr) {
     var range = [2];
     cidr = cidr.split('/');
     var cidr_1 = parseInt(cidr[1])
     range[0] = this.longv42ip( (this.ipv42long(cidr[0])) & ((-1 << (32 - cidr_1))) );
     range[1] = this.longv42ip( this.ipv42long(range[0]) + Math.pow(2, (32 - cidr_1)) - 1);
     return range;
  }

  ipv42long(ip) {
    return this.int32ToUint(ip.split('.').reduce(function (sum, x) { return sum << 8 | x }, 0) >>> 0);
  }

  longv42ip(num) {
    num = this.int32ToUint(num)
    return [num >>> 24, num >> 16 & 255, num >> 8 & 255, num & 255].join('.');
  }
  int32ToUint(int) {
    var u = new Uint32Array(1);
    u[0] = int;
    return u[0];
  }
  isInRangv4(ip, rang){
    ip = this.ipv42long(ip)
    var ret = false
    for(let x=0; x < rang.length; x++){
      let e = rang[x];
      if ((e[0] <= ip) && (e[1] >= ip)) return true;
    }
    return false;
  }

}

// Creem un Objecte d'aquest classe per ser exportat.
var ipUtils = new ipUtilsClass();

module.exports = ipUtils
