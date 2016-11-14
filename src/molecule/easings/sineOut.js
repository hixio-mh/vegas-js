"use strict" ;

/**
 * The <code>sineOut</code> function starts motion fast and then decelerates motion to a zero velocity as it executes.
 * <p>A sinusoidal equation is based on a sine or cosine function. Either one produces a sine wave—a periodic oscillation of a specific shape.</p>
 * <p>This is the equation on which I based the easing curve : <code>p(t) = sin( t &#42; Math.PI / 2 )</code></p>
 * @param t Specifies the current time, between 0 and duration inclusive.
 * @param b Specifies the initial value of the animation property.
 * @param c Specifies the total change in the animation property.
 * @param d Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */
export var sineOut = ( t , b , c , d ) => c * Math.sin( t/d * ( Math.PI/2 ) ) + b ;