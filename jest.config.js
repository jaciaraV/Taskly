
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './', 
});

const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  testMatch: ['**/?(*.)+(test).[tj]sx'],

  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/coverage/',
    '<rootDir>/task-manager/', 
  ],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@components/(.*)$': '<rootDir>/components/$1',
  },

  collectCoverage: true,
  collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    'app/**/*.{ts,tsx}',
    'lib/**/*.{ts,tsx}',
    '!**/*.d.ts',
  ],
  coverageReporters: ['text', 'lcov'],
};

module.exports = createJestConfig(customJestConfig);

