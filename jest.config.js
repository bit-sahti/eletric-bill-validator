const config = {
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  testMatch: ['**/__tests__/**/**test**'],
  coverageDirectory: './coverage',
  reporters: ['default'],
  testEnvironment: 'node',
  resetMocks: true
}

module.exports = config
