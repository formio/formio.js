import baseEditForm from '../_classes/component/Component.form';
import SurveyEditData from './editForm/Survey.edit.data';
import SurveyEditDisplay from './editForm/Survey.edit.display';
export default (...extend) => baseEditForm([
    {
        key: 'display',
        components: SurveyEditDisplay,
    },
    {
        key: 'data',
        components: SurveyEditData,
    },
], ...extend);
