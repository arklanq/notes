const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');
const path = require('node:path');

/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  /*
   * General configuration
   */
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'], // order matters
  testRegex: '.*\\.test\\.ts$',
  testMatch: null, // Must be set to null, see https://kulshekhar.github.io/ts-jest/docs/getting-started/presets
  roots: ['<rootDir>/src', '<rootDir>/test'], // can be explicitly overriden by CLI option
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  cacheDirectory: '<rootDir>/node_modules/.cache/jest',

  /*
   * TypeScript configuration
   */
  preset: 'ts-jest',
  modulePaths: [path.join('<rootDir>', compilerOptions.baseUrl)], // path aliases configuration
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },  // path aliases configuration

  /*
   * Coverage configuration
   */
  collectCoverage: false, // can be explicitly overriden by CLI option
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: 'coverage'
};

module.exports = config;
