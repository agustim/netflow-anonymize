var expect = require('expect');
var AnonymizeIp = require('../anonymizeIp.js');
var ipUtils = require('../ipUtils.js');

var anonymizeIp = new AnonymizeIp();

describe('Testing de Flow Anonymize:', function(){
  before(function(){
  })
  it('Get IP to Long', function(){
    expect(ipUtils.longv42ip("3232235520")).toEqual("192.168.0.0");
  })
  it('Get Long to IP', function(){
    expect(ipUtils.ipv42long("192.168.0.0")).toEqual(3232235520);
  })
  it('Get Rangs', function(){
    expect(ipUtils.cidrv4ToRangeIP("192.168.0.0/24")).toEqual([ '192.168.0.0', '192.168.0.255' ]);
  })
  it('Is IP in Rang?', function() {
    arr = []
    arr.push(ipUtils.cidrv4ToRange("192.168.0.1/24"));
    arr.push(ipUtils.cidrv4ToRange("10.139.40.0/24"));

    expect(ipUtils.isInRangv4("10.139.40.123", arr )).toEqual(true);
  })
  it('Get AnonymizeIp', function(){
    expect(anonymizeIp.anonymize("192.168.0.1")).toEqual("55.215.168.6");
  })
  /*
  it('Check IP in guifi Range', function(){
flow_anonymize('2016-04-03 21:04:58,2016-04-03 21:04:58,0.000,84.88.72.48,109.69.15.5,80,41401,TCP,' +
               '.A....,0,0,4,4905,0,0,20,64,0,0,0,0,0,0,0.0.0.0,0.0.0.0,0,0,00:00:00:00:00:00,' +
               '00:00:00:00:00:00,00:00:00:00:00:00,00:00:00:00:00:00,0-0-0,0-0-0,0-0-0,0-0-0,0-0-0,0-0-0,0-0-0,0-0-0,0-0-0,0-0-0,0.0.0.0,0/0',

               '2016-04-03 21:04:58,2016-04-03 21:04:58,0.000,84.88.72.48,109.69.15.5,80,41401,TCP,' +
               '.A....,0,0,4,4905,0,0,20,64,0,0,0,0,0,0,0.0.0.0,0.0.0.0,0,0,00:00:00:00:00:00,' +
               '00:00:00:00:00:00,00:00:00:00:00:00,00:00:00:00:00:00,0-0-0,0-0-0,0-0-0,0-0-0,0-0-0,0-0-0,0-0-0,0-0-0,0-0-0,0-0-0,0.0.0.0,0/0',
             );
             */
})
