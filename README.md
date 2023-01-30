# Web Template #

This is a personal template to start a new front-end project and also for learning purpose.

A development version (without a server) that watches changes can be started
with `npm start`. To build the project into the "dist" folder run `npm run build`.
The project can be deployed with `npm run deploy` but first needs SSH configuration
and path adjustments, see deploy folder.


## Image Lazy Loading ##

```HTML
<img class="js-lazy-image" src="optional-placeholder.jpg" data-src="full-image.jpg" alt="Alt" />
<noscript>
	<img src="full-image.jpg" alt="Alt" />
</noscript>
```

```JavaScript
import { lazyLoadImages } from from './lib/utils/loading-images';

lazyLoadImages();
````


## Web Font Loading ##

```CSS
/** See `index.html`, `css/styles/settings-fonts.css` and `css/styles/settings-variables.css` for embedding. */
```


## Links ##

* [W3C Validator (X)HTML](http://validator.w3.org/ "W3C Validator")
* [W3C Validator CSS](http://jigsaw.w3.org/css-validator/ "CSS Validator")
* [Can I Use](http://caniuse.com/ "Can I Use")
* [HTML5Please](http://html5please.com/ "HTML5Please")
* [MDN](https://developer.mozilla.org/de/ "Mozilla Developer Network")
