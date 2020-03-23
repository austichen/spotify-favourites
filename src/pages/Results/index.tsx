
import React, {useState, useEffect, Fragment} from 'react';
import {ItemList, TopResult, MuteButton, Footer} from '../../components/molecules'
import Title from '../../components/atoms/Title';
import {SpotifyApiClient} from '../../clients/spotifyApi'
import {AudioPlayer} from '../../clients/audioPlayer'
import {arrayToComaSeparatedString} from '../../utils/helpers'
import {ResultsType, RESULT_TYPES} from '../../utils/constants'
import logo from '../../logo.svg';
import './Results.css'

interface Props {
    accessToken: string
}

interface IResultsInfo {
    type: ResultsType,
    timeRange: TIME_RANGES
}

enum TIME_RANGES {
    short_term = 'short_term',
    medium_term = 'medium_term',
    long_term = 'long_term'
}

let audioPlayer : AudioPlayer;

const changeSong = (songIndex : number) => {
    audioPlayer.play(songIndex)
}

const toggleMute = (isMuted : boolean) => {
    isMuted ? audioPlayer.unmute() : audioPlayer.mute()
}

const ResultsPage = ({accessToken} : Props) => {
    const [userInfo, setUserInfo] = useState<any | null>(null)
    const [topTracks, setTopTracks] = useState<any | null>(null)
    const [topArtists, setTopArtists] = useState<any | null>(null)
    const [resultsInfo, setResultsInfo] = useState<IResultsInfo>({type: RESULT_TYPES.tracks, timeRange: TIME_RANGES.medium_term})
    const [currentlyPlayingSongIndex, setCurrentlyPlayingSongIndex] = useState<any | null>(null)
    
    useEffect(() => {
        const getResults = async (spotifyClient: SpotifyApiClient) => {
            const topTracksPromise = spotifyClient.getTopTracks({timeRange: TIME_RANGES.medium_term})
            const topArtistPromise = spotifyClient.getTopArtists({timeRange: TIME_RANGES.medium_term})
            const userInfoPromise = spotifyClient.getUserInfo()
            const [topTracksRes, topArtistsRes, userInfoRes] = await Promise.all([topTracksPromise, topArtistPromise, userInfoPromise])
            setTopTracks(topTracksRes.items)
            setUserInfo(userInfoRes)
            audioPlayer = new AudioPlayer(topTracksRes.items.map(({preview_url} : {preview_url : string}) => preview_url))
            audioPlayer.setSongChangeCallback((currentSongIndex : number) => setCurrentlyPlayingSongIndex(currentSongIndex))
            audioPlayer.play(0)
            setTopArtists(topArtistsRes.items)
        }
        
        const spotifyClient = new SpotifyApiClient(accessToken)
        getResults(spotifyClient)

    }, [accessToken])

    const {type} = resultsInfo
    
    return (
      <div className='page results-page'>
            {(() => {
                if (!topTracks || !topArtists || !userInfo) {
                    return <img src={logo} className="App-logo" alt="logo" />
                } else {
                    const topTrack = topTracks[0]
                    const usersName = userInfo.display_name.split(' ')[0]
                    return (
                    <Fragment>
                        <div className='results-page-background'></div>
                        <Title>Hey {usersName}. Your top {type} are...</Title>
                        <TopResult type={type} title={topTrack.name} topResultsLabelOnClick={changeSong} imgUrl={topTrack.album.images[0].url} artist={arrayToComaSeparatedString(topTrack.artists.map(({name} : {name: string}) => name))} album={topTrack.album.name}/>
                        <ItemList type={type} songs={topTracks} onTileClick={changeSong} currentlyPlayingIndex={currentlyPlayingSongIndex}/>
                        <Footer />
                        <MuteButton hoverAction='opaque' onClick={toggleMute}/>
                    </Fragment>
                    )
                }
            })()}
      </div>
    );
}

export default ResultsPage;
