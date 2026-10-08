import { validateEnv } from './env.validation.js';

describe('validateEnv', () => {
  it('converts PORT from a string to a number', () => {
    const env = validateEnv({ PORT: '4000', NODE_ENV: 'production' });

    expect(env.PORT).toBe(4000);
    expect(env.NODE_ENV).toBe('production');
  });

  it('applies defaults when variables are missing', () => {
    const env = validateEnv({});

    expect(env.PORT).toBe(3000);
    expect(env.NODE_ENV).toBe('development');
  });

  it('accepts the test environment', () => {
    const env = validateEnv({ NODE_ENV: 'test' });

    expect(env.NODE_ENV).toBe('test');
  });

  it('rejects a PORT that is not a number', () => {
    expect(() => validateEnv({ PORT: 'abc' })).toThrow(/PORT/);
  });

  it('rejects a PORT outside 1-65535', () => {
    expect(() => validateEnv({ PORT: '70000' })).toThrow(/PORT/);
    expect(() => validateEnv({ PORT: '0' })).toThrow(/PORT/);
  });

  it('rejects an unknown NODE_ENV', () => {
    expect(() => validateEnv({ NODE_ENV: 'staging' })).toThrow(/NODE_ENV/);
  });
});
