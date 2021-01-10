import Timer from './Timer';


export default function createTimerManager({ targetGameLogicFrameRate }) {
    let timers: Timer[] = [];
    return {
        createFixedDelayTimer,
        createIntervalTimer,
        // TODO: Separate API so end users don't see internal functions
        nextTimerTick,
    };

    // TODO: Can optimize timer execution by building minheap, only decrement first timer. Keep count of decrements
    // When top node pops, decrement next timer by count of decrements (could lead to overflow)
    function nextTimerTick() {
        // TODO: optimize
        timers = timers.filter(timer => {
            timer.framesBeforeExecution -= 1;
            const shouldTimerFire = timer.framesBeforeExecution <= 0;
            if (shouldTimerFire) {
                timer.onTimerFired();

                if (timer.type === 'IntervalTimer') {
                    timer.framesBeforeExecution = timer.initialFramesBeforeExecution;
                    return true;
                }

                return false;
            }
            return true;
        })
    }
    
    function createFixedDelayTimer(onTimerFired, delay) {
        // TODO: Does using this frame conversion really work?
        const framesBeforeExecution = Math.ceil(delay/targetGameLogicFrameRate); // TODO: Ceil or floor? Round?
        timers.push({
            type: 'FixedDelayTimer',
            initialFramesBeforeExecution: framesBeforeExecution,
            framesBeforeExecution,
            onTimerFired,
        });
    }

    function createIntervalTimer(onTimerFired, delay) {
        // TODO: Does using this frame conversion really work?
        const framesBeforeExecution = Math.ceil(delay/targetGameLogicFrameRate); // TODO: Ceil or floor? Round?
        timers.push({
            type: 'IntervalTimer',
            initialFramesBeforeExecution: framesBeforeExecution,
            framesBeforeExecution,
            onTimerFired,
        });
    }
}
