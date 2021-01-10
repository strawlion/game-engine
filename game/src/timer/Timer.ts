export default interface Timer {
    type: 'FixedDelayTimer' | 'IntervalTimer';
    initialFramesBeforeExecution: number;
    framesBeforeExecution: number;
    onTimerFired: (...any: any[]) => any;
}
