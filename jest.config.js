module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageReporters: ['html', 'text-summary'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 100,
      lines: 90,
      statements: 83,
    },
  },
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  verbose: true,
}
