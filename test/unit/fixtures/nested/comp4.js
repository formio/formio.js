import comp from '../checkbox/comp2';

export default {
  components: [{ ...comp }, { ...comp, value: 'false' }],
};
