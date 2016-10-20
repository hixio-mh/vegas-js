"use strict" ;

/**
 * This collection contains all white space chars.
 * <p><b>Note :</b></p>
 * <ul>
 * <li><a href="http://developer.mozilla.org/es4/proposals/string.html">http://developer.mozilla.org/es4/proposals/string.html</a></li>
 * <li><a href="http://www.fileformat.info/info/unicode/category/Zs/list.htm">http://www.fileformat.info/info/unicode/category/Zs/list.htm</a></li>
 * <li><a href="http://www.fileformat.info/info/unicode/category/Zl/list.htm">http://www.fileformat.info/info/unicode/category/Zl/list.htm</a></li>
 * <li><a href="http://www.fileformat.info/info/unicode/category/Zp/list.htm">http://www.fileformat.info/info/unicode/category/Zp/list.htm</a></li>
 * <li><a href="http://www.fileformat.info/info/unicode/char/200b/index.htm">http://www.fileformat.info/info/unicode/char/200b/index.htm</a></li>
 * <li><a href="http://www.fileformat.info/info/unicode/char/feff/index.htm">http://www.fileformat.info/info/unicode/char/feff/index.htm</a></li>
 * <li><a href="http://www.fileformat.info/info/unicode/char/2060/index.htm">http://www.fileformat.info/info/unicode/char/2060/index.htm</a></li>
 * </ul>
 */
export var whiteSpaces =
[
    "\u0009" /*Horizontal tab*/ ,
    "\u000A" /*Line feed or New line*/,
    "\u000B" /*Vertical tab*/,
    "\u000C" /*Formfeed*/,
    "\u000D" /*Carriage return*/,
    "\u0020" /*Space*/,
    "\u00A0" /*Non-breaking space*/,
    "\u1680" /*Ogham space mark*/,
    "\u180E" /*Mongolian vowel separator*/,
    "\u2000" /*En quad*/,
    "\u2001" /*Em quad*/,
    "\u2002" /*En space*/,
    "\u2003" /*Em space*/,
    "\u2004" /*Three-per-em space*/,
    "\u2005" /*Four-per-em space*/,
    "\u2006" /*Six-per-em space*/,
    "\u2007" /*Figure space*/,
    "\u2008" /*Punctuation space*/,
    "\u2009" /*Thin space*/,
    "\u200A" /*Hair space*/,
    "\u200B" /*Zero width space*/,
    "\u2028" /*Line separator*/,
    "\u2029" /*Paragraph separator*/,
    "\u202F" /*Narrow no-break space*/,
    "\u205F" /*Medium mathematical space*/,
    "\u3000" /*Ideographic space*/
];

// TODO We maybe could also define 0xFFEF and/or 0x2060, but not completely sure of all the implication,
// 0xFFEF in byte order mark etc.