

interface IPersonalizationQueryParams {
    limit?: number
    offset?: number
    timeRange?:number
}

export class SpotifyApiClient {
    private accessToken : string
    private BASE_API_URL = 'https://api.spotify.com/v1'

    constructor(accessToken : string) {
        this.accessToken = accessToken;
    }

    private async makeRequest(url : string) {
        const res = await fetch(url, {headers: {Authorization : `Bearer ${this.accessToken}`}})
        const jsonResponse = await res.json()
        return jsonResponse
    }

    public async getUserInfo() {
        return await this.makeRequest(`${this.BASE_API_URL}/me`)
    }

    public async getTopArtists(queryParams = {}) {
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

    public async getTopTracks(queryParams = {}) {
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