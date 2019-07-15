import { expect } from 'chai';
import Harness from '../../../test/harness';
import EditTable from './EditTable';
import Webform from '../../Webform';
import { basic } from './fixtures/index';

const { testCreate: create } = Harness;

describe('EditTable Component', () => {
  it('should create component', done => {
    create(EditTable, basic).then(() => done(), done);
  });

  it('should add row groups to form metadata', done => {
    const domRoot = document.createElement('div');
    const form = new Webform(domRoot);
    form
      .setForm({
        title: 'Simple Form',
        components: [{
          type: 'edittable',
          key:  'questions',
          rowGroups: [
            {
              label: 'A',
              numberOfRows: 1
            },
            {
              label: 'B',
              numberOfRows: 1
            },
            {
              label: 'Header',
              numberOfRows: 4
            }
          ],
          input: true
        }]
      })
      .then(() => {
        expect(form._submission.metadata['questions']).to.deep.equal({
          A: 1,
          B: 1,
          Header: 4
        });
        done();
      }, done)
      .catch(done);
  });

  describe('hasColumns', () => {
    it('should false if there no columns', done => {
      create(EditTable, basic).then(edittable => {
        expect(edittable.hasColumns()).to.be.false;
        done();
      }, done).catch(done);
    });

    it('should true if there columns', done => {
      const schema = Object.assign({}, basic, {
        columns: [{ key: 'name', label: 'Name' }]
      });

      create(EditTable, schema).then(edittable => {
        expect(edittable.hasColumns()).to.be.true;
        done();
      }, done).catch(done);
    });
  });

  describe('componentSchema', () => {
    it('should return valid schema', done => {
      create(EditTable, basic).then(edittable => {
        const schema = edittable.componentSchema();
        expect(schema).to.have.property('key');
        expect(schema).to.have.property('type');
        expect(schema).to.have.property('label');
        expect(schema).to.have.property('input');
        done();
      }, done).catch(done);
    });

    it('should return Modal Edit schema', done => {
      create(EditTable, basic).then(edittable => {
        const schema = edittable.componentSchema();
        expect(schema).to.have.property('key', 'modalEdit');
        expect(schema).to.have.property('type', 'modaledit');
        expect(schema).to.have.property('label', 'Modal Edit');
        expect(schema).to.have.property('input', true);
        done();
      }, done).catch(done);
    });
  });

  describe('getColumns', () => {
    it('should return empty array if no columns', done => {
      create(EditTable, basic).then(edittable => {
        expect(edittable.getColumns()).to.be.empty;
        done();
      }, done).catch(done);
    });
    it('should return array of columns', done => {
      const columns = [
        { key: 'name', label: 'Name' },
        { key: 'age', label: 'Age' }
      ];

      const schema = Object.assign({}, basic, {
        columns: [...columns],
      });

      create(EditTable, schema).then(edittable => {
        expect(edittable.getColumns()).to.deep.equal(columns);
        done();
      }, done).catch(done);
    });
    it('should return non-empty columns', done => {
      const columns = [
        { key: '', label: '' },
        { key: 'name', label: 'Name' },
        { key: '', label: '' },
        { key: 'age', label: 'Age' },
        { key: '', label: '' },
      ];

      const schema = Object.assign({}, basic, {
        columns: [...columns],
      });

      create(EditTable, schema).then(edittable => {
        expect(edittable.getColumns()).to.deep.equal([
          { key: 'name', label: 'Name' },
          { key: 'age', label: 'Age' }
        ]);
        done();
      }, done).catch(done);
    });
  });

  describe('getGroups', () => {
    it('should return empty array if no row groups', done => {
      create(EditTable, basic).then(edittable => {
        expect(edittable.getGroups()).to.be.an('array').empty;
        done();
      }, done).catch(done);
    });

    it('should return row groups', done => {
      const groups = [
        {
          label: 'A',
          numberOfRows: 1
        },
        {
          label: 'B',
          numberOfRows: 1
        }
      ];

      const schema = Object.assign({}, basic, {
        rowGroups: [...groups]
      });

      create(EditTable, schema).then(edittable => {
        expect(edittable.getGroups()).to.deep.equal(groups);
        done();
      }, done).catch(done);
    });
  });

  describe('totalRowsNumber', () => {
    it('should return the total count of rows in the provided groups', () => {
      const groups = [
        {
          label: 'A',
          numberOfRows: 1
        },
        {
          label: 'B',
          numberOfRows: 2
        },
        {
          label: 'C',
          numberOfRows: 4
        },
        {
          label: 'D',
          numberOfRows: 9
        }
      ];

      const { totalRowsNumber } = EditTable.prototype;

      expect(totalRowsNumber(groups)).to.equal(16);
      expect(totalRowsNumber(groups.slice(1))).to.equal(15);
      expect(totalRowsNumber(groups.slice(2))).to.equal(13);
      expect(totalRowsNumber(groups.slice(3))).to.equal(9);
      expect(totalRowsNumber(groups.slice(0, 2))).to.equal(3);
    });
  });

  describe('addEmptyRows', () => {
    it('should create an array of n empty rows and set it to dataValue', done => {
      create(EditTable, basic).then(edittable => {
        edittable.addEmptyRows(1);
        expect(edittable.dataValue).to.deep.equal([{}]);
        edittable.addEmptyRows(2);
        expect(edittable.dataValue).to.deep.equal([{}, {}]);
        edittable.addEmptyRows(2);
        expect(edittable.dataValue).to.deep.equal([{}, {}]);
        edittable.addEmptyRows(3);
        expect(edittable.dataValue).to.deep.equal([{}, {}, {}]);
        done();
      }, done).catch(done);
    });
  });

  describe('get emptyColumn', () => {
    it('should return object that represents empty column', done => {
      create(EditTable, basic).then(edittable => {
        expect(edittable.emptyColumn).to.deep.equal({ label: '', key: '' });
        done();
      }, done).catch(done);
    });
  });

  describe('get tableClass', () => {
    it('should return table class string', done => {
      create(EditTable, basic).then(edittable => {
        expect(edittable.tableClass).to.equal(
          'table table-bordered table-edittable form-group formio-edittable-table'
        );
        done();
      }, done).catch(done);
    });
  });

  describe('getRowChunks', () => {
    it('should return rows split by chunks according to group size', () => {
      const { getRowChunks } = EditTable.prototype;
      let chunks = getRowChunks([2, 2], [0, 0, 0, 0]);
      expect(chunks[0]).to.be.an('array').lengthOf(2);
      expect(chunks[1]).to.be.an('array').lengthOf(2);

      chunks = getRowChunks([1, 3], [1, 2, 3, 4]);
      expect(chunks[0]).to.deep.equal([1]);
      expect(chunks[1]).to.deep.equal([2, 3, 4]);

      chunks = getRowChunks([2, 2, 5, 1], [1, 2, 3, 4, 5, 6, 7]);
      expect(chunks[0]).to.deep.equal([1, 2]);
      expect(chunks[1]).to.deep.equal([3, 4]);
      expect(chunks[2]).to.deep.equal([5, 6, 7]);
      expect(chunks[3]).to.deep.equal([]);

      chunks = getRowChunks([0, 0, 0, 0], [1, 2, 3, 4, 5, 6, 7]);
      expect(chunks[0]).to.deep.equal([]);
      expect(chunks[1]).to.deep.equal([]);
      expect(chunks[2]).to.deep.equal([]);
      expect(chunks[3]).to.deep.equal([]);

      chunks = getRowChunks([0, 0, 2, 2], [1, 2, 3, 4, 5, 6, 7]);
      expect(chunks[0]).to.deep.equal([]);
      expect(chunks[1]).to.deep.equal([]);
      expect(chunks[2]).to.deep.equal([1, 2]);
      expect(chunks[3]).to.deep.equal([3, 4]);
    });
  });

  describe('componentComponents', () => {
    it('should return array of component scehmas', done => {
      const schema = Object.assign({}, basic, {
        columns: [
          { key: 'name', label: 'Name' },
          { key: 'age', label: 'Age' }
        ],
      });

      create(EditTable, schema).then(edittable => {
        const comps = edittable.componentComponents;

        comps.forEach(c => {
          expect(c).to.have.property('type');
          expect(c).to.have.property('input');
          expect(c).to.have.property('key');
          expect(c).to.have.property('label');
        });

        expect(comps[0].label).to.equal('Name');
        expect(comps[0].key).to.equal('name');
        expect(comps[1].label).to.equal('Age');
        expect(comps[1].key).to.equal('age');

        done();
      }, done).catch(done);
    });
  });

  describe('build', () => {
    it('in builder, whit no columns, should build placeholder', done => {
      create(EditTable, basic, { builder: true }).then(edittable => {
        expect(edittable.element.querySelector('.edittable-placeholder')).to.not.be.null;
        done();
      }, done).catch(done);
    });

    it('should build table', done => {
      create(EditTable, basic).then(edittable => {
        expect(edittable.element.querySelector('table')).to.not.be.null;
        expect(edittable.element.querySelector('table > tbody')).to.not.be.null;
        expect(edittable.element.querySelectorAll('table > tbody > tr')).to.have.lengthOf(1);
        done();
      }, done).catch(done);
    });

    it('should build without add button, if ther no columns', done => {
      create(EditTable, basic).then(edittable => {
        expect(edittable.element.querySelector('.btn btn-primary formio-button-add-row')).to.be.null;
        done();
      }, done).catch(done);
    });
  });

  describe('getMeta', () => {
    it('should return null if no row groups', done => {
      create(EditTable, basic).then(edittable => {
        expect(edittable.getMeta()).to.be.null;
        done();
      }, done).catch(done);
    });

    it('should return meta data when row groups present', done => {
      const groups = [
        {
          label: 'A',
          numberOfRows: 1
        },
        {
          label: 'B',
          numberOfRows: 1
        },
        {
          label: 'Header',
          numberOfRows: 4
        }
      ];

      const schema = Object.assign({}, basic, {
        rowGroups: [...groups]
      });

      create(EditTable, schema).then(edittable => {
        expect(edittable.getMeta()).to.deep.equal({ A: 1, B: 1, Header: 4 });
        done();
      }, done).catch(done);
    });
  });

  describe('setMeta', () => {
    it('should save row groups data to submission metadata', done => {
      const groups = [
        {
          label: 'A',
          numberOfRows: 1
        },
        {
          label: 'B',
          numberOfRows: 1
        },
        {
          label: 'Header',
          numberOfRows: 4
        }
      ];

      const schema = Object.assign({}, basic, {
        rowGroups: [...groups]
      });

      create(EditTable, schema).then(edittable => {
        const metadata = edittable.getMeta();
        edittable.setMeta();
        expect(edittable.root._submission.metadata[schema.key]).to.deep.equal(metadata);
        done();
      }, done).catch(done);
    });
  });
});
