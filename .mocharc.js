process.env.TZ = 'UTC';

module.exports = {
  bail: true,
  timeout: 20000,
  exit: true,
  require: [
    '@babel/register',
    'mock-local-storage',
    'jsdom-global/register'
  ]
};
