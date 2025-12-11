module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: { jsx: true }
    },
    env: {
        browser: true,
        es2022: true,
        node: true
    },
    plugins: ["@typescript-eslint", "react", "react-hooks", "prettier"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:prettier/recommended",
        "prettier"
    ],
    settings: {
        react: { version: "detect" }
    },
    rules: {
        "prettier/prettier": "error",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "warn",
        "react/prop-types": "off"
    },
    ignorePatterns: ["dist", "node_modules"]
};
