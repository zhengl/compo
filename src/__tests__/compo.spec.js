jest.unmock('../compo');

const compo = require('../compo');
const browse = require('../browse');
const TAG = 'h1';

describe('compo', () => {
  const components = [
    {
      url: 'http://test-url1',
      html: `
        <head></head>
        <body>
          <${TAG}>Hello URL1</${TAG}>
        </body>
      `,
    },
    {
      url: 'http://test-url2',
      html: `
        <head></head>
        <body>
          <${TAG}>Hello URL2</${TAG}>
        </body>
      `,
    },
  ];
  const template = `
  <div>
    ${
      components
        .map(component =>
          `<div data-compo-url="${component.url}" data-compo-selector="${TAG}"></div>`)
        .join('')
    }
  </div>
  `;
  let isUrlsBrowsed;
  let result;

  beforeEach(() => {
    isUrlsBrowsed = components.map(() => false);

    components.forEach((component, index) => {
      browse
        .mockReturnValueOnce(new Promise((resolve) => {
          isUrlsBrowsed[index] = true;
          resolve(component.html);
        }));
    });


    result = compo(template);
  });

  it('should browse urls in data-compose-url attributs', () => {
    components.forEach((component) => {
      expect(browse).toBeCalledWith(component.url);
    });
  });

  it('should be thenable', done => {
    result
      .then(done)
      .catch(done.fail);
  });

  it('should resolve all calls to browse', done => {
    result
      .then(() => {
        isUrlsBrowsed.forEach((isUrlBrowsed) => expect(isUrlBrowsed).toBe(true));
      })
      .then(done)
      .catch(done.fail);
  });

  it('should resolve with page composition', done => {
    const expectedHtml = `
  <div>
    <h1>Hello URL1</h1><h1>Hello URL2</h1>
  </div>
  `;

    result
      .then(html => expect(html).toEqual(expectedHtml))
      .then(done)
      .catch(done.fail);
  });
});
