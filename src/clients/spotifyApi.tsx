

interface IPersonalizationQueryParams {
    limit?: number
    offset?: number
    timeRange?:number
}

export class SpotifyApiClient {
    accessToken : string
    BASE_API_URL : string
    constructor(accessToken : string) {
        this.accessToken = accessToken;
        this.BASE_API_URL = 'https://api.spotify.com/v1'
    }

    async makeRequest(url : string) {
        const res = await fetch(url, {headers: {Authorization : `Bearer ${this.accessToken}`}})
        const jsonResponse = await res.json()
        return jsonResponse
    }

    async getUserInfo() {
        return await this.makeRequest(`${this.BASE_API_URL}/me`)
    }

    async getTopArtists(queryParams = {}) {
        const {limit, offset, timeRange} : IPersonalizationQueryParams= queryParams
        let URL = `${this.BASE_API_URL}/me/top/artists?limit=${limit || 50}`
        if (offset) {
            URL += `&offset=${offset}`
        }
        if (timeRange) {
            URL += `&time_range=${timeRange}`
        }

        return await this.makeRequest(URL)
    }

    async getTopTracks(queryParams = {}) {
        const {limit, offset, timeRange} : IPersonalizationQueryParams= queryParams
        let URL = `${this.BASE_API_URL}/me/top/tracks?limit=${limit || 50}`
        if (offset) {
            URL += `&offset=${offset}`
        }
        if (timeRange) {
            URL += `&time_range=${timeRange}`
        }

        return await this.makeRequest(URL)
    }
}