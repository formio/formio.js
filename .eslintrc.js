module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": ["eslint:recommended", "plugin:jsdoc/recommended-typescript-flavor"],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": ["jsdoc"],
    "rules": {
      "no-prototype-builtins": "off",
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    }
}
