const $ = require('cheerio');
const browse = require('./browse');
const DATA_ATTRIBUTE_URL_KEY = 'data-compo-url';
const DATA_ATTRIBUTE_SELECTOR_KEY = 'data-compo-selector';

function browseAndSelect() {
  const $this = $(this);
  const url = $this.attr(DATA_ATTRIBUTE_URL_KEY);
  const selector = $this.attr(DATA_ATTRIBUTE_SELECTOR_KEY);
  return browse(url).then(html => ({
    $element: $this,
    fragment: $(selector, html).toString(),
  }));
}

function compo(template) {
  const $template = $.load(template);
  const blocks = $template(`[${DATA_ATTRIBUTE_URL_KEY}]`);
  const promises = blocks
    .map(browseAndSelect)
    .toArray();

  return Promise
    .all(promises)
    .then(components => {
      components.forEach(({ $element, fragment }) => {
        $template($element).replaceWith(fragment);
      });
      return $template.html();
    });
}

module.exports = compo;
