module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true,
                "jest": true
            },
            "files": [
                ".eslintrc.{js,cjs}",
                "**/*.test.js",
                "**/*.test.jsx"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "requireConfigFile": false
    },
    "plugins": [
        "react"
    ],
    "rules": {
    },
    "parser": "@babel/eslint-parser",
    "parserOptions": {
        "sourceType": "module",
        "allowImportExportEverywhere": true,
    }
}
