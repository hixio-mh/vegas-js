"use strict" ;

/**
 * The Vector2 class represents a simple location in a two-dimensional coordinate system, where x represents the horizontal axis and y represents the vertical axis.
 * @constructor
 * @param x the x value of the object.
 * @param y the y value of the object.
 */
export function Vector2( x = 0 , y = 0 )
{
    Object.defineProperties( this ,
    {
        /**
         * Determinates the x value of this object.
         */
        x : { value : isNaN(x) ? 0 : x , writable : true } ,

        /**
         * Determinates the y value of this object.
         */
        y : { value : isNaN(y) ? 0 : y , writable : true }
    });
}

/**
 * @extends Object
 */
Vector2.prototype = Object.create( Object.prototype ,
{
    /**
     * Returns a shallow copy of the object.
     * @return a shallow copy of the object.
     */
    clone : { writable : true , value : function()
    {
        return new Vector2( this.x , this.y ) ;
    }},

    /**
     * Compares the passed-in object with this object for equality.
     * @return <code>true</code> if the the specified object is equal with this object.
     */
    equals : { writable : true , value : function( o )
    {
        if ( o instanceof Vector2 )
        {
            return o.x === this.x && o.y === this.y ;
        }
        else
        {
            return false ;
        }
    }},

    /**
     * Returns the Object representation of this object.
     * @return the Object representation of this object.
     */
    toObject : { writable : true , value : function()
    {
        return { x:this.x , y:this.y } ;
    }},

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    toString : { writable : true , value : function()
    {
        return "[Vector2 x:" + this.x + " y:" + this.y + "]" ;
    }}
});