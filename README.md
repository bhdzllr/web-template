# Web Template #

This is a personal template to start a new front-end project and also for learning purpose.

A development version (without a server) that watches changes can be started
with `npm start`. To build the project into the "dist" folder run `npm run build`.
The project can be deployed with `npm run deploy` but first needs SSH configuration
in "gulpfile.js".


## Image Lazy Loading ##

```HTML
<img class="js-lazy-image" src="optional-placeholder.jpg" data-src="full-image.jpg" alt="Alt" />
<noscript>
	<img src="full-image.jpg" alt="Alt" />
</noscript>
```

```JavaScript
import { lazyLoadImages } from from './lib/utils';

lazyLoadImages();
````


## Web Font Loading ##

```CSS
/** See `_fonts.scss` and `_variables.scss` for embedding. Also `lib/core/_base.scss` for loading strategy with classes. */
```

```JavaScript
import { loadFonts } from from './lib/utils';

loadFonts([
	{ 'Web Font': { weight: 400, style: 'normal' } },
	{ 'Web Font': { weight: 700, style: 'normal' } },
]);
````


## Links ##

* [W3C Validator (X)HTML](http://validator.w3.org/ "W3C Validator")
* [W3C Validator CSS](http://jigsaw.w3.org/css-validator/ "CSS Validator")
* [Can I Use](http://caniuse.com/ "Can I Use")
* [HTML5Please](http://html5please.com/ "HTML5Please")
* [MDN](https://developer.mozilla.org/de/ "Mozilla Developer Network")
