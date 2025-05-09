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
    "plugins": ["jsdoc" , "security", "no-unsanitized"],
    "rules": {
      "no-prototype-builtins": "off",
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      // CSP-focused security rules:
      "security/detect-eval-with-expression": "warn",
      "security/detect-unsafe-regex": "warn",
      // Prevent unsanitized DOM injection
      "no-unsanitized/method": "warn",
      "no-unsanitized/property": "warn"
    }
}
