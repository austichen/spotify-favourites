

export class SpotifyApiClient {
    constructor(accessToken) {
        this.accessToken = accessToken;
        this.BASE_API_URL = 'https://api.spotify.com/v1'
    }

    async makeRequest(url) {
        const res = await fetch(url, {headers: {Authorization : `Bearer ${this.accessToken}`}})
        const jsonResponse = await res.json()
        return jsonResponse
    }

    async getTopArtists(queryParams = {}) {
        const {limit, offset, timeRange} = queryParams
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
        const {limit, offset, timeRange} = queryParams
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