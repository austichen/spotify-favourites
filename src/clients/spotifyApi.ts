export class SpotifyApiClient {
    private accessToken : string
    private BASE_API_URL = 'https://api.spotify.com/v1'

    constructor(accessToken : string) {
        this.accessToken = accessToken;
    }

    private async makeRequest<ResponseType>(url : string) {
        const res = await fetch(url, {headers: {Authorization : `Bearer ${this.accessToken}`}})
        const jsonResponse: ResponseType = await res.json()
        return jsonResponse
    }

    public async getUserInfo() {
        return await this.makeRequest(`${this.BASE_API_URL}/me`)
    }

    public async getTopArtists(queryParams: IPersonalizationQueryParams = {}) {
        const {limit, offset, timeRange} = queryParams
        let URL = `${this.BASE_API_URL}/me/top/artists?limit=${limit || 50}`
        if (offset) {
            URL += `&offset=${offset}`
        }
        if (timeRange) {
            URL += `&time_range=${timeRange}`
        }

        return await this.makeRequest<ISpotifyResultList<ISpotifyArtist>>(URL)
    }

    public async getTopTracks(queryParams: IPersonalizationQueryParams = {}) {
        const {limit, offset, timeRange} = queryParams
        let URL = `${this.BASE_API_URL}/me/top/tracks?limit=${limit || 50}`
        if (offset) {
            URL += `&offset=${offset}`
        }
        if (timeRange) {
            URL += `&time_range=${timeRange}`
        }

        return await this.makeRequest<ISpotifyResultList<ISpotifyTrack>>(URL)
    }
    
    public async getArtistTopTracks({id, country} : IArtistTopTracksQueryParams) {
        const URL = `${this.BASE_API_URL}/artists/${id}/top-tracks?country=${country || 'ES'}`
        return await this.makeRequest<{tracks: ISpotifyTrack[]}>(URL)
    }
}

interface IPersonalizationQueryParams {
    limit?: number
    offset?: number
    timeRange?: string
}

interface IArtistTopTracksQueryParams { 
    id: string
    country?: string
}

export interface ISpotifyArtist {    
    external_urls: {
        spotify: string
    }
    followers: {
        href: string | null
        total : number
    }
    genres: string[]
    href : string
    id : string
    images : {height: number, url: string, width: number}[]
    name: string
    popularity: string
    type: string
    uri: string
}

interface ISpotifyArtistSummary {
    external_urls: {
        spotify: string
    }
    href: string
    id: string
    name: string
    type: ISpotifyArtist
    uri: string
}

export interface ISpotifyTrack {
    album: {
        album_type: string
        external_urls: {
            spotify: string
        }
        images : {height: number, url: string, width: number}[]
        name: string
        [key: string] : any
    }
    artists: ISpotifyArtistSummary[]
    external_urls: {
        spotify: string
    }
    href: string
    id: string
    name: string
    popularity: number
    preview_url: string
    type: string
    uri: string
    [key: string] : any
}

export interface ISpotifyResultList<T> {
    items: T[]
}
