'use strict';

/* eslint-env mocha */

var expect = require('chai').expect;
var writtenNumber = require('written-number');
var utils = require('./index');
var components = require('./fixtures/components.json');
var submission1 = require('./fixtures/submission1.json');

describe('eachComponent', function () {
  it('should iterate through nested components in the right order', function () {
    var n = 1;
    utils.eachComponent(components, function (component) {
      expect(component.order).to.equal(n);
      n += 1;
    });
  });

  it('should include layouts components if provided', function () {
    var numComps = 0;
    var numLayout = 0;
    utils.eachComponent(components, function (component) {
      if (utils.isLayoutComponent(component)) {
        numLayout++;
      } else {
        numComps++;
      }
    }, true);
    expect(numLayout).to.be.equal(3);
    expect(numComps).to.be.equal(8);
  });

  it('Should provide the paths to all of the components', function () {
    var paths = ['one', 'parent1', 'two', 'parent2', 'three', '', 'four', 'five', 'six', 'seven', 'eight'];
    var testPaths = [];
    utils.eachComponent(components, function (component, path) {
      testPaths.push(path);
    }, true);
    expect(paths).to.deep.equal(testPaths);
  });

  it('Should be able to find all textfield components', function () {
    var comps = utils.findComponents(components, { type: 'textfield' });
    expect(comps.length).to.equal(6);
  });

  it('Should be able to find components with special properties.', function () {
    var components3 = require('./fixtures/components3.json');
    var comps = utils.findComponents(components3, { 'properties.path': 'a' });
    expect(comps.length).to.equal(4);
    expect(comps[0].key).to.equal('b');
    expect(comps[1].key).to.equal('e');
    expect(comps[2].key).to.equal('j');
    expect(comps[3].key).to.equal('m');
  });

  it('Should be able to generate paths based on component types', function () {
    var components = require('./fixtures/components2.json');
    var paths = ['a', 'b', 'c', 'd', 'f', 'f.g', 'f.h', 'f.i', 'e', 'j', 'k', 'k.n', 'k.n.o', 'k.n.p', 'k.n.q', 'k.m', 'k.l', 'r', 'submit'];
    var testPaths = [];
    utils.eachComponent(components, function (component, path) {
      testPaths.push(path);
    }, true);
    expect(paths).to.deep.equal(testPaths);
  });

  it('Should still provide the correct paths when it is not recursive', function () {
    var paths = ['a', 'd', 'f', 'f.g', 'f.h', 'f.i', 'e', 'j', 'k', 'k.n', 'k.n.o', 'k.n.p', 'k.n.q', 'k.m', 'k.l', 'r', 'submit'];
    var testPaths = [];
    utils.eachComponent(require('./fixtures/components2.json'), function (component, path) {
      testPaths.push(path);
    });
    expect(paths).to.deep.equal(testPaths);
  });

  it('should be able to block recursion', function () {
    var numComps = 0;
    var numLayout = 0;
    utils.eachComponent(components, function (component) {
      if (utils.isLayoutComponent(component)) {
        numLayout++;
      } else {
        numComps++;
      }

      if (component.type === 'table') {
        var numInTable = 0;
        [].concat.apply([], component.rows).forEach(function (row) {
          utils.eachComponent(row.components, function () {
            numInTable++;
          });
        });
        expect(numInTable).to.be.equal(4);
        return true;
      }
    }, true);
    expect(numLayout).to.be.equal(3);
    expect(numComps).to.be.equal(4);
  });
});

describe('getComponent', function () {
  it('should return the correct components', function () {
    for (var n = 1; n <= 8; n += 1) {
      var component = utils.getComponent(components, writtenNumber(n));
      expect(component).not.to.be.null;
      expect(component).not.to.be.undefined;
      expect(component).to.be.an('object');
      expect(component.order).to.equal(n);
      expect(component.key).to.equal(writtenNumber(n));
    }
  });

  it('should work with a different this context', function () {
    for (var n = 1; n <= 8; n += 1) {
      var component = utils.getComponent.call({}, components, writtenNumber(n));
      expect(component).not.to.be.null;
      expect(component).not.to.be.undefined;
      expect(component).to.be.an('object');
      expect(component.order).to.equal(n);
      expect(component.key).to.equal(writtenNumber(n));
    }
  });
});

describe('flattenComponents', function () {
  it('should return an object of flattened components', function () {
    var flattened = utils.flattenComponents(components);
    for (var n = 1; n <= 8; n += 1) {
      var component = flattened[writtenNumber(n)];
      expect(component).not.to.be.undefined;
      expect(component).to.be.an('object');
      expect(component.order).to.equal(n);
      expect(component.key).to.equal(writtenNumber(n));
    }
  });

  it('should work with a different this context', function () {
    var flattened = utils.flattenComponents.call({}, components);
    for (var n = 1; n <= 8; n += 1) {
      var component = flattened[writtenNumber(n)];
      expect(component).not.to.be.undefined;
      expect(component).to.be.an('object');
      expect(component.order).to.equal(n);
      expect(component.key).to.equal(writtenNumber(n));
    }
  });
});

describe('getValue', function () {
  it('should be able to get a simple value', function () {
    expect(utils.getValue(submission1, 'name')).to.be.equal(submission1.data.name);
  });

  it('should be able to get a value from a container', function () {
    expect(utils.getValue(submission1, 'animalname')).to.be.equal(submission1.data.mycontainer.animalname);
  });
});

describe('parseFloat', function () {
  it('should clear input and parse value', function () {
    expect(utils.parseFloat('12,345,678.90')).to.be.equal(12345678.90);
  });
});

describe('formatAsCurrency', function () {
  it('should be able to format Float value for Currency component', function () {
    expect(utils.formatAsCurrency(123.4)).to.be.equal('123.40');
    expect(utils.formatAsCurrency(12345678.9)).to.be.equal('12,345,678.90');
    expect(utils.formatAsCurrency(12345678.915)).to.be.equal('12,345,678.92');
  });

  it('should be able to format String value for Currency component', function () {
    expect(utils.formatAsCurrency('12345678.915')).to.be.equal('12,345,678.92');
  });
});