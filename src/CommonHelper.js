export const STARTED = '_STARTED';
export const SUCCEEDED = '_SUCCEEDED';
export const FAILED = '_FAILED';
export const ENDED = '_ENDED';

export const getStarted = (state) => state + STARTED;
export const getSucceeded = (state) => state + SUCCEEDED;
export const getFailed = (state) => state + FAILED;
export const getEnded = (state) => state + ENDED;