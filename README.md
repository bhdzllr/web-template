# Web Template #

This is a personal template to start a new front-end project and also for learning purpose.
The "src" folder holds some examples, the "dist" folder can be used as starting point.

To convert SASS use: `sass --watch scss/main.scss:css/style.css` to watch for
changes and convert automatically.


## Folder Structure ##

```
.
├─ dist
│  ├── css
│  │   ├── style.css (SASS build)
│  │   └── style.css.map (SASS build)
│  ├── fonts
│  ├── img
│  ├── js
│  │   ├── vendor
│  │   │   ├── jquery.min.js
│  │   │   └── plugins.min.js
│  │   └── main.js
│  ├── .htaccess
│  ├── favicon.ico
│  └── index.html
└─ src
   ├── css (CSS files)
   │   ├── vendor (Vendor CSS files, optional)
   │   ├── style.css (SASS build)
   │   └── style.css.map (SASS build)
   ├── fonts (Font files)
   ├── img (Images for layout)
   │   ├── icons (Icons for the website, not app icons, optional)
   │   └── mobile (Resources for mobile devices, optional)
   │       ├── icon (App icons, optional)
   │       └── splash (Splash screens, optional)
   ├── js (JavaScript files)
   │   ├── vendor (Vendor JS, e.g. jQuery, Modernizr, ...)
   │   │   ├── jquery.min.js
   │   │   └── plugins.min.js
   │   └── main.js
   ├── scss
   │   ├── components (CSS components, reusable, theme through mixins from core theme)
   │   ├── core (Core files)
   │   ├── modules (CSS Modules, composition of objects and components)
   │   ├── objects (CSS Objects, reusable, just layout, no theme)
   │   ├── pages (Custom style for pages)
   │   ├── utilities (Helping classes)
   │   └── vendor (Vendor CSS)
   ├── .htaccess
   ├── favicon.ico (32 x 32)
   ├── index.html
   └── standalone.html
```

## Appendix ##

### Links ###

* [W3C Validator (X)HTML](http://validator.w3.org/ "W3C Validator")
* [W3C Validator CSS](http://jigsaw.w3.org/css-validator/ "CSS Validator")
* [Can I Use](http://caniuse.com/ "Can I Use")
* [HTML5Please](http://html5please.com/ "HTML5Please")
* [MDN](https://developer.mozilla.org/de/ "Mozilla Developer Network")
