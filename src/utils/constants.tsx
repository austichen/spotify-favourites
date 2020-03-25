export const CLIENT_ID = '56e06caba90246f096b5f14c6dd72471'

export enum RESULT_TYPES {
    tracks = 'tracks',
    artists = 'artists'
}

export enum TIME_RANGES {
    short_term = 'short_term',
    medium_term = 'medium_term',
    long_term = 'long_term'
}

export type ResultsType = RESULT_TYPES

export type songIndexCallbackType = (songIndex : number) => void

export interface IResultsSettings {
    type: ResultsType
    timeRange: TIME_RANGES
}
