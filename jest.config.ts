import type {Config} from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
  '^.+\\.tsx?$': 'ts-jest',
  },
  moduleDirectories: ['node_modules', 'src'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/']
};
export default config;
