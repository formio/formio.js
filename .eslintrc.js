module.exports = {
    "env": {
        "browser": true,
        "es2020": true,
        "node": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/adjacent-overload-signatures": "off",
      "@typescript-eslint/no-this-alias": "off",
      "@typescript-eslint/no-empty-function": "off",
      "max-len": [
        "off",
        {
          "code": 160,
          "ignoreComments": true,
          "ignoreStrings": true
        }
      ],
      "max-statements": [2, 40],
      "max-depth": [2, 10],
      "no-console": "off",
      "no-setter-return": "off",
      "no-prototype-builtins": "off",
      "prefer-const": "error",
      "prefer-template": "error",
      "object-curly-spacing": [
        "error",
        "always"
      ]
    }
};
