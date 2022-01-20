// https://eslint.org/docs/user-guide/configuring/configuration-files
// https://dev.to/robertcoopercode/using-eslint-and-prettier-in-a-typescript-project-53jb

module.exports = {
    extends: [
        // "eslint:recommended", // A bit too strict atm (doesn't like module.exports)
        "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
        "plugin:@typescript-eslint/recommended", // Uses the recommended rules from @typescript-eslint/eslint-plugin
        // 'eslint-config-prettier' v8.0+ handles all; other 'prettier/*' plugins deprecated
        "plugin:prettier/recommended", // Enables 'eslint-plugin-prettier'; mods Prettier errors to ESLint errors
    ],
    parser: "@typescript-eslint/parser", // Specifies the ESLint parser
    parserOptions: { project: ["./tsconfig.json"] },
    plugins: ["@typescript-eslint"],
    // parserOptions: {
    //     ecmaVersion: 2018, // Parsing of modern ECMAScript features
    //     sourceType: "module", // Enables the use of imports
    //     ecmaFeatures: {
    //         jsx: true, // Enables JSX parsing
    //     },
    // },
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    },
    settings: {
        react: {
            version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
};
