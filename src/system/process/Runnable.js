"use strict" ;

/**
 * Indicates if the specific objet is {@link system.process.Runnable|Runnable} and contains a <code>run()</code> method.
 * @name isRunnable
 * @function
 * @instance
 * @memberof system.process
 * @param {object} target - The object to evaluate.
 * @return <code>true</code> if the object is {@link system.process.Runnable|Runnable}.
 */
export function isRunnable( target )
{
    if( target )
    {
        if( target instanceof Runnable )
        {
            return true ;
        }
        return ( 'run' in target ) && ( target.run instanceof Function )  ;
    }
    return false ;
}

/**
 * Represents a single command. The base interface for all commands. If only this interface is implemented by a command, it is treated as a synchronous command. For additional features like asynchronous execution, cancellation or suspension, several subinterfaces are available.
 * This interface is used by all internal command executors and builders.
 * @name Runnable
 * @memberof system.process
 * @interface
 */
export function Runnable() {}

Runnable.prototype = Object.create( Object.prototype ,
{
    constructor : { writable : true , value : Runnable },

    /**
     * Run the process.
     * @name run
     * @memberof system.process.Runnable
     * @function
     * @instance
     */
    run : { writable : true , value : function()
    {
        // override
    }},

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     * @memberof system.transitions.Transition
     * @instance
     * @function
     */
    toString : { writable : true , value : function()
    {
        return '[' + this.constructor.name + ']' ;
    }}
});