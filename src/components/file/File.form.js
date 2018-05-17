import baseEditForm from '../_classes/base/Base.form';

import FileEditFile from './editForm/File.edit.file';

export default function(...extend) {
  return baseEditForm(...extend, [
    {
      label: 'File',
      key: 'file',
      weight: 5,
      components: FileEditFile
    }
  ]);
}
