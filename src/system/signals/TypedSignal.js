/*jslint unused: false */
"use strict" ;

import { fastformat  } from '../../core/strings/fastformat.js' ;
import { strings     } from './strings.js' ;
import { Receiver    } from './Receiver.js' ;
import { Signaler    } from './Signaler.js' ;
import { SignalEntry } from './SignalEntry.js' ;

/**
 * Creates a new Signal instance.
 * @name TypedSignal
 * @class
 * @implements system.signals.Signaler
 * @memberof system.signals
 * @param {Array} [types=null] An optional Array who contains any number of class references that enable type checks in the "emit" method.
 * If this argument is null the "emit" method not check the types of the parameters in the method.
 * @param {Array} [receivers=null] The Array collection of receiver objects to connect with this signal.
 * @example
 * function Slot( name )
 * {
 *     this.name = name ;
 * }
 *
 * Slot.prototype = Object.create( system.signals.Receiver.prototype );
 * Slot.prototype.constructor = Slot;
 *
 * Slot.prototype.receive = function ( message )
 * {
 *     trace( this + " : " + message ) ;
 * }
 *
 * Slot.prototype.toString = function ()
 * {
 *     return "[Slot name:" + this.name + "]" ;
 * }
 *
 * var slot1 = new Slot("slot1") ;
 *
 * var slot2 = function( message )
 * {
 *     trace( this + " : " + message ) ;
 * }
 *
 * var signal = new system.signals.TypedSignal() ;
 *
 * //signal.proxy = slot1 ;
 *
 * signal.connect( slot1 , 0 ) ;
 * signal.connect( slot2 , 2 ) ;
 *
 * signal.emit( "hello world" ) ;
 */
export function TypedSignal( types = null , receivers = null )
{
    if( types && types instanceof Array && types.length > 0 )
    {
        this.types = types ;
    }
    if ( receivers && receivers instanceof Array && receivers.length > 0 )
    {
        var l = receivers.length ;
        for( var i = 0 ; i<l ; i++ )
        {
            this.connect( receivers[i] );
        }
    }
}

TypedSignal.prototype = Object.create( Signaler.prototype ,
{
    /**
     * The proxy reference of the signal to change the scope of the slot (function invoked when the signal emit a message).
     * @name proxy
     * @memberof system.signals.TypeSignal
     * @instance
     */
    proxy :
    {
        configurable : true,
        writable     : true,
        value        : null
    },
    receivers :
    {
        configurable : true,
        writable     : true,
        value        : []
    },
    _types :
    {
        configurable : true,
        writable     : true
    },
    length :
    {
        configurable : true,
        get          : function() { return this.receivers.length ; },
    },
    types :
    {
        configurable : true,
        get          : function() { return this._types ; },
        set          : function( ar  ) /*void*/
        {
            this._types = null ;
            if ( ar && ar instanceof Array && ar.length > 0)
            {
                var l  = ar.length ;
                for( var i  = 0 ; i<l ; i++ )
                {
                    if
                    (
                        ar[i] instanceof Function || ar[i] === "string"  || ar[i] === "number" || ar[i] === "boolean"
                    )
                    {
                        continue ;
                    }
                    throw new Error( fastformat( strings.INVALID_TYPES , i , ar[i] ) ) ;
                }
                this._types = ar.slice() ;
            }
        }
    },
    _typesMatch :
    {
        configurable : false,
        writable     : false,
        value : function( o , type ) 
        {
            if ( type === String || type === "string" )
            {
                return typeof(o) === "string" || o instanceof String ;
            }
            else if ( type === Boolean || type === "boolean" )
            {
                return typeof(o) === "boolean" || o instanceof Boolean ;
            }
            else if ( type === Number || type === "number" )
            {
                return typeof(o) === "number" || o instanceof Number ;
            }
            else
            {
                return o instanceof type ;
            }
        }
    }
});

TypedSignal.prototype.constructor = TypedSignal;

///////////////////

/**
 * Checks all values passed-in the emit method.
 * @memberof system.signals.TypedSignal
 * @instance
 * @function
 * @name checkValues
 */
TypedSignal.prototype.checkValues = function( values  ) /*void*/
{
    if ( this._types )
    {
        if ( values.length === this._types.length )
        {
            var val ;
            var tof ;
            var l = values.length ;
            if ( l === 0 )
            {
                return ;
            }
            for( var i = 0 ; i<l ; i++ )
            {
                if ( !this._typesMatch( values[i] , this._types[i] ) )
                {
                    throw new Error( fastformat( strings.INVALID_PARAMETER_TYPE , i ) ) ;
                }
            }
        }
        else
        {
             throw new Error( fastformat( strings.INVALID_PARAMETERS_LENGTH , this._types.length , values.length ) ) ;
        }
    }
}

/**
 * Connects a Function or a Receiver object.
 * @memberof system.signals.TypedSignal
 * @instance
 * @function
 * @param receiver The receiver to connect : a Function reference or a Receiver object.
 * @param priority Determinates the priority level of the receiver.
 * @param autoDisconnect Apply a disconnect after the first trigger
 * @return <code>true</code> If the receiver is connected with the signal emitter.
 * @name connect
 */
