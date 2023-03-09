module.exports = {
    preset: '@vue/cli-plugin-unit-jest/presets/default',
    transform: {
      '^.+\\.vue$': 'vue-jest',
      '^.+\\.js$': 'babel-jest',
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
    testMatch: [
      '**/__tests__/**/*.spec.[jt]s?(x)',
      '**/?(*.)+(spec|test).[jt]s?(x)',
    ],
    testEnvironmentOptions: {
      customExportConditions: ["node", "node-addons"],
   },
    moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
};