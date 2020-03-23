export const CLIENT_ID = '56e06caba90246f096b5f14c6dd72471'
export const TOKEN_LOCALSTORE_KEY = 'spotify-favourites.accessToken'

export enum RESULT_TYPES {
    tracks = 'tracks',
    artists = 'artists'
}

export type ResultsType = RESULT_TYPES

export type songIndexCallbackType = (songIndex : number) => void
