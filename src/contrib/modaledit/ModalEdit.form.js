import modalEditDisplayForm from './editForm/ModalEdit.edit.display';
import textAreaEditForm from '../../components/textarea/TextArea.form';

export default function(...extend) {
  return textAreaEditForm([
    {
      key: 'display',
      components: [
        { key: 'rows', ignore: true },
        { key: 'multiple', ignore: true },
        ...modalEditDisplayForm,
      ]
    }
  ], ...extend);
}
