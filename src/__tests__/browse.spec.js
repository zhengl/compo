jest.unmock('../browse');

const http = require('http');
const browse = require('../browse');
const url = 'http://localhost';
const html = '<head></head><body><h1>Hello World</h1></body>';
const port = 3000;
let fakeServer;

describe('browse', () => {
  beforeEach(() => {
    fakeServer = http.createServer((req, res) => {
      res.end(html);
    });
    fakeServer.listen(port);
  });

  afterEach(() => {
    fakeServer.close();
  });

  it('should be thenable', done => {
    browse(url)
      .then(done)
      .catch(done.fail);
  });

  it('should resolve html returned by url', done => {
    browse(url)
      .then(returned => expect(returned).toBe(html))
      .then(done)
      .catch(done.fail);
  });
});
