# compo
A library for page composition pattern in microservice architecture

## Usage
compo accepts a html string(template) and resolves with composite content from endpoints specified by data attributs

```js
compo(template)
//=> Promise
```

### template
```html
<div>
  <div data-compo-url="http://test-url1" data-compo-selector="h1"></div>
  <div data-compo-url="http://test-url2" data-compo-selector="h1"></div>
</div>
```

### Endpoint 1
```html
<h1>Hello URL1</h1>
```

### Endpoint 2
```html
<h1>Hello URL2</h1>
```

### Result
```html
<div>
  <h1>Hello URL1</h1>
  <h1>Hello URL2</h1>
</div>
```
