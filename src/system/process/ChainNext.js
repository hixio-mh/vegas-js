"use strict" ;

import { Receiver  } from '../signals/Receiver.js' ;
import { TaskGroup } from './TaskGroup.js' ;

/**
 * The internal ChainNext Receiver.
 */
export function ChainNext( chain )
{
    this.chain = chain ;
}

/**
 * @extends Receiver
 */
ChainNext.prototype = Object.create( Receiver.prototype ) ;
ChainNext.prototype.constructor = ChainNext;

/**
 * Receive the signal message.
 */
ChainNext.prototype.receive = function()
{
    var chain = this.chain ;
    var mode  = chain._mode ;

    if ( chain._current )
    {
        if ( mode !== TaskGroup.EVERLASTING )
        {
            if ( mode === TaskGroup.TRANSIENT || ( chain._current.auto && mode === TaskGroup.NORMAL) )
            {
                chain._current.action.finishIt.disconnect( this ) ;
                chain._position-- ;
                chain._actions.splice( this._position , 1 ) ;
            }
        }
        chain.notifyChanged() ;
        chain._current = null ;
    }

    if ( chain._actions.length > 0 )
    {
        if ( chain.hasNext() )
        {
            chain._current = chain._actions[ chain._position++ ] ;

            chain.notifyProgress() ;

            if ( chain._current && chain._current.action )
            {
                chain._current.action.run() ;
            }
            else
            {
                this.receive() ;
            }
        }
        else if ( this.looping )
        {
            chain._position = 0 ;
            if( chain.numLoop === 0 )
            {
                chain.notifyLooped() ;
                chain._currentLoop = 0  ;
                this.receive() ;
            }
            else if ( chain._currentLoop < chain.numLoop )
            {
                chain._currentLoop ++ ;
                chain.notifyLooped() ;
                this.receive() ;
            }
            else
            {
                chain._currentLoop = 0 ;
                chain.notifyFinished() ;
            }
        }
        else
        {
            chain._currentLoop = 0 ;
            chain._position    = 0 ;
            chain.notifyFinished() ;
        }
    }
    else
    {
        chain.notifyFinished() ;
    }
}