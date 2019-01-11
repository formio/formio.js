import textAreaEditForm from '../textarea/TextArea.form';

export default function(...extend) {
  return textAreaEditForm([
    {
      key: 'display',
      components: [
        { key: 'rows', ignore: true },
        { key: 'multiple', ignore: true }
      ]
    }
  ], ...extend);
}
