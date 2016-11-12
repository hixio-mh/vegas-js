"use strict" ;

/**
 * The <code>backInOut</code> method combines the motion of the <code>backIn</code> and <code>backOut</code> methods
 * @param t Specifies the current time, between 0 and duration inclusive.
 * @param b Specifies the initial value of the animation property.
 * @param c Specifies the total change in the animation property.
 * @param d Specifies the duration of the motion.
 * @param s Specifies the amount of overshoot, where the higher the value, the greater the overshoot.
 * @return The value of the interpolated property at the specified time.
 */
export var backInOut = ( t , b , c , d , s = 1.70158 ) =>
{
    if ( isNaN( s ) )
    {
        s = 1.70158 ;
    }
    if ((t/=d/2) < 1)
    {
        return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
    }
    return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
}
