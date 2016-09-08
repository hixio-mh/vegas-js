"use strict" ;

import { isEquatable } from '../Equatable.js' ;
import { Rule } from './Rule.js' ;

/**
 * Used to perform a logical conjunction on two conditions and more.
 * @param value1 The first value to evaluate.
 * @param value2 The second value to evaluate.
 * @example
 * <pre>
 *
 * var BooleanRule = system.rules.BooleanRule ;
 * var Equals      =  system.rules.Equals ;
 *
 * var e ;
 *
 * ///// Compares objects.
 *
 * e = new Equals( 1 , 1 ) ;
 * trace( e.eval() ) ; // true
 *
 * e = new Equals( 1 , 2 ) ;
 * trace( e.eval() ) ; // false
 *
 * ///// Compares Rule objects.
 *
 * var cond1 = new BooleanRule( true  ) ;
 * var cond2 = new BooleanRule( false ) ;
 * var cond3 = new BooleanRule( true  ) ;
 *
 * e = new Equals( cond1 , cond1 ) ;
 * trace( e.eval() ) ; // true
 *
 * e = new Equals( cond1 , cond2 ) ;
 * trace( e.eval() ) ; // false
 *
 * e = new Equals( cond1 , cond3 ) ;
 * trace( e.eval() ) ; // true
 *
 * ///// Compares Equatable objects.
 *
 * var equals = function( o )
 * {
 *     return this.id === o.id ;
 * }
 *
 * var o1 = { id:1 , equals:equals } ;
 * var o2 = { id:2 , equals:equals } ;
 * var o3 = { id:1 , equals:equals } ;
 *
 * e = new Equals( o1 , o1 ) ;
 * trace( e.eval() ) ; // true
 *
 * e = new Equals( o1 , o2 ) ;
 * trace( e.eval() ) ; // false
 *
 * e = new Equals( o1 , o3 ) ;
 * trace( e.eval() ) ; // true
 * </pre>
 */
export function Equals( value1 = null , value2 = null )
{
    this.value1 = value1 ;
    this.value2 = value2 ;
}

/**
 * @extends Evaluable
 */
Equals.prototype = Object.create( Rule.prototype );
Equals.prototype.constructor = Equals ;

/**
 * Evaluates the specified object.
 */
Equals.prototype.eval = function ()
{
    if ( this.value1 === this.value2 )
    {
        return true ;
    }
    else if ( (this.value1 instanceof Rule) && (this.value2 instanceof Rule) )
    {
        return this.value1.eval() === this.value2.eval() ;
    }
    else if ( isEquatable(this.value1) )
    {
        return this.value1.equals( this.value2 ) ;
    }
    else
    {
        return false ;
    }
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
Equals.prototype.toString = function () /*String*/
{
    return "[Equals]" ;
}