"use strict";

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Address = _interopRequireDefault(require("./Address"));

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _Formio = _interopRequireDefault(require("./../../Formio"));

var _lodash = _interopRequireDefault(require("lodash"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Address Component', function () {
  it('Should build an address component', function () {
    return _harness.default.testCreate(_Address.default, _fixtures.comp1);
  });
  it('Should set default value and clear it on "clear icon" click (openStreetMap provider)', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp2);

    var element = document.createElement('div');

    _Formio.default.createForm(element, form).then(function (form) {
      var address = form.getComponent('address');

      _powerAssert.default.equal(!!address.provider, true);

      _powerAssert.default.equal(address.refs.searchInput[0].value, 'Dallas County, Texas, United States');

      var clearIcon = address.refs.removeValueIcon[0];
      var clickEvent = new Event('click');
      clearIcon.dispatchEvent(clickEvent);
      setTimeout(function () {
        _powerAssert.default.equal(address.refs.searchInput[0].value, '');

        document.innerHTML = '';
        done();
      }, 300);
    }).catch(done);
  });
  it('Should disable "clear icon"', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp2);

    var element = document.createElement('div');
    form.components[0].disableClearIcon = true;

    _Formio.default.createForm(element, form).then(function (form) {
      var address = form.getComponent('address');

      _powerAssert.default.equal(!!address.provider, true);

      _powerAssert.default.equal(address.refs.removeValueIcon.length, 0);

      done();
    }).catch(done);
  });
  it('Test manual mode', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp2);

    var element = document.createElement('div');
    form.components[0].disableClearIcon = true;
    form.components[0].enableManualMode = true;
    form.components[0].switchToManualModeLabel = 'Check it to switch to manual mode';

    _Formio.default.createForm(element, form).then(function (form) {
      var address = form.getComponent('address');

      _powerAssert.default.equal(!!address.provider, true);

      _powerAssert.default.equal(address.mode, 'autocomplete');

      _powerAssert.default.equal(address.refs.modeSwitcher.checked, false, 'Manual mode should be turned off');

      _powerAssert.default.equal(address.refs.modeSwitcher.nextElementSibling.textContent, 'Check it to switch to manual mode', 'Should set custom label for manual mode checkbox');

      address.components.forEach(function (comp) {
        _powerAssert.default.equal(comp.visible, false, 'Manual mode components should be hidden');
      });
      address.refs.modeSwitcher.checked = true;
      var changeEvent = new Event('change');
      address.refs.modeSwitcher.dispatchEvent(changeEvent);
      setTimeout(function () {
        _powerAssert.default.equal(address.refs.modeSwitcher.checked, true, 'Manual mode should be turned on');

        _powerAssert.default.equal(address.mode, 'manual');

        var manualModeValue = {
          address1: 'test address1',
          address2: 'test address2',
          city: 'test city',
          country: 'test country',
          state: 'test state',
          zip: '1111111'
        };
        address.components.forEach(function (comp) {
          _powerAssert.default.equal(comp.visible, true, 'Manual mode components should be visible');

          var inputEvent = new Event('input');
          var input = comp.refs.input[0];
          input.value = manualModeValue["".concat(comp.component.key)];
          input.dispatchEvent(inputEvent);
        });
        setTimeout(function () {
          _powerAssert.default.deepEqual(address.dataValue, {
            address: manualModeValue,
            mode: 'manual'
          }, 'Should set manual mode value');

          document.innerHTML = '';
          done();
        }, 300);
      }, 300);
    }).catch(done);
  });
  it('Should close modal window without showing dialog if value not changed', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp3);

    var element = document.createElement('div');

    _Formio.default.createForm(element, form).then(function (form) {
      var value = {
        'address_components': [{
          'long_name': 'Los Angeles',
          'short_name': 'Los Angeles',
          types: ['locality', 'political']
        }, {
          'long_name': 'Los Angeles County',
          'short_name': 'Los Angeles County',
          types: ['administrative_area_level_2', 'political']
        }, {
          'long_name': 'California',
          'short_name': 'CA',
          types: ['administrative_area_level_1', 'political']
        }, {
          'long_name': 'United States',
          'short_name': 'US',
          types: ['country', 'political']
        }],
        'formatted_address': 'Los Angeles, CA, USA',
        geometry: {
          location: {
            lat: 34.0522342,
            lng: -118.2436849
          },
          viewport: {
            south: 33.70365193147634,
            west: -118.6681759484859,
            north: 34.33730608759191,
            east: -118.155289077463
          }
        },
        'place_id': 'ChIJE9on3F3HwoAR9AhGJW_fL-I',
        types: ['locality', 'political'],
        formattedPlace: 'Los Angeles, CA, USA'
      };
      var address = form.getComponent('address');
      var openModalButton = address.componentModal.refs.openModal;
      var clickEvent = new Event('click');
      openModalButton.dispatchEvent(clickEvent);
      setTimeout(function () {
        _powerAssert.default.equal(address.componentModal.isOpened, true);

        address.dataValue = value;
        address.componentModal.closeModal();
        address.redraw();
        setTimeout(function () {
          address.componentModal.isOpened = true;
          openModalButton.dispatchEvent(clickEvent);
          setTimeout(function () {
            _powerAssert.default.equal(address.componentModal.isOpened, true);

            _powerAssert.default.equal(!!address.dataValue, true);

            var modalOverlayButton = address.componentModal.refs.modalOverlay;
            modalOverlayButton.dispatchEvent(clickEvent);
            setTimeout(function () {
              _powerAssert.default.equal(!!address.componentModal.isValueChanged(), false);

              _powerAssert.default.equal(!!address.componentModal.dialogElement, false);

              done();
            }, 200);
          }, 200);
        }, 200);
      }, 200);
    }).catch(done);
  });
});