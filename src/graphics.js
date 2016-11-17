"use strict" ;

import './polyfill.js' ;

import { Align }   from './graphics/Align.js' ;
import { ArcType } from './graphics/ArcType.js' ;
import { Border }  from './graphics/Border.js' ;

/**
 * The VEGAS.js framework - The graphics library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export var graphics = Object.assign
({
    Align   : Align ,
    ArcType : ArcType ,
    Border  : Border
}) ;