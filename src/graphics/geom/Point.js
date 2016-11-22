"use strict" ;

import { acosD  } from '../../core/maths/acosD.js' ;
import { atan2D } from '../../core/maths/atan2D.js' ;
import { cosD } from '../../core/maths/cosD.js' ;
import { sinD } from '../../core/maths/sinD.js' ;

import { Vector2 } from './Vector2.js' ;

/**
 * The Point class represents a location in a two-dimensional coordinate system, where x represents the horizontal axis and y represents the vertical axis.
 * @constructor
 * @param x the x value of the object.
 * @param y the y value of the object.
 */
export function Point( x = 0 , y = 0 )
{
    Vector2.call( this , x , y ) ;
}

/**
 * @extends Vector2
 */
Point.prototype = Object.create( Vector2.prototype ,
{
    /**
     * Returns the angle value of this Point object.
     * @example
     * <pre>
     * var p1 = new Point(0,10) ;
     * var p2 = new Point(10,10) ;
     * trace(p1.angle) ; // 90
     * trace(p2.angle) ; // 45
     * </pre>
     * @return the angle value of this Point object.
     */
    angle :
    {
        get : function()
        {
            return atan2D(this.y, this.x) ;
        },
        set : function( value )
        {
            let len = Math.sqrt(this.x * this.x + this.y * this.y) ; // length
            this.x = len * cosD(value) ;
            this.y = len * sinD(value) ;
        }
    },

    /**
     * Indicates the length of the line segment from (0,0) to this point.
     * @example
     */
    length :
    {
        get : function()
        {
            return Math.sqrt(this.x * this.x + this.y * this.y) ;
        }
    },

    /**
     * Transform the coordinates of this point to used absolute value for the x and y properties.
     * @example
     * <pre>
     * var p = new Point(-10, -20) ;
     * p.abs() ;
     * trace(p) ; // [Point x:10 y:20]
     * </pre>
     */
    abs : { writable : true , value : function()
    {
        this.x = Math.abs(this.x) ;
        this.y = Math.abs(this.y) ;
    }},

    /**
     * Adds the coordinates of another point to the coordinates of this point.
     * @param point the point to be added. You can use an object with the properties x and y.
     */
    add : { writable : true , value : function( point )
    {
        this.x += point.x ;
        this.y += point.y ;
        return this ;
    }},

    /**
     * Returns the angle value between this Point object and the specified Point passed in arguments.
     * <p><b>Example :</b></p>
     * {@code
     * var p1 = new Point(10, 20) ;
     * var p2 = new Point(50, 200) ;
     * var angle = p1.angleBetween(p2) ;
     * }
     * @return the angle value between this Point object and the specified Point passed in arguments.
     */
    angleBetween : { value : function( point )
    {
        return acosD
        (
            this.dot(point) /
            ( (Math.sqrt(this.x*this.x+this.y*this.y)) * (Math.sqrt(point.x*point.x+point.y*point.y)) )
        ) ;
    }},

    /**
     * Returns a shallow copy of the object.
     * @return a shallow copy of the object.
     */
    clone : { writable : true , value : function()
    {
        return new Point( this.x , this.y ) ;
    }},

    /**
     * Returns the cross value of the current Point object with the Point passed in argument.
     * <pre>
     * var p1 = new Point(10,20) ;
     * var p2 = new Point(40,60) ;
     * trace(p1.cross(p2)) ; // -200
     * </pre>
     * @param p The Point object use to calculate the cross value.
     * @return The cross value of the current Point object with the Point passed in argument.
     */
    cross : { writable : true , value : function( point )
    {
        return (this.x*point.y) - (this.y*point.x) ;
    }},

    /**
     * Returns the dot value of the current Point and the specified Point passed in argument.
     * @example
     * <pre>
     * var p1 = new Point(10,20) ;
     * var p2 = new Point(40,60) ;
     * trace(p1.dot(p2)) ; // 1600
     * </pre>
     * @param p the Point to calculate the dot value of the current Point.
     * @return the dot value of the current Point and the specified Point passed in argument.
     */
    dot : { writable : true , value : function( point )
    {
        return (this.x * point.x) + (this.y * point.y) ;
    }},

    /**
     * Returns the normal value of this Point.
     * @example
     * <pre>
     * var p = new Point(10,10) ;
     * var n = p.getNormal() ; // [Point x:-10 y:10]
     * trace(n) ;
     * </pre>
     * @return the normal value of this Point.
     */
    getNormal : { value : function()
    {
        return new Point(-this.y , this.x) ;
    }},

    /**
     * Returns the size of the projection of this Point with an other Point.
     * @example
     * <pre>
     * var p1 = new Point(10,10) ;
     * var p2 = new Point(100,200) ;
     * var size = p1.getProjectionLength(p2) ;
     * trace(size) ; // 0.06
     * </pre>
     * @param point the Point use to calculate the length of the projection.
     * @return the size of the projection of this Point with an other Point.
     */
    getProjectionLength : { value : function( point )
    {
        let len = point.dot(point) ;
        return (len === 0 ) ? 0 : Math.abs( this.dot(point) / len ) ;
    }},

    /**
     * Returns true if the Point is perpendicular with the passed-in Point.
     * @example
     * <pre>
     * var p1 = new Point(0,10) ;
     * var p2 = new Point(10,10) ;
     * var p3 = new Point(10,0) ;
     * trace(p1.isPerpTo(p2)) ; // false
     * trace(p1.isPerpTo(p3)) ; // true
     * </pre>
     * @param p the Point use to determinate if this Point object is perpendicular.
     * @return {@code true} if the Point is perpendicular with the passed-in Point.
     */
    isPerpTo : { writable : true , value : function( point )
    {
        return this.dot(point) === 0 ;
    }},

    /**
     * Returns the new Point with the maximum horizontal coordinate and the maximum vertical coordinate.
     * @example
     * <pre>
     * var p1 = new Point(10,100) ;
     * var p2 = new Point(100,10) ;
     * var p3 = p1.max(p2) ;
     * trace(p3) ; // [Point x:100 y:100]
     * </pre>
     * @param point The Point passed in this method.
     * @return The new Point with the maximum horizontal coordinate and the maximum vertical coordinate.
     */
    max : { writable : true , value : function( point )
    {
        return new Point( Math.max(this.x , point.x) , Math.max(this.y, point.y) ) ;
    }},

    /**
     * Returns a new Point with the minimum horizontal coordinate and the minimize vertical coordinate.
     * @example
     * <pre>
     * var p1 = new Point(10,100) ;
     * var p2 = new Point(100,10) ;
     * var p3 = p1.min(p2) ;
     * trace(p3) ; // [Point x:10 y:10]
     * </pre>
     * @param point The Point passed in this method
     * @return A new Point with the min horizontal coordinate and the minimize vertical coordinate.
     */
    min : { writable : true , value : function( point )
    {
        return new Point( Math.min(this.x , point.x) , Math.min(this.y, point.y) ) ;
    }},

    /**
     * Sets this Point with negate coordinates.
     * @example
     * <pre>
     * var p = new Point(10,20) ;
     * trace(p) ; // [Point x:10 y:20]
     * p.negate() ;
     * trace(p) ; // [Point x:-10 y:-20]
     * p.negate() ;
     * trace(p) ; // [Point x:10 y:20]
     * </pre>
     */
    negate : { writable : true , value : function()
    {
        this.x = -this.x ;
        this.y = -this.y ;
    }},

    /**
     * Scales the line segment between (0,0) and the current point to a set length.
     * @example
     * <pre>
     * var p = new Point(0,5) ;
     * p.normalize() ;
     * trace(p) ; // [Point x:0 y:1]
     * </pre>
     * @param thickness The scaling value. For example, if the current point is (0,5), and you normalize it to 1, the point returned is at (0,1).
     * @see #length
     * @throws Error if a zero-length vector or a illegal NaN value is calculate in this method.
     */
    normalize : { writable : true , value : function( thickness = 1 )
    {
        if ( isNaN(thickness) )
        {
            thickness = 1 ;
        }
        let l = Math.sqrt(this.x * this.x + this.y * this.y) ; // length
        if (l > 0)
        {
            l = thickness / l ;
            this.x *= l ;
            this.y *= l ;
        }
        else
        {
            throw new Error(this + " normalize method failed with a zero-length vector or a illegal NaN value.") ;
        }
    }},

    /**
     * Offsets the Point object by the specified amount.
     * The value of dx is added to the original value of x to create the new x value.
     * The value of dy is added to the original value of y to create the new y value.
     * @param dx {number} The amount by which to offset the horizontal coordinate, x.
     * @param dy {number} The amount by which to offset the vertical coordinate, y.
     * @example
     * <pre>
     * var p = new Point(10,10) ;
     * p.offset(10,10) ;
     * trace(p) ; // [Point x:20 y:20]
     * </pre>
     */
    offset : { writable : true , value : function( dx = 0 , dy = 0 )
    {
        this.x += isNaN(dx) ? 0 : dx ;
        this.y += isNaN(dy) ? 0 : dy ;
    }},

    /**
     * Rotates the Point with the specified angle in argument.
     * @param angle the angle to rotate this Point.
     * @param anchor the anchor point to rotate this Point around (by default use the {0,0} position).
     */
    rotate : { value : function( angle , anchor = null )
    {
        let ax = 0 ;
        let ay = 0 ;

        if( anchor )
        {
            if( (anchor instanceof Point) || ( ('x' in anchor) && ('y' in anchor) ) )
            {
                ax = isNaN(anchor.x) ? 0 : anchor.x ;
                ay = isNaN(anchor.y) ? 0 : anchor.y ;
            }
        }

        let dx = this.x - ax ;
        let dy = this.y - ay ;

        let cos = Math.cos( angle ) ;
        let sin = Math.sin( angle ) ;

        this.x = ax + ( cos * dx + sin * dy ) ;
        this.y = ay + ( cos * dy - sin * dx ) ;
    }},

    /**
     * Scales the Point with the specified value in argument.
     * @param value the value to scale this Point coordinates.
     */
    scale : { value : function( value )
    {
        this.x *= isNaN(value) ? 0 : value ;
        this.y *= isNaN(value) ? 0 : value ;
    }},

    /**
     * Sets the horizontal and vertical coordinates of this Point. If the {@code x} and the {@code y} parameters are NaN or null the x value is 0 and y value is 0.
     * @param x The x coordinates of the point.
     * @param y The y coordinates of the point.
     */
    set : { value : function( x = 0 , y = 0 )
    {
        this.x = isNaN(x) ? 0 : x ;
        this.y = isNaN(y) ? 0 : y ;
    }},

    /**
     * Subtracts the coordinates of another point from the coordinates of this point.
     * @param point The point to be subtracted.
     */
    subtract : { value : function( point )
    {
        this.x -= point.x ;
        this.y -= point.y ;
    }},

    /**
     * Swap the horizontal and vertical coordinates of two Point objects.
     * @param point The point to be swap.
     * @example
     * var p1 = new Point(10,20) ;
     * var p2 = new Point(30,40) ;
     * trace(p1 + " / " + p2) ; // [Point x:10 y:20] / [Point x:30 y:40]
     * p1.swap(p2) ;
     * trace(p1 + " / " + p2) ; // [Point x:30 y:40] / [Point x:10 y:20]
     */
    swap : { value : function( point )
    {
        let tx = this.x ;
        let ty = this.y ;
        this.x = point.x ;
        this.y = point.y ;
        point.x = tx ;
        point.y = ty ;
    }},

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    toString : { writable : true , value : function()
    {
        return "[Point x:" + this.x + " y:" + this.y + "]" ;
    }}
});

Object.defineProperties( Point ,
{
    /**
     * Returns the distance between p1 and p2 the 2 Points reference passed in argument.
     * @example
     * <pre>
     * var p1 = new Point(10,20) ;
     * var p2 = new Point(40,60) ;
     * trace( Point.distance(p1,p2) ) ; // 50
     * </pre>
     * @param p1 the first Point.
     * @param p2 the second Point.
     * @return the distance between p1 and p2 the 2 Points reference passed in argument.
     */
    distance : { value : function( p1 , p2 )
    {
        let x = p1.x - p2.x ;
        let y = p1.y - p2.y ;
        return Math.sqrt(x*x+y*y) ;
    }},

    /**
     * Returns the middle Point between 2 Points.
     * @example
     * <pre>
     * var p1 = new Point(10,10) ;
     * var p2 = new Point(20,20) ;
     * var middle = Point.getMiddle(p1,p2) ;
     * trace(middle) ;
     * </pre>
     * @return the middle Point between 2 Points.
     */
    getMiddle : { value : function( p1 , p2 )
    {
        return new Point
        (
            (p1.x + p2.x) * 0.5 ,
            (p1.y + p2.y) * 0.5
        ) ;
    }},

    /**
     * Determines a point between two specified points.
     * The parameter f determines where the new interpolated point is located relative to the two end points specified by parameters {@code p1} and {@code p2}.
     * The closer the value of the parameter f is to 1.0, the closer the interpolated point is to the first point (parameter {@code p1}).
     * The closer the value of the parameter f is to 0, the closer the interpolated point is to the second point (parameter {@code p2}).
     * @example
     * <pre>
     * var p1 = new Point(10,10) ;
     * var p2 = new Point(40,40) ;
     * var p3 ;
     *
     * p3 = Point.interpolate( p1 , p2 , 0 ) ;
     * trace(p3) ; // [Point x:40 y:40]
     *
     * p3 = Point.interpolate( p1 , p2 , 1 ) ;
     * trace(p3) ; // [Point x:10 y:10]
     *
     * p3 = Point.interpolate( p1 , p2 , 0.5 ) ;
     * trace(p3) ; // [Point x:25 y:25]
     * </pre>
     * @param p1 The first point.
     * @param p2 The second Point.
     * @param level the The level of interpolation between the two points. Indicates where the new point will be, along the line between p1 and p2. If level=1, pt1 is returned; if level=0, pt2 is returned.
     * @return The new interpolated point.
     */
    interpolate : { value : function( p1 , p2 , level = 0 )
    {
        if( isNaN(level) )
        {
            level = 0 ;
        }

        level = Math.max( Math.min( level, 1 ), 0 ) ;

        if( level === 0 )
        {
            return p2 ;
        }
        else if( level === 1 )
        {
            return p1 ;
        }
        else
        {
            return new Point
            (
                p2.x + level * (p1.x - p2.x) ,
                p2.y + level * (p1.y - p2.y)
            ) ;
        }
    }},

    /**
     * Converts a pair of polar coordinates to a Cartesian point coordinates.
     * @example
     * <pre>
     * var polar = Point.polar( 5, Math.atan(3/4) ) ;
     * trace(polar) ; // [Point x:4 y:3]
     * </pre>
     * @param {number} len The length coordinate of the polar pair.
     * @param {number} angle The angle, in radians, of the polar pair.
     * @return The new Cartesian point.
     */
    polar : { value : function( len , angle )
    {
        return new Point( len * Math.cos(angle), len * Math.sin(angle) ) ;
    }}
}) ;