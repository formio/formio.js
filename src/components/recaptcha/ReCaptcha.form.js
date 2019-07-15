import baseEditForm from '../_classes/component/Component.form';
import ReCaptchaEditDisplay from './editForm/ReCaptcha.edit.display';

export default function() {
  return baseEditForm([
    {
      key: 'display',
      components: ReCaptchaEditDisplay
    },
    {
      key: 'data',
      ignore: true
    },
    {
      key: 'validation',
      ignore: true
    },
    {
      key: 'conditional',
      ignore: true
    },
    {
      key: 'logic',
      ignore: true
    }
  ]);
}
