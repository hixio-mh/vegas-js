/*jshint unused: false*/
"use strict" ;

import { expoOut } from './core/easings/expoOut.js' ;
import { Point } from './graphics/geom/Point.js' ;
import { ScrollPane } from './ScrollPane.js' ;
import { Tween } from './system/transitions/Tween.js' ;

/**
 * The Builder interface.
 * @name ScrollPaneManager
 * @memberof molecule.renders.pixi.components.panes
 * @class
 * @constructor
 * @param {Object} [target=null] - The target reference of the builder.
 */
export function ScrollPaneManager( target = null )
{
    Object.defineProperties( this ,
    {
        /**
         * Indicates how many pixels constitutes a touch to scroll the content with the finger or the mouse (minimum and default 10px).
         * @memberof molecule.renders.pixi.components.panes.ScrollPaneManager
         * @instance
         * @type number
         * @default 10
         */
        scrollRatio : { writable : true , value : 10 } ,

        /**
         * @private
         */
        _currentX            : { writable : true  , value : 0 } ,
        _currentY            : { writable : true  , value : 0 } ,
        _diffX               : { writable : true  , value : 0 } ,
        _diffY               : { writable : true  , value : 0 } ,
        _horizontalStrength  : { writable : true  , value : 1 } ,
        _inertiaX            : { writable : true  , value : 0 } ,
        _inertiaY            : { writable : true  , value : 0 } ,
        _lastX               : { writable : true  , value : 0 } ,
        _lastY               : { writable : true  , value : 0 } ,
        _pos                 : { writable : false , value : new Point() } ,
        _startH              : { writable : true  , value : 0 } ,
        _startV              : { writable : true  , value : 0 } ,
        _startX              : { writable : true  , value : 0 } ,
        _startY              : { writable : true  , value : 0 } ,
        _smoothing           : { writable : true  , value : true } ,
        _target              : { writable : true  , value : null } ,
        _touching            : { writable : true  , value : false } ,
        _tween               : { writable : false , value : new Tween( { easing : expoOut , duration : 24 } ) } ,
        _useNaturalScrolling : { writable : true  , value : true } ,
        _verticalStrength    : { writable : true  , value : 1 }
    }) ;

    ///////

    this._tween.changeIt.connect( this.scrollChange ) ;
    this._tween.finishIt.connect( this.scrollFinish ) ;
    this._tween.stopIt.connect( this.scrollFinish ) ;

    ///////

    this.target = target ;
}

ScrollPaneManager.prototype = Object.create( Object.prototype ,
{
    // ------------

    constructor : { writable : true , value : ScrollPaneManager } ,

    // ------------

    /**
     * The horizontal strength ratio.
     * @memberof molecule.renders.pixi.components.panes.ScrollPaneManager
     * @instance
     * @type number
     * @default 1
     */
    horizontalStrength :
    {
        get : function() { return this._horizontalStrength } ,
        set : function( value ) { this._horizontalStrength = value; }
    },

    /**
     * Indicates the scroll duration when the scroll is smoothing.
     * @memberof molecule.renders.pixi.components.panes.ScrollPaneManager
     * @instance
     * @type number
     */
    scrollDuration :
    {
        get : function() { return this._tween.duration ; } ,
        set : function( value ) { this._tween.duration = value ; }
    },

    /**
     * Indicates the scroll easing function when the scroll is smoothing.
     * @memberof molecule.renders.pixi.components.panes.ScrollPaneManager
     * @instance
     * @type Function
     * @see {core.easings}
     */
    scrollEasing :
    {
        get : function() { return this._tween.easing ; } ,
        set : function( value )
        {
            this._tween.easing = value instanceof Function ? value : expoOut ;
        }
    },

    /**
     * Controls whether or not the scrolling is smoothed when scaled.
     * @memberof molecule.renders.pixi.components.panes.ScrollPaneManager
     * @instance
     * @type boolean
     */
    smoothing :
    {
        get : function() { return this._smoothing ; } ,
        set : function( value )
        {
            if( this._smoothing === value )
            {
                return ;
            }
            this._smoothing = value === true ;
            if( !this._smoothing )
            {
                stop() ;
            }
        }
    },

    /**
     * Determinates the target reference of the component or custom display container to build.
     * @memberof molecule.renders.pixi.components.panes.ScrollPaneManager
     * @instance
     */
    target :
    {
        get : function() { return this._target ; } ,
        set : function( target )
        {
            if( this._target )
            {
                this.unregisterDisplay() ;
                // this.unregisterMouse() ;
            }
            this._target = target instanceof ScrollPane ? target : null ;
            if( this._target )
            {
                this.registerDisplay() ;
                // if( this._target.stage )
                // {
                //     this.registerMouse() ;
                // }
            }
        }
    },

    /**
     * Indicates if the target is touching.
     * @memberof molecule.renders.pixi.components.panes.ScrollPaneManager
     * @instance
     * @type boolean
     * @default false
     */
    touching : { value : function() { return this._touching ; } } ,

    /**
     * The vertical strength ratio.
     * @memberof molecule.renders.pixi.components.panes.ScrollPaneManager
     * @instance
     * @type number
     * @default 1
     */
    verticalStrength :
    {
        get : function() { return this._verticalStrength } ,
        set : function( value ) { this._verticalStrength = value; }
    },

    // ------------

    /**
     * Stop the smoothing scroll.
     * @memberof molecule.renders.pixi.components.panes.ScrollPaneManager
     * @instance
     * @function
     */
    stop : { value : function()
    {
        if( this._tween.running )
        {
            this._tween.stop() ;
        }
        this._touching = false ;
        this._inertiaX = this._inertiaY = 0 ;
        this._diffX    = this._diffY = 0 ;
        this._lastX    = this._lastY = 0 ;
    }},

    // ------------

    /**
     * Invoked when the scroll with the tween change.
     * @private
     */
    scrollChange : { value : function( action )
    {
        if( this._target && this._target._builder )
        {
            this._target._builder.scrollChange() ;
        }
    }},

    /**
     * Invoked when the scroll with the tween is finished.
     * @private
     */
    scrollFinish : { value : function( action )
    {
        this._inertiaX = 0 ;
        this._inertiaY = 0 ;
        if( this._target && this._target._builder )
        {
            this._target._builder.scrollFinish() ;
        }
    }}

});