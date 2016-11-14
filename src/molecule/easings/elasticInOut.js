"use strict" ;

/**
 * The <code>elasticInOut</code> function combines the motion of the elasticIn and elasticOut methods to start the motion from a zero velocity, accelerate motion, then decelerate to a zero velocity.
 * @param t Specifies the current time, between 0 and duration inclusive.
 * @param b Specifies the initial value of the animation property.
 * @param c Specifies the total change in the animation property.
 * @param d Specifies the duration of the motion.
 * @param a Specifies the amplitude of the sine wave.
 * @param p Specifies the period of the sine wave.
 * @return The value of the interpolated property at the specified time.
 */
export var elasticInOut = ( t , b , c , d , a = 0 , p = 0 ) =>
{
    var s ;

    if ( t === 0 )
    {
        return b;
    }
    if ( (t/=d/2) === 2 )
    {
        return b+c ;
    }
    if ( isNaN(p) )
    {
        p = d*(0.3*1.5) ;
    }
    if (!a || a < Math.abs(c))
    {
        a = c ;
        s = p / 4 ;
    }
    else
    {
        s = p / (2*Math.PI) * Math.asin (c/a) ;
    }

    if (t < 1)
    {
        return -0.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    }

    return a * Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b ;
}