# Changelog #

## Version 4.0.0 ##

* Add new build pipeline
* Build and bundling with webpack
* Build ES6 with Babel
* Build CSS with SASS and PostCSS
* Remove inline scripts
* Add JS utilities
* Update basic styling inside "lib" folder
* Add browserconfig.xml
* Add service worker example
* Add image lazy loading example
* Add font loading example
* Add JS module "LocalStorage"
* Add JS module "VisibilityObserver"
* Add JS module "Form"
* Add JS module "DialogModal"
* Add CSS "stack"
* Remove Browse Happy banner
* Drop IE 11 support and full JS support for legacy browsers,
  use No-JS fallback instead.


## Version 3.1.1 ##

* Remove folder structure from README


## Version 3.1.0 ##

* Add SCSS file for local fonts
* Remove placeholder for lining web fonts
* Update font usage
* Add HTTPS rewrite rule as example
* Add PNG favicon
* Add code for select styling
* Drop IE 10 support
* Drop author meta tag, nobody uses it
* Drop jQuery
* Update Font Face Observer
* Update analytics
* Remove .htaccess
* Add Grid and update SCSS


## Version 3.0.0 ##

* Drop lte IE 8 support
* Update to jQuery 3
* Use double-colon CSS3 syntax for pseudo-elements.
* Remove IE 6 - 7 "zoom" for "hasLayout"
* Remove Piwik code
* Add SCSS "table" component
* Refactor SCSS
* Add SCSS file for animations


## Version 2.1.0 ##

* Remove duplicated FOUC hook
* Minimal Normalize and SCSS update
* Fix wrong loop for creating HTML5 elements
* Structural changes in SASS files
* Remove deprecated CSS clip property
* SASS note in README, add "module" folder
* JS syntax changes
* Remove outline on input fields and textarea


## Version 2.0.0 ##

* Move to SASS/SCSS


## Version 1.2.0 ##

* HTML Update
* JS syntax changes. Remove responsive fallback in JS, use media query instead
* Update styles
* Update to jQuery 1.12.4
* Remove font comment from CSS, use fonts via `<link>` instead
* Fix print style `<link>`
* Browse Happy layout changes
* Add "standalone.html"
* Update "package.json"
* Add webkit appearance normalize and form input types
* Add Bram Stein's Font Face Observer
* Move `<abbr>` styling to from "Minimal Normalize" to "Base"


## Version 1.1.0 ##

* Add `<mark>` example
* Update jQuery from 1.11.3 to 1.12.3
* Add media object
* Use `p` as wrapping element for form input as recommended in HTML5 specification
* Remove some meta tags
* Outline changes
* Remove year from footer
* Add "media" attribute for IE conditional comments
* Replace spaces with tabs in "style.css"
* Fix jQuery no conflict in "main.js"
* README update
* Add designer meta tag
* Remove duplicate comment in "style.css"
* Change name in "package.json"
* Remove "keywords" meta tag, useless nowadays, like "revisit-after"
* Refactor "style.css"
* Add link rel for shortcut icon only in src
* Syntax changes in "gulpfile.js"


## Version 1.0.0 ##

* Distribute files into "dist" directory with Gulp
* Add empty favicon


## Version 0.0.5 ##

* Add JavaScript example
* Prepare for "dist" folder


## Version 0.0.4 ##

* Remove "fonts.css", place fonts in "style.css"
* Remove "print.css" and place code in "style.css" withing media query
* Add fallback print CSS for IE <= 8
* Add "screen-reader-text"-class


## Version 0.0.3 ##

* Prevent FOUC, add class `no-js`. Do not use Modernizr
* Add "createHTML5Elements.js"
* Add conditional comment for IE (CSS fix), not in `<html>` element,
  because "X-UA-Compatible" is among
* Rename "plugins.js" to "plugins.min.js" because minified version 
  should be used
* Add basic CSS


## Version 0.0.2 ##

* HTML Markup examples
* Meta changes in `<head>`
* Add "print.css"
* Add Piwik tracking code


## Version 0.0.1 ##

* Add "css" directory with empty "style.css" and "fonts.css"
* Add empty "fonts" directory
* Add empty "img" directory and "icon" directory
* Add "js" directory with empty "main.js" and "vendor" directory
  with "jquery" and empty "plugin.js"
* Embed "style.css", "jquery.min.js" and "main.js" in index file
* Add comment for tracking code
* Add conditional comment for IE < 8 (browse happy)
* Change ".htaccess" absolute path example


## Initial commit ##

* Basic HTML5 template, with HTML5 doctype, `lang="en"`, `charset="utf-8"`, 
  compatibility mode `IE=edge` and viewport
* Do not use Chrome Frame anymore
* Basic htaccess file
