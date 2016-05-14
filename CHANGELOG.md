# Changelog #


## HEAD ##

* Add webkit appearance normalize (iOS).
* Add Bram Steins Font Face Observer.
* Move `<abbr>` styling to from "Minimal Normalize" to "Base".


## Version 1.0.1 ##

* Add `<mark>` example.
* Update jQuery from 1.11.3 to 1.12.3.
* Add media object.
* Use `p` as wrapping element for form input as recommended in HTML5 specification.
* Remove some meta tags.
* Outline changes.
* Remove year from footer.
* Add "media" attribute for IE conditional comments.
* Replace spaces with tabs in "style.css".
* Fix jQuery no conflict in "main.js".
* README update.
* Add designer meta tag.
* Remove duplicate comment in "style.css".
* Change name in "package.json".
* Remove "keywords" meta tag, useless nowadays, like "revisit-after".
* Refactor "style.css".
* Add link rel for shortcut icon only in src.
* Syntax changes in "gulpfile.js".


## Version 1.0.0 ##

* Distribute files into "dist" directory with Gulp.
* Add empty favicon.


## Version 0.0.5 ##

* Add JavaScript example.
* Prepare for "dist" folder.


## Version 0.0.4 ##

* Remove "fonts.css", place fonts in "style.css".
* Remove "print.css" and place code in "style.css" withing media query.
* Add fallback print CSS for IE <= 8.
* Add "screen-reader-text"-class.


## Version 0.0.3 ##

* Prevent FOUC, add class `no-js`. Do not use Modernizr.
* Add "createHTML5Elements.js".
* Add conditional comment for IE (CSS fix), not in `<html>` element,
  because "X-UA-Compatible" is among.
* Rename "plugins.js" to "plugins.min.js" because minified version 
  should be used.
* Add basic CSS.


## Version 0.0.2 ##

* HTML Markup examples.
* Meta changes in `<head>`.
* Add "print.css".
* Add Piwik tracking code.


## Version 0.0.1 ##

* Add "css" directory with empty "style.css" and "fonts.css".
* Add empty "fonts" directory.
* Add empty "img" directory and "icon" directory.
* Add "js" directory with empty "main.js" and "vendor" directory
  with "jquery" and empty "plugin.js".
* Embed "style.css", "jquery.min.js" and "main.js" in index file.
* Add comment for tracking code.
* Add conditional comment for IE < 8 (browse happy).
* Change ".htaccess" absolute path example.


## Initial commit ##

* Basic HTML5 template, with HTML5 doctype, `lang="en"`, `charset="utf-8"`, 
  compatibility mode `IE=edge` and viewport.
* Do not use Chrome Frame anymore.
* Basic htaccess file.
