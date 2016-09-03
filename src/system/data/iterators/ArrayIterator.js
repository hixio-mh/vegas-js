"use strict" ;

import { Iterator } from '../Iterator.js' ;

/**
 * Converts a <code>Array</code> to an iterator.
 * @example
 * var ArrayIterator = system.data.iterators.ArrayIterator ;
 *
 * var ar = ["item1", "item2", "item3", "item4"] ;
 *
 * var it = new ArrayIterator(ar) ;
 *
 * while (it.hasNext())
 * {
 *     trace (it.next()) ;
 * }
 *
 * trace ("--- it reset") ;
 *
 * it.reset() ;
 *
 * while (it.hasNext())
 * {
 *     trace (it.next() + " : " + it.key()) ;
 * }
 *
 * trace ("--- it seek 2") ;
 *
 * it.seek(2) ;
 * while (it.hasNext())
 * {
 *     trace (it.next()) ;
 * }
 *
 * trace ("---") ;
 */
export function ArrayIterator( array )
{
    if ( !(array instanceof Array) )
    {
        throw new ReferenceError( this + " constructor failed, the passed-in Array argument not must be 'null'.") ;
    }
    Object.defineProperties( this ,
    {
        _a : { value : array , writable : true } ,
        _k : { value : -1    , writable : true }
    }) ;
}

/**
 * @extends Object
 */
ArrayIterator.prototype = Object.create( Iterator.prototype ) ;
ArrayIterator.prototype.constructor = ArrayIterator ;

/**
 * Returns <code>true</code> if the iteration has more elements.
 * @return <code>true</code> if the iteration has more elements.
 */
ArrayIterator.prototype.hasNext = function()
{
    return (this._k < this._a.length -1) ;
}

/**
 * Returns the current key of the internal pointer of the iterator (optional operation).
 * @return the current key of the internal pointer of the iterator (optional operation).
 */
ArrayIterator.prototype.key = function()
{
    return this._k ;
}

/**
 * Returns the next element in the iteration.
 * @return the next element in the iteration.
 */
ArrayIterator.prototype.next = function()
{
    return this._a[++this._k] ;
}

/**
 * Removes from the underlying collection the last element returned by the iterator (optional operation).
 */
ArrayIterator.prototype.remove = function()
{
    return this._a.splice(this._k--, 1)[0] ;
}

/**
 * Reset the internal pointer of the iterator (optional operation).
 */
ArrayIterator.prototype.reset = function()
{
    this._k = -1 ;
}

/**
 * Changes the position of the internal pointer of the iterator (optional operation).
 */
ArrayIterator.prototype.seek = function ( position )
{
    position = Math.max( Math.min( position - 1 , this._a.length ) , -1 ) ;
    this._k = isNaN(position) ? -1 : position ;
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance
 */
ArrayIterator.prototype.toString = function ()
{
    return '[ArrayIterator]' ;
}