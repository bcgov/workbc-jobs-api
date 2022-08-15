const prettierConfig = require("./.prettierrc")

module.exports = {
    extends: ["elmsd/js"],
    parserOptions: { ecmaVersion: 2020 },
    rules: {
        "no-underscore-dangle": "off",
        "prettier/prettier": ["error", prettierConfig]
    },
    ignorePatterns: ["**/dist/**/*.js"]
}
