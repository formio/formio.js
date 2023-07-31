import assert from 'power-assert';
import Harness from '../../../test/harness';
import FileComponent from './File';
import { comp1, comp2 } from './fixtures';
import Formio from './../../Formio';
import _ from 'lodash';

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

  it('Should hide loader after loading process', () => {
    return Harness.testCreate(FileComponent, comp1).then((component) => {
      const parentNode = document.createElement('div');
      const element = document.createElement('div');
      parentNode.appendChild(element);
      component.build(element);
      Harness.testElements(component, 'div.loader-wrapper', 1);
      component.setValue([
        {
          storage: 'base64',
          name: 'IMG_5235-ce0abe18-5d3e-4ab4-84ca-b3e06684bc86.jpg',
          url: 'data:image/jpg;base64,AAAAIGZ0eXBoZWljAAAAAG1pZjF',
          size: 1159732,
          type: 'image/jpeg',
          originalName: 'IMG_5235.jpg',
        }
      ]);
      Harness.testElements(component, 'div.loader-wrapper', 0);
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

  it('Should display uploaded file in file component only after saving', (done) => {
    const form = _.cloneDeep(comp2);
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const value = [
        {
          storage: 'base64',
          name: '33-0ae897b9-c808-4832-a5e1-4e5d0c725f1b.jpg',
          url: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD…CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//2Q==',
          size: 102691,
          type: 'image/jpeg',
          originalName: '33.jpg',
        },
      ];
      const file = form.getComponent('file');
      const openModalButton = file.componentModal.refs.openModal;
      const clickEvent = new Event('click');
      openModalButton.dispatchEvent(clickEvent);

      setTimeout(() => {
        assert.equal(file.componentModal.isOpened, true);
        file.dataValue = value;
        file.redraw();

        setTimeout(() => {
          assert.equal(file.refs.fileLink.length, 1);
          const modalOverlayButton = file.componentModal.refs.modalOverlay;
          modalOverlayButton.dispatchEvent(clickEvent);

          setTimeout(() => {
            assert.equal(!!file.componentModal.dialogElement, true);
            const dialogYesButton = file.componentModal.dialogElement.refs.dialogYesButton;
            dialogYesButton.dispatchEvent(clickEvent);

            setTimeout(() => {
              assert.equal(!!file.componentModal.dialogElement, false);
              file.componentModal.closeModal();

              setTimeout(() => {
                assert.equal(file.componentModal.isOpened, false);
                assert.equal(file.refs.fileLink.length, 0);
                assert.equal(file.componentModal.refs.openModal.textContent.trim(), 'Click to set value');
                done();
              }, 200);
            }, 200);
          }, 200);
        }, 200);
      }, 200);
    }).catch(done);
  });

  it('Should abort the correct file when user clicks the file remove button', (done) => {
    const cmp =  _.cloneDeep(comp1);
    const abortedFiles = [];
    cmp.multiple = true;
    cmp.storage = 'url';

    const options = {
      fileService: {
        uploadFile: function(storage, file, fileName, dir, progressCallback, url, options, fileKey, groupPermissions, groupId, uploadStartCallback, abortCallbackSetter) {
          return new Promise((resolve) => {
            // complete upload after 1s.
            const timeout = setTimeout(function() {
              progressCallback({ loaded: 1, total: 1 });
              const uploadResponse = {
                name: fileName,
                size: file.size,
                type: 'application/pdf',
                url: `fake/url/${fileName}`
              };
              resolve(uploadResponse);
            }, 1000);

            abortCallbackSetter(function() {
              abortedFiles.push(file.name);
              clearTimeout(timeout);
            });
          });
        }
      }
    };

    Harness.testCreate(FileComponent, cmp, options).then((component) => {
      component.root = { everyComponent: () => {}, options: options, form: { submissionRevisions: false, components: [cmp] } };
      const parentNode = document.createElement('div');
      const element = document.createElement('div');
      parentNode.appendChild(element);
      component.build(element);

      const content = [1];
      const files = [new File(content, 'file.0'), new File([content], 'file.1'), new File([content], 'file.2')];

      component.upload(files);

      setTimeout(function() {
        Harness.testElements(component, 'div.file .fileName', 3);

        component.element.querySelectorAll('i[ref="fileStatusRemove"]')[1].click();

        setTimeout(() => {
          assert(component !== null);
          assert(abortedFiles[0] === 'file.1' && abortedFiles.length === 1);
          assert(component.filesUploading.join(',') === 'file.0,file.2');

          Harness.testElements(component, 'div.file .fileName', 2);
          component.root = null;
          done();
        }, 20);
      }, 50);
    });
  });
});
