const should = require('chai').should();
const expect = require('chai').expect;
const filters = require('../eleventy-config/filters');

describe('filters.js', function () {
  describe('getKeys()', function () {
    it('should return an array of length 3', function  () {
      filters.getKeys({ a: 1, b: 2, c: 3}).should.be.a('array').with.lengthOf(3);
    });

    it('should return an empty array', function () {
      filters.getKeys(123).should.be.a('array').with.lengthOf(0);
    });
  });

  describe('isString()', function () {
    it('should return true', function  () {
      filters.isString('hello').should.equal(true);
    });

    it('should return false', function  () {
      filters.isString(['hello']).should.equal(false);
    });
  });

  describe('md()', function () {
    it('should return a string "<h1 id=\"this-is-a-title\">This is a title</h1>" with a newline at the end', function  () {
      filters.md('# This is a title').should.equal("<h1 id=\"this-is-a-title\">This is a title</h1>\n");
    });

    it('should return an array [ 1, 2, 3 ]', function () {
      filters.md([ 1, 2, 3 ]).should.be.a('array').have.ordered.members([ 1, 2 , 3]);
    });
  });

  describe('htmlDateString', function () {
    it('should return a string in format "January 1, 2022"', function () {
      filters.htmlDateString(new Date()).should.be.a('string').match(/^[A-Z]{1}[a-z]+\s[0-9]{1,2},\s[0-9]{4}/);
    });
  });

  describe('machineTime', function () {
    it('should return a string in format "2022-01-20"', function () {
      filters.machineTime(new Date()).should.be.a('string').match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/);
    });
  });

  describe('RSSTimeFormat', function () {
    it('should return a string in format "2011-10-05T14:48:00.000Z"', function () {
      filters.RSSTimeFormat(new Date()).should.be.a('string').match(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/);
    });
  });

  describe('machineTimeISO', function () {
    it('should return a string in format "2011-10-05T14:48:00.000Z"', function () {
      filters.machineTimeISO(new Date()).should.be.a('string').match(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/);
    });
  });
});
