export default [
  {
    key: 'inputFormat',
    ignore: true
  },
  {
    key: 'persistent',
    ignore: true
  },
  {
    key: 'protected',
    ignore: true
  },
  {
    key: 'dbIndex',
    ignore: true
  },
  {
    key: 'encrypted',
    ignore: true
  },
  {
    key: 'multiple',
    ignore: true
  },
  {
    key: 'defaultValue',
    ignore: true
  },
  {
    key: 'customDefaultValuePanel',
    ignore: true
  },
  {
    key: 'calculateValuePanel',
    ignore: true
  },
  {
    key: 'passwordInfo',
    weight: 0,
    type: 'htmlelement',
    tag: 'div',
    className: 'alert alert-info',
    content: 'Password fields are automatically encrypted using 1-way salted bcrypt hashes. These hashes are also protected and not returned in the API.'
  }
];
