const path = require('node:path');
const nextJest = require('next/jest');
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

/*
 * Create preconfigured config object with `next/jest` which automatically configures:
 * - Setting up transform using SWC
 * - Auto mocking stylesheets (.css, .module.css, and their scss variants), image imports and next/font
 * - Loading .env (and all variants) into process.env
 * - Ignoring node_modules from test resolving and transforms
 * - Ignoring .next from test resolving
 * - Loading next.config.js for flags that enable SWC transforms
 *
 * See https://nextjs.org/docs/pages/building-your-application/optimizing/testing
 */
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './'
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  /*
   * General configuration
   */
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: ['tsx', 'ts', 'jsx', 'js'],
  testRegex: '.*\\.test\\.tsx?$',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  cacheDirectory: '<rootDir>/node_modules/.cache/jest',

  /*
   * TypeScript configuration
   */
  modulePaths: [path.join('<rootDir>', compilerOptions.baseUrl)], // path aliases configuration
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },  // path aliases configuration

  /*
   * Coverage configuration
   */
  collectCoverageFrom: ['src/**/*.{tsx,ts}'],
  coverageDirectory: 'coverage'
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
