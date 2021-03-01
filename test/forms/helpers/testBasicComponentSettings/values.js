import _ from 'lodash';
import settings from './settings';
import { fastCloneDeep } from '../../../../src/utils/utils';
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

export default { values, multipleValues };