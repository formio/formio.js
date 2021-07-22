import assert from 'power-assert';
import Harness from '../../../test/harness';
import FileComponent from './File';
import { comp1 } from './fixtures';

describe('File Component', () => {
  it('Should create a File Component', () => {
    return Harness.testCreate(FileComponent, comp1).then((component) => {
      const parentNode = document.createElement('div');
      const element = document.createElement('div');
      parentNode.appendChild(element);
      component.build(element);
      Harness.testElements(component, 'ul.list-group-striped li.list-group-header', 1);
      Harness.testElements(component, 'ul.list-group-striped li.list-group-item', 1);
      Harness.testElements(component, 'a.browse', 1);
      assert(component.checkValidity(component.getValue()), 'Item should be valid');
      component.setValue([
        {
          storage: 'base64',
          name: 'IMG_5235-ce0abe18-5d3e-4ab4-84ca-b3e06684bc86.jpg',
          url: 'data:image/jpg;base64,AAAAIGZ0eXBoZWljAAAAAG1pZjF',
          size: 1159732,
          type: 'image/jpeg',
          originalName: 'IMG_5235.jpg',
        },
        {
          storage: 'base64',
          name: 'IMG_5235-ce0abe18-5d3e-4ab4-84ca-b3e06684bc86.png',
          url: 'data:image/jpg;base64,AAAAIGZ0eXBoZWljAAAAAG1pZjF',
          size: 34533,
          type: 'image/png',
          originalName: 'IMG_5235.png',
        }
      ]);
      Harness.testElements(component, 'ul.list-group-striped li.list-group-header', 1);
      Harness.testElements(component, 'ul.list-group-striped li.list-group-item', 3);
      Harness.testElements(component, 'a.browse', 0);
      assert(component.checkValidity(component.getValue()), 'Item should be valid');
    });
  });

  it('Should create a multiple File Component', () => {
    comp1.multiple = true;
    return Harness.testCreate(FileComponent, comp1).then((component) => {
      const parentNode = document.createElement('div');
      const element = document.createElement('div');
      parentNode.appendChild(element);
      component.build(element);
      Harness.testElements(component, 'ul.list-group-striped li.list-group-header', 1);
      Harness.testElements(component, 'ul.list-group-striped li.list-group-item', 1);
      Harness.testElements(component, 'a.browse', 1);
      assert(component.checkValidity(component.getValue()), 'Item should be valid');
      component.setValue([
        {
          storage: 'base64',
          name: 'IMG_5235-ce0abe18-5d3e-4ab4-84ca-b3e06684bc86.jpg',
          url: 'data:image/jpg;base64,AAAAIGZ0eXBoZWljAAAAAG1pZjF',
          size: 1159732,
          type: 'image/jpeg',
          originalName: 'IMG_5235.jpg',
        },
        {
          storage: 'base64',
          name: 'IMG_5235-ce0abe18-5d3e-4ab4-84ca-b3e06684bc86.png',
          url: 'data:image/jpg;base64,AAAAIGZ0eXBoZWljAAAAAG1pZjF',
          size: 34533,
          type: 'image/png',
          originalName: 'IMG_5235.png',
        }
      ]);
      Harness.testElements(component, 'ul.list-group-striped li.list-group-header', 1);
      Harness.testElements(component, 'ul.list-group-striped li.list-group-item', 3);
      Harness.testElements(component, 'a.browse', 1);
      assert(component.checkValidity(component.getValue()), 'Item should be valid');
    });
  });

  it('Should validate uploaded file according to the pattern', (done) => {
    Harness.testCreate(FileComponent, comp1).then((component) => {
      const validFiles =[
        {
          name: 'test.jpg',
          size: 27401,
          type: 'image/jpeg'
        },
        {
          name: 'TypeScript.pdf',
          size: 203123,
          type: 'application/pdf'
        },
        {
          name: 'build with dist.png',
          size: 137321,
          type: 'image/png'
        }
      ];

      const invalidFiles = [
        {
          name: 'eventsList.xlsx',
          size: 16022,
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        },
        {
          name: 'lazy load.mp4',
          size: 9083622,
          type: 'video/mp4'
        },
      ];

      const pattern = '  .jpg,     .png,    .exe,     .pdf ';

      const checkValidatePattern = (files, valid) => {
        files.forEach(file => {
          assert.equal(component.validatePattern(file, pattern), valid, `File ${file.name} should ${valid ? '' : 'not'} correspond to the pattern`);
        });
      };

      checkValidatePattern(validFiles, true);
      checkValidatePattern(invalidFiles, false);
      done();
    });
  });
});
