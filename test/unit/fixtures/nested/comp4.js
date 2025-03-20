import comp from './comp2';

export default {
    components: [
        { ...comp },
        { ...comp, value: 'false' }
    ]
};
