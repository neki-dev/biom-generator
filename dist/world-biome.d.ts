import { WorldBiomeParams } from './types';
export declare class WorldBiome<T = any> {
    readonly lowerBound: number;
    readonly upperBound: number;
    readonly data: T;
    constructor(params: WorldBiomeParams, data: T);
}
