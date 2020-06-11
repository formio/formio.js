import baseEditForm from '../_classes/component/Component.form';
import ReCaptchaEditDisplay from './editForm/ReCaptcha.edit.display';
export default (...extend) => baseEditForm([
    {
        key: 'display',
        components: ReCaptchaEditDisplay,
    },
    {
        key: 'data',
        ignore: true,
    },
    {
        key: 'logic',
        ignore: true,
    },
], ...extend);
