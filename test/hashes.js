const should = require('chai').should();
const expect = require('chai').expect;
const { shiftTo,  cropPath, readdirToBuffers } = require('../tasks/hashes.js');

describe('hashes.js', function () {
  describe('shiftTo()', function () {
    it('should return an array [ 2, 3 ]', function () {
      shiftTo([ 1, 2, 3 ], 2).should.be.a('array').with.lengthOf(2).have.ordered.members([ 2, 3 ]);
    });

    it('should throw Error', function () {
    	expect(() => shiftTo([ 1, 2, 3 ], 'string')).to.throw();
    });
  });

  describe('cropPath()', function () {
  	it('should return /assets/javascript/main.js', function () {
  		cropPath('/root/public/assets/javascript/main.js', 'assets').should.equal('/assets/javascript/main.js')
  	});

  	it('should throw TypeError', function () {
  		expect(() => cropPath(1234, 'assets')).to.throw();
  	});

  	it('should throw Error', function () {
  		expect(() => cropPath('/root/public/assets/javascript/main.js', 123)).to.throw();
  	});
  });

  describe('readdirToBuffers()', function () {
  	it('should return an array of 9 objects with contents of type Buffer', function () {
  		const array = readdirToBuffers('./src/javascript');
  		array.should.be.a('array').with.lengthOf(9);
  		expect(array.every(item => Buffer.isBuffer(item.contents) === true)).to.equal(true);
  	});

  	it('should throw a TypeError', function () {
  		expect(() => readdirToBuffers({ a: 1, b: 2})).to.throw();
  	});

  	it('should throw a TypeError', function () {
  		expect(() => readdirToBuffers(123)).to.throw();
  	});
  });
});
