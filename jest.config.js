module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageReporters: ['html', 'text-summary'],
  coverageThreshold: {
    global: {
      branches: 71,
      functions: 100,
      lines: 76,
      statements: 73,
    },
  },
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  verbose: true,
}
