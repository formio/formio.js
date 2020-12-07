"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.object.assign");

require("core-js/modules/web.dom-collections.for-each");

var _chai = require("chai");

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _EditTable = _interopRequireDefault(require("./EditTable"));

var _Webform = _interopRequireDefault(require("../../Webform"));

var _index = require("./fixtures/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = _harness.default.testCreate;
describe('EditTable Component', function () {
  it('should create component', function (done) {
    create(_EditTable.default, _index.basic).then(function () {
      return done();
    }, done);
  });
  it('should add row groups to form metadata', function (done) {
    var domRoot = document.createElement('div');
    var form = new _Webform.default(domRoot);
    form.setForm({
      title: 'Simple Form',
      components: [{
        type: 'edittable',
        key: 'questions',
        rowGroups: [{
          label: 'A',
          numberOfRows: 1
        }, {
          label: 'B',
          numberOfRows: 1
        }, {
          label: 'Header',
          numberOfRows: 4
        }],
        input: true
      }]
    }).then(function () {
      (0, _chai.expect)(form._submission.metadata['questions']).to.deep.equal({
        A: 1,
        B: 1,
        Header: 4
      });
      done();
    }, done).catch(done);
  });
  describe('hasColumns', function () {
    it('should false if there no columns', function (done) {
      create(_EditTable.default, _index.basic).then(function (edittable) {
        (0, _chai.expect)(edittable.hasColumns()).to.be.false;
        done();
      }, done).catch(done);
    });
    it('should true if there columns', function (done) {
      var schema = Object.assign({}, _index.basic, {
        columns: [{
          key: 'name',
          label: 'Name'
        }]
      });
      create(_EditTable.default, schema).then(function (edittable) {
        (0, _chai.expect)(edittable.hasColumns()).to.be.true;
        done();
      }, done).catch(done);
    });
  });
  describe('componentSchema', function () {
    it('should return valid schema', function (done) {
      create(_EditTable.default, _index.basic).then(function (edittable) {
        var schema = edittable.componentSchema();
        (0, _chai.expect)(schema).to.have.property('key');
        (0, _chai.expect)(schema).to.have.property('type');
        (0, _chai.expect)(schema).to.have.property('label');
        (0, _chai.expect)(schema).to.have.property('input');
        done();
      }, done).catch(done);
    });
    it('should return Modal Edit schema', function (done) {
      create(_EditTable.default, _index.basic).then(function (edittable) {
        var schema = edittable.componentSchema();
        (0, _chai.expect)(schema).to.have.property('key', 'modalEdit');
        (0, _chai.expect)(schema).to.have.property('type', 'modaledit');
        (0, _chai.expect)(schema).to.have.property('label', 'Modal Edit');
        (0, _chai.expect)(schema).to.have.property('input', true);
        done();
      }, done).catch(done);
    });
  });
  describe('getColumns', function () {
    it('should return empty array if no columns', function (done) {
      create(_EditTable.default, _index.basic).then(function (edittable) {
        (0, _chai.expect)(edittable.getColumns()).to.be.empty;
        done();
      }, done).catch(done);
    });
    it('should return array of columns', function (done) {
      var columns = [{
        key: 'name',
        label: 'Name'
      }, {
        key: 'age',
        label: 'Age'
      }];
      var schema = Object.assign({}, _index.basic, {
        columns: [].concat(columns)
      });
      create(_EditTable.default, schema).then(function (edittable) {
        (0, _chai.expect)(edittable.getColumns()).to.deep.equal(columns);
        done();
      }, done).catch(done);
    });
    it('should return non-empty columns', function (done) {
      var columns = [{
        key: '',
        label: ''
      }, {
        key: 'name',
        label: 'Name'
      }, {
        key: '',
        label: ''
      }, {
        key: 'age',
        label: 'Age'
      }, {
        key: '',
        label: ''
      }];
      var schema = Object.assign({}, _index.basic, {
        columns: [].concat(columns)
      });
      create(_EditTable.default, schema).then(function (edittable) {
        (0, _chai.expect)(edittable.getColumns()).to.deep.equal([{
          key: 'name',
          label: 'Name'
        }, {
          key: 'age',
          label: 'Age'
        }]);
        done();
      }, done).catch(done);
    });
  });
  describe('getGroups', function () {
    it('should return empty array if no row groups', function (done) {
      create(_EditTable.default, _index.basic).then(function (edittable) {
        (0, _chai.expect)(edittable.getGroups()).to.be.an('array').empty;
        done();
      }, done).catch(done);
    });
    it('should return row groups', function (done) {
      var groups = [{
        label: 'A',
        numberOfRows: 1
      }, {
        label: 'B',
        numberOfRows: 1
      }];
      var schema = Object.assign({}, _index.basic, {
        rowGroups: [].concat(groups)
      });
      create(_EditTable.default, schema).then(function (edittable) {
        (0, _chai.expect)(edittable.getGroups()).to.deep.equal(groups);
        done();
      }, done).catch(done);
    });
  });
  describe('totalRowsNumber', function () {
    it('should return the total count of rows in the provided groups', function () {
      var groups = [{
        label: 'A',
        numberOfRows: 1
      }, {
        label: 'B',
        numberOfRows: 2
      }, {
        label: 'C',
        numberOfRows: 4
      }, {
        label: 'D',
        numberOfRows: 9
      }];
      var totalRowsNumber = _EditTable.default.prototype.totalRowsNumber;
      (0, _chai.expect)(totalRowsNumber(groups)).to.equal(16);
      (0, _chai.expect)(totalRowsNumber(groups.slice(1))).to.equal(15);
      (0, _chai.expect)(totalRowsNumber(groups.slice(2))).to.equal(13);
      (0, _chai.expect)(totalRowsNumber(groups.slice(3))).to.equal(9);
      (0, _chai.expect)(totalRowsNumber(groups.slice(0, 2))).to.equal(3);
    });
  });
  describe('addEmptyRows', function () {
    it('should create an array of n empty rows and set it to dataValue', function (done) {
      create(_EditTable.default, _index.basic).then(function (edittable) {
        edittable.addEmptyRows(1);
        (0, _chai.expect)(edittable.dataValue).to.deep.equal([{}]);
        edittable.addEmptyRows(2);
        (0, _chai.expect)(edittable.dataValue).to.deep.equal([{}, {}]);
        edittable.addEmptyRows(2);
        (0, _chai.expect)(edittable.dataValue).to.deep.equal([{}, {}]);
        edittable.addEmptyRows(3);
        (0, _chai.expect)(edittable.dataValue).to.deep.equal([{}, {}, {}]);
        done();
      }, done).catch(done);
    });
  });
  describe('get emptyColumn', function () {
    it('should return object that represents empty column', function (done) {
      create(_EditTable.default, _index.basic).then(function (edittable) {
        (0, _chai.expect)(edittable.emptyColumn).to.deep.equal({
          label: '',
          key: ''
        });
        done();
      }, done).catch(done);
    });
  });
  describe('get tableClass', function () {
    it('should return table class string', function (done) {
      create(_EditTable.default, _index.basic).then(function (edittable) {
        (0, _chai.expect)(edittable.tableClass).to.equal('table table-bordered table-edittable form-group formio-edittable-table');
        done();
      }, done).catch(done);
    });
  });
  describe('getRowChunks', function () {
    it('should return rows split by chunks according to group size', function () {
      var getRowChunks = _EditTable.default.prototype.getRowChunks;
      var chunks = getRowChunks([2, 2], [0, 0, 0, 0]);
      (0, _chai.expect)(chunks[0]).to.be.an('array').lengthOf(2);
      (0, _chai.expect)(chunks[1]).to.be.an('array').lengthOf(2);
      chunks = getRowChunks([1, 3], [1, 2, 3, 4]);
      (0, _chai.expect)(chunks[0]).to.deep.equal([1]);
      (0, _chai.expect)(chunks[1]).to.deep.equal([2, 3, 4]);
      chunks = getRowChunks([2, 2, 5, 1], [1, 2, 3, 4, 5, 6, 7]);
      (0, _chai.expect)(chunks[0]).to.deep.equal([1, 2]);
      (0, _chai.expect)(chunks[1]).to.deep.equal([3, 4]);
      (0, _chai.expect)(chunks[2]).to.deep.equal([5, 6, 7]);
      (0, _chai.expect)(chunks[3]).to.deep.equal([]);
      chunks = getRowChunks([0, 0, 0, 0], [1, 2, 3, 4, 5, 6, 7]);
      (0, _chai.expect)(chunks[0]).to.deep.equal([]);
      (0, _chai.expect)(chunks[1]).to.deep.equal([]);
      (0, _chai.expect)(chunks[2]).to.deep.equal([]);
      (0, _chai.expect)(chunks[3]).to.deep.equal([]);
      chunks = getRowChunks([0, 0, 2, 2], [1, 2, 3, 4, 5, 6, 7]);
      (0, _chai.expect)(chunks[0]).to.deep.equal([]);
      (0, _chai.expect)(chunks[1]).to.deep.equal([]);
      (0, _chai.expect)(chunks[2]).to.deep.equal([1, 2]);
      (0, _chai.expect)(chunks[3]).to.deep.equal([3, 4]);
    });
  });
  describe('componentComponents', function () {
    it('should return array of component scehmas', function (done) {
      var schema = Object.assign({}, _index.basic, {
        columns: [{
          key: 'name',
          label: 'Name'
        }, {
          key: 'age',
          label: 'Age'
        }]
      });
      create(_EditTable.default, schema).then(function (edittable) {
        var comps = edittable.componentComponents;
        comps.forEach(function (c) {
          (0, _chai.expect)(c).to.have.property('type');
          (0, _chai.expect)(c).to.have.property('input');
          (0, _chai.expect)(c).to.have.property('key');
          (0, _chai.expect)(c).to.have.property('label');
        });
        (0, _chai.expect)(comps[0].label).to.equal('Name');
        (0, _chai.expect)(comps[0].key).to.equal('name');
        (0, _chai.expect)(comps[1].label).to.equal('Age');
        (0, _chai.expect)(comps[1].key).to.equal('age');
        done();
      }, done).catch(done);
    });
  });
  describe('build', function () {
    it('in builder, whit no columns, should build placeholder', function (done) {
      create(_EditTable.default, _index.basic, {
        builder: true
      }).then(function (edittable) {
        (0, _chai.expect)(edittable.element.querySelector('.edittable-placeholder')).to.not.be.null;
        done();
      }, done).catch(done);
    });
    it('should build table', function (done) {
      create(_EditTable.default, _index.basic).then(function (edittable) {
        (0, _chai.expect)(edittable.element.querySelector('table')).to.not.be.null;
        (0, _chai.expect)(edittable.element.querySelector('table > tbody')).to.not.be.null;
        (0, _chai.expect)(edittable.element.querySelectorAll('table > tbody > tr')).to.have.lengthOf(1);
        done();
      }, done).catch(done);
    });
    it('should build without add button, if ther no columns', function (done) {
      create(_EditTable.default, _index.basic).then(function (edittable) {
        (0, _chai.expect)(edittable.element.querySelector('.btn btn-primary formio-button-add-row')).to.be.null;
        done();
      }, done).catch(done);
    });
  });
  describe('getMeta', function () {
    it('should return null if no row groups', function (done) {
      create(_EditTable.default, _index.basic).then(function (edittable) {
        (0, _chai.expect)(edittable.getMeta()).to.be.null;
        done();
      }, done).catch(done);
    });
    it('should return meta data when row groups present', function (done) {
      var groups = [{
        label: 'A',
        numberOfRows: 1
      }, {
        label: 'B',
        numberOfRows: 1
      }, {
        label: 'Header',
        numberOfRows: 4
      }];
      var schema = Object.assign({}, _index.basic, {
        rowGroups: [].concat(groups)
      });
      create(_EditTable.default, schema).then(function (edittable) {
        (0, _chai.expect)(edittable.getMeta()).to.deep.equal({
          A: 1,
          B: 1,
          Header: 4
        });
        done();
      }, done).catch(done);
    });
  });
  describe('setMeta', function () {
    it('should save row groups data to submission metadata', function (done) {
      var groups = [{
        label: 'A',
        numberOfRows: 1
      }, {
        label: 'B',
        numberOfRows: 1
      }, {
        label: 'Header',
        numberOfRows: 4
      }];
      var schema = Object.assign({}, _index.basic, {
        rowGroups: [].concat(groups)
      });
      create(_EditTable.default, schema).then(function (edittable) {
        var metadata = edittable.getMeta();
        edittable.setMeta();
        (0, _chai.expect)(edittable.root._submission.metadata[schema.key]).to.deep.equal(metadata);
        done();
      }, done).catch(done);
    });
  });
});