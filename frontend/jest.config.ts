export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // Ensure this is set to 'jsdom'
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
};