TypedSignal.prototype.connect = function ( receiver , priority /*uint*/ , autoDisconnect  ) 
{
    if ( receiver === null )
    {
        return false ;
    }

    autoDisconnect = Boolean( autoDisconnect ) ;
    priority       = priority > 0 ? Math.ceil(priority) : 0 ;

    if ( ( typeof(receiver) === "function" ) || ( receiver instanceof Function ) || ( receiver instanceof Receiver ) || ( "receive" in receiver ) )
    {
        if ( this.hasReceiver( receiver ) )
        {
            return false ;
        }

        this.receivers.push( new SignalEntry( receiver , priority , autoDisconnect ) ) ;

        /////// bubble sorting

        var i ;
        var j ;

        var a = this.receivers ;

        var swap = function( j , k )
        {
            var temp = a[j] ;
            a[j]     = a[k] ;
            a[k]     = temp ;
            return true ;
        }

        var swapped = false;

        var l = a.length ;

        for( i = 1 ; i < l ; i++ )
        {
            for( j = 0 ; j < ( l - i ) ; j++ )
            {
                if ( a[j+1].priority > a[j].priority )
                {
                    swapped = swap(j, j+1) ;
                }
            }
            if ( !swapped )
            {
                break;
            }
        }

        ///////

        return true ;
    }

    return false ;
}

/**
 * Returns <code>true</code> if one or more receivers are connected.
 * @return <code>true</code> if one or more receivers are connected.
 * @memberof system.signals.TypedSignal
 * @instance
 * @function
 * @name connected
 */
TypedSignal.prototype.connected = function () 
{
    return this.receivers.length > 0 ;
}

/**
 * Disconnect the specified object or all objects if the parameter is null.
 * @return <code>true</code> if the specified receiver exist and can be unregister.
 * @memberof system.signals.TypedSignal
 * @instance
 * @function
 * @name disconnect
 */
TypedSignal.prototype.disconnect = function ( receiver ) 
{
    if ( receiver === null )
    {
        if ( this.receivers.length > 0 )
        {
            this.receivers = [] ;
            return true ;
        }
        else
        {
            return false ;
        }
    }
    if ( this.receivers.length > 0 )
    {
        var l  = this.receivers.length ;
        while( --l > -1 )
        {
            if ( this.receivers[l].receiver === receiver )
            {
                this.receivers.splice( l , 1 ) ;
                return true ;
            }
        }
    }
    return false ;
}

/**
 * Emit the specified values to the receivers.
 * @param ...values All values to emit to the receivers.
 * @memberof system.signals.TypedSignal
 * @instance
 * @function
 * @name emit
 */
TypedSignal.prototype.emit = function( /*Arguments*/ ) /*void*/
{
    var values = Object.setPrototypeOf( arguments , Array.prototype ) ;

    if ( this.receivers.length === 0 )
    {
        return ;
    }

    this.checkValues( arguments ) ;

    var i  ;
    var l  = this.receivers.length ;
    var r  = [] ;
    var a  = this.receivers.slice() ;
    var e /*SignalEntry*/ ;

    var slot ;

    for ( i = 0 ; i < l ; i++ )
    {
        e = a[i] ;
        if ( e.auto )
        {
            r.push( e )  ;
        }
    }
    if ( r.length > 0 )
    {
        l = r.length ;
        while( --l > -1 )
        {
            i = this.receivers.indexOf( r[l] ) ;
            if ( i > -1 )
            {
                this.receivers.splice( i , 1 ) ;
            }
        }
    }
    l = a.length ;
    for ( i = 0 ; i<l ; i++ )
    {
        slot = a[i].receiver ;

        if( slot instanceof Function || typeof(receiver) === "function" )
        {
            slot.apply( this.proxy || this , values ) ;
        }
        else if ( slot instanceof Receiver || "receive" in slot )
        {
            slot.receive.apply( this.proxy || slot , values ) ;
        }
    }
}

/**
 * Returns <code class="prettyprint">true</code> if the specified receiver is connected.
 * @return <code class="prettyprint">true</code> if the specified receiver is connected.
 * @memberof system.signals.TypedSignal
 * @instance
 * @function
 * @name hasReceiver
 */
TypedSignal.prototype.hasReceiver = function ( receiver ) 
{
    if ( receiver === null )
    {
        return false ;

    }
    if ( this.receivers.length > 0 )
    {
        var l  = this.receivers.length ;
        while( --l > -1 )
        {
            if ( this.receivers[l].receiver === receiver )
            {
                return true ;
            }
        }
    }
    return false ;
}

/**
 * Returns the Array representation of all receivers connected with the signal.
 * @return the Array representation of all receivers connected with the signal.
 * @memberof system.signals.TypedSignal
 * @instance
 * @function
 * @name toArray
 */
TypedSignal.prototype.toArray = function() 
{
    var r  = [] ;
    if ( this.receivers.length > 0 )
    {
        var l  = this.receivers.length ;
        for( var i  = 0 ; i<l ; i++ )
        {
            r.push( this.receivers[i].receiver ) ;
        }
    }
    return r ;
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 * @memberof system.signals.TypedSignal
 * @instance
 * @function
 * @name toString
 */
TypedSignal.prototype.toString = function () 
{
    return "[TypedSignal]" ;
}