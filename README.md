# Web Template

This is a personal template to start a new front-end project.

A server  can be started with `npm start`.
The project can be deployed with `npm run deploy` but first needs SSH configuration
and path adjustments, see deploy folder.


## Image Lazy Loading

Use native image lazy loading.
Only for images that are not above the fold.

```HTML
<img
	src="image.jpg"
	srcset="image-480.jpg 480w, image-960.jpg 960w, image-1200 1200w"
	sizes="(max-width: 480px) 100vw, 960px"
	alt="Alt"
	width="1200"
	height="675"
	loading="lazy"
	decoding="async"
	style="background-image: url('preview.jpg'); background-size: cover;"
/>
```

The priority of the LCP image can be boosted with attribute `fetchpriority="high"`.


## Web Font Loading

See `index.html`, `css/styles/settings-fonts.css` and `css/styles/settings-variables.css` for embedding.


## Links

* [W3C Validator (X)HTML](http://validator.w3.org/ "W3C Validator")
* [W3C Validator CSS](http://jigsaw.w3.org/css-validator/ "CSS Validator")
* [Can I Use](http://caniuse.com/ "Can I Use")
* [HTML5Please](http://html5please.com/ "HTML5Please")
* [MDN](https://developer.mozilla.org/de/ "Mozilla Developer Network")
