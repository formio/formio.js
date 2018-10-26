module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          ie: '11',
        },
        useBuiltIns: 'usage',
      },
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-optional-chaining',
  ],
};
