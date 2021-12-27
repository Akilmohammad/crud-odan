import app from '../../src/app';

describe('\'crud\' service', () => {
  it('registered the service', () => {
    const service = app.service('crud');
    expect(service).toBeTruthy();
  });
});
