import Components from '../Components';
import FileEditData from './editForm/File.edit.data';
import FileEditDisplay from './editForm/File.edit.display';
import FileEditFile from './editForm/File.edit.file';
import FileEditValidation from './editForm/File.edit.validation';

export default function(...extend) {
  return Components.baseEditForm([
    {
      key: 'display',
      components: FileEditDisplay
    },
    {
      key: 'data',
      components: FileEditData
    },
    {
      label: 'File',
      key: 'file',
      weight: 5,
      components: FileEditFile
    },
    {
      key: 'validation',
      components: FileEditValidation
    },
  ], ...extend);
}
