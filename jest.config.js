module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/controllers/*.ts',
    'src/services/*.ts',
    'src/repositories/*.ts',
    '!src/**/*.d.ts',
  ],
};