import { expect } from 'chai';
import _ from 'lodash';
import utils from './utils';

describe('Edit Form Utils', function() {
  describe('unifyComponents', () => {
    it('should merge all objects with the same key', () => {
      const components = [
        { key: 'a', label: 1, input: true },
        { key: 'a', one: 1, two: 2 },
        { key: 'b', one: 1, two: 2 }
      ];

      expect(_.unionWith(components, utils.unifyComponents)).to.deep.equal([
        { key: 'a', label: 1, input: true, one: 1, two: 2 },
        { key: 'b', one: 1, two: 2 }
      ]);
    });

    it('should not merge objects with "skipMerge" flag', () => {
      const components = [
        { key: 'a', label: 1 },
        { key: 'a', label: 2, skipMerge: true },
        { key: 'b', one: 1, two: 2 },
        { key: 'b', one: 1 },
        { key: 'b', one: 1, ok: true }
      ];

      expect(_.unionWith(components, utils.unifyComponents)).to.deep.equal([
        { key: 'a', label: 1 },
        { key: 'a', label: 2, skipMerge: true },
        { key: 'b', one: 1, two: 2, ok: true },
      ]);
    });

    it('should override with "override" flag', () => {
      const components = [
        { key: 'a', label: 1, ok: true },
        { key: 'a', label: 2, overrideEditForm: true }
      ];

      expect(_.unionWith(components, utils.unifyComponents)).to.deep.equal([
        { key: 'a', label: 2, ok: true, overrideEditForm: true }
      ]);
    });
  });
});
