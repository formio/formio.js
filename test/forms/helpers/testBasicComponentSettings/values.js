import _ from 'lodash';
import settings from './settings';
import { fastCloneDeep } from '../../../../src/utils';
import basicValues from './basicValues'

const values = basicValues;

const findMultipleValues = (valuesObj) => {
  const componentsWithMultipleValueSetting = {};
  _.each(valuesObj, (compPropertyValue, compKey) => {
    if(settings['multiple'][compKey]) {
      componentsWithMultipleValueSetting[compKey] = fastCloneDeep(compPropertyValue);
    }
  });
  return componentsWithMultipleValueSetting;
};

const multipleValues = _.mapValues(findMultipleValues(values), (value, compKey) => {
  if (compKey === 'select') {
    return ['a','b']
  }

  if (compKey === 'file') {
    const fileValue = fastCloneDeep(value);

    fileValue.push({
      name: "after-5c3e3b6b-c8b0-43c1-8cc5-cb4ede1e51cf.jpg",
      originalName: "after.jpg",
      size: 28473,
      storage: "base64",
      type: "image/jpeg",
      url: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAkACQAAD",
    });

    return fileValue;
  }

  return [fastCloneDeep(value), fastCloneDeep(value)];
});

const stringValues = {
  form: '[Complex Data]',
  textField: 'test value',
  textArea: 'test value',
  number: '280',
  password: 'sOm_paSword123',
  checkbox: 'Yes',
  selectBoxes: 'a, c',
  select: '<span>A</span>',
  radio: 'b',
  email: 'user@example.com',
  url: 'https://portal.form.io',
  phoneNumber: '(555) 555-5555',
  tags: 'tag1',
  address: 'Dallas County, Texas, United States',
  dateTime: '2021-02-03 12:00 PM',
  day: '01/05/2005',
  time: '04:15',
  currency: '$30,000.00',
  survey: 'Question 1: yes; Question 2: no',
  numberColumn: '1111',
  textFieldColumn: 'value',
  numberFieldset: '222222',
  numberPanel: '66666',
  selectTable: '<span>one</span>',
  checkboxTable: 'Yes',
  dateTimeTable: '2031-02-03 05:00 AM',
  currencyTable: '$4,000.00',
  numberTab: '123456',
  textFieldTab: 'value',
  textFieldWell: 'value',
  hidden: 'hidden value',
  container: '[Complex Data]',
  dataMap: '[Complex Data]',
  dataGrid: '[Complex Data]',
  editGrid: '[Complex Data]',
  tree: '[Complex Data]',
  file: 'test file.docx',
  submit: 'true',
};

const submission =  {
  form: {
    data: {
    dataGridChild: [
      { textAreaInsideChildDataGrid: "test value in nested form1" },
      { textAreaInsideChildDataGrid: "test value in nested form2" }
    ],
    numberInsideChildPanel: 111111,
    textFieldChild: "test value in nested form",
    timeChild: "11:55:00",
    },
  },
  textField: 'test value',
  textArea: 'test value',
  number: 280,
  password: 'sOm_paSword123',
  checkbox: true,
  selectBoxes: { a: true, b: false, c: true },
  select: 'a',
  radio: 'b',
  email: 'user@example.com',
  url: 'https://portal.form.io',
  phoneNumber: '(555) 555-5555',
  tags: 'tag1',
  address: {
    address: { county: 'Dallas County', state: 'Texas', country: 'United States', country_code: 'us' },
    boundingbox: ['32.5453486', '32.9899027', '-97.0383833', '-96.5168819'],
    class: 'boundary',
    display_name: 'Dallas County, Texas, United States',
    icon: 'https://nominatim.openstreetmap.org/ui/mapicons//poi_boundary_administrative.p.20.png',
    importance: 0.6662149661993487,
    lat: '32.7620405',
    licence: 'Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright',
    lon: '-96.7790069',
    osm_id: 1837698,
    osm_type: 'relation',
    place_id: 256774876,
    type: 'administrative',
  },
  dateTime: '2021-02-03T12:00:00',
  day: '01/05/2005',
  time: '04:15:00',
  currency: 30000,
  survey: {
    question1: 'yes',
    question2: 'no'
  },
  signature: 'data:image/png;base64,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',
  numberColumn: 1111,
  textFieldColumn: 'value',
  numberFieldset: 222222,
  numberPanel: 66666 ,
  selectTable:'one',
  checkboxTable: true,
  dateTimeTable: '2031-02-03T05:00:00',
  currencyTable: 4000,
  numberTab: 123456,
  textFieldTab: 'value',
  textFieldWell: 'value',
  hidden: 'hidden value',
  container: { textFieldContainer: 'value1' },
  dataMap: { key: 'value1', key1: 'value2' },
  dataGrid: [
    { textFieldDataGrid: 'value1' },
    { textFieldDataGrid: 'value2' }
  ],
  editGrid: [{ textFieldEditGrid: 'value1' }, { textFieldEditGrid: 'value2' }],
  tree: {
    children: [{ children: [], data: {textFieldTree: 'value2'} }],
    data: { textFieldTree: 'value1' }
  },
  file: [{
    name: 'test file-15c248a4-401f-4456-aff9-abcbdf0f7bfa.docx',
    originalName: 'test file.docx',
    size: 11396,
    storage: 'base64',
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    url: 'data:application/vnd.openxmlformats-officedocument',
  }],
  submit: true,
};

export default { values, multipleValues, stringValues, submission };
