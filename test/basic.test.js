var expect = require('expect');
var AnonymizeIp = require('../anonymizeIp.js');
var ipUtils = require('../ipUtils.js');
var FlowAnonymize = require('../flowAnonymize.js');

var anonymizeIp = new AnonymizeIp();
var flowAnonymize = new FlowAnonymize();


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
  it('This IP Is in Rang', function() {
    arr = []
    arr.push(ipUtils.cidrv4ToRange("192.168.0.1/24"));
    arr.push(ipUtils.cidrv4ToRange("10.139.40.0/24"));

    expect(ipUtils.isInRangv4("10.139.40.123", arr )).toEqual(true);
  })
  it('This IP is not in Rang?', function() {
    arr = []
    arr.push(ipUtils.cidrv4ToRange("192.168.0.1/24"));
    arr.push(ipUtils.cidrv4ToRange("10.139.40.0/24"));

    expect(ipUtils.isInRangv4("10.138.40.123", arr )).toEqual(false);
  })
  it('Get AnonymizeIp', function(){
    expect(anonymizeIp.anonymize("192.168.0.1")).toEqual("10.125.122.128");
  })
  it('Get AnonymizeIp In Guifi', function(){
    expect(anonymizeIp.anonymize("109.69.15.5")).toEqual("10.152.161.110");
  })

  it('Check IP in guifi Range', function(){
    expect(flowAnonymize.lineAnonymize('2016-04-03 21:04:58,2016-04-03 21:04:58,0.000,84.88.72.48,109.69.15.5,80,41401,TCP,' +
               '.A....,0,0,4,4905,0,0,20,64,0,0,0,0,0,0,0.0.0.0,0.0.0.0,0,0,00:00:00:00:00:00,' +
               '00:00:00:00:00:00,00:00:00:00:00:00,00:00:00:00:00:00,0-0-0,0-0-0,0-0-0,0-0-0,0-0-0,0-0-0,0-0-0,0-0-0,0-0-0,0-0-0,0.0.0.0,0/0'))
               .toEqual(
               '2016-04-03 21:04:58,2016-04-03 21:04:58,0.000,10.152.76.235,10.152.161.110,80,41401,TCP,' +
               '.A....,0,0,4,4905,0,0,20,64,0,0,0,0,0,0,10.158.54.37,10.158.54.37,0,0,00:00:00:00:00:00,' +
               '00:00:00:00:00:00,00:00:00:00:00:00,00:00:00:00:00:00,0-0-0,0-0-0,0-0-0,0-0-0,0-0-0,0-0-0,0-0-0,0-0-0,0-0-0,0-0-0,10.158.54.37,0/0'
             );
  })
})
