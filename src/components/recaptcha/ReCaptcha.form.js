import Components from '../Components';
import ReCaptchaEditDisplay from './editForm/ReCaptcha.edit.display';

export default function() {
  return Components.baseEditForm([
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
    },
  ]);
}
