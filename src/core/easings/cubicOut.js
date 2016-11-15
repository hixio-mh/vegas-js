"use strict" ;

/**
 * The <code>cubicOut</code> function starts motion fast and then decelerates motion to a zero velocity as it executes.
 * <p>A cubic equation is based on the power of three : <code>p(t) = t &#42; t &#42; t</code>.</p>
 * @param t Specifies the current time, between 0 and duration inclusive.
 * @param b Specifies the initial value of the animation property.
 * @param c Specifies the total change in the animation property.
 * @param d Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */
export var cubicOut = ( t , b , c , d ) => c * ( ( t = t/d-1 ) * t * t + 1 ) + b;