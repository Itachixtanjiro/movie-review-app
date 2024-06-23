// jest.config.js
module.exports = {
    transform: {
      '^.+\\.[t|j]sx?$': 'babel-jest', // Use babel-jest to transpile tests with Babel
    },
    testEnvironment: 'jest-environment-jsdom', // Use jsdom to simulate a DOM environment for tests that manipulate the DOM
  };
  