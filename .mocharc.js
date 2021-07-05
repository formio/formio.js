process.env.TZ = 'UTC';

module.exports = {
  bail: true,
  timeout: 20000,
  require: [
    '@babel/register',
    'jsdom-global/register'
  ]
};
