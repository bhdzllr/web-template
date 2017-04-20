/**
 * Create semantic HTML5 Elements for IE < 9.
 * Other older browsers can handle it via CSS.
 */

var e = ('abbr,article,aside,audio,bdi,canvas,data,datalist,details,dialog,'
	+ 'figure,figcaption,footer,header,main,mark,menu,meter,nav,output,'
	+ 'progress,section,summary,time,video').split(',');

var i = e.length;

while (i--) {
	document.createElement(e[i]);
}
