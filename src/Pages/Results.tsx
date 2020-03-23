
import React, {useState, useEffect, Fragment} from 'react';

import ItemList from '../components/molecules/ItemList';
import TopResult from '../components/molecules/TopResult';
import MuteButton from '../components/molecules/MuteButton';
import Footer from '../components/molecules/Footer';
import Title from '../components/atoms/Title';

import {SpotifyApiClient} from '../clients/spotifyApi'
import {AudioPlayer} from '../clients/audioPlayer'
import {arrayToComaSeparatedString} from '../Utils/helpers'
import {ResultsType, RESULT_TYPES} from '../Utils/constants'
import logo from '../logo.svg';
import './Results.css'

type ResultsPageProps = {
    accessToken: string
}


const TIME_RANGES = {
    short_term: 'short_term',
    medium_term: 'medium_term',
    long_term: 'long_term'
}

let audioPlayer : AudioPlayer;

const changeSong = (songIndex : number) => {
    audioPlayer.play(songIndex)
}

const toggleMute = (isMuted : boolean) => {
    isMuted ? audioPlayer.unmute() : audioPlayer.mute()
}

const ResultsPage : React.FC<ResultsPageProps> = ({accessToken}) => {
    const [userInfo, setUserInfo] = useState<any | null>(null)
    const [topTracks, setTopTracks] = useState<any | null>(null)
    const [topArtists, setTopArtists] = useState<any | null>(null)
    const [resultType, setResultType] = useState<ResultsType>(RESULT_TYPES.tracks)
    const [resultTimeRange, setResultTimeRange] = useState<any | null>(TIME_RANGES.medium_term)
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
                        <Title>Hey {usersName}. Your top {resultType} are...</Title>
                        <TopResult type={resultType} title={topTrack.name} topResultsLabelOnClick={changeSong} imgUrl={topTrack.album.images[0].url} artist={arrayToComaSeparatedString(topTrack.artists.map(({name} : {name: string}) => name))} album={topTrack.album.name}/>
                        <ItemList type={resultType} songs={topTracks} onTileClick={changeSong} currentlyPlayingIndex={currentlyPlayingSongIndex}/>
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
