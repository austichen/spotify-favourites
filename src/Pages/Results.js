
import React, {useState, useEffect, Fragment} from 'react';
import PropTypes from 'prop-types'

import ItemList from '../components/molecules/ItemList';
import TopResult from '../components/molecules/TopResult';
import MuteButton from '../components/molecules/MuteButton';
import Footer from '../components/molecules/Footer';
import Title from '../components/atoms/Title';

import {SpotifyApiClient} from '../clients/spotifyApi'
import {AudioPlayer} from '../clients/audioPlayer'
import {arrayToComaSeparatedString} from '../Utils/helpers'
import {RESULT_TYPES} from '../Utils/constants'
import logo from '../logo.svg';
import './Results.css'


const TIME_RANGES = {
    short_term: 'short_term',
    medium_term: 'medium_term',
    long_term: 'long_term'
}

let audioPlayer;

const changeSong = songIndex => {
    audioPlayer.play(songIndex)
}

const toggleMute = isMuted => {
    isMuted ? audioPlayer.unmute() : audioPlayer.mute()
}

function ResultsPage({accessToken}) {
    const [userInfo, setUserInfo] = useState(null)
    const [topTracks, setTopTracks] = useState(null)
    const [topArtists, setTopArtists] = useState(null)
    const [resultType, setResultType] = useState(RESULT_TYPES.tracks)
    const [resultTimeRange, setResultTimeRange] = useState(TIME_RANGES.medium_term)
    const [currentlyPlayingSongIndex, setCurrentlyPlayingSongIndex] = useState(null)
    
    useEffect(() => {
        const getResults = async spotifyClient => {
            const topTracksPromise = spotifyClient.getTopTracks({timeRange: TIME_RANGES.medium_term})
            const topArtistPromise = spotifyClient.getTopArtists({timeRange: TIME_RANGES.medium_term})
            const userInfoPromise = spotifyClient.getUserInfo()
            const [topTracksRes, topArtistsRes, userInfoRes] = await Promise.all([topTracksPromise, topArtistPromise, userInfoPromise])
            setTopTracks(topTracksRes.items)
            setUserInfo(userInfoRes)
            audioPlayer = new AudioPlayer(topTracksRes.items.map(track => track.preview_url))
            audioPlayer.setSongChangeCallback(currentSongIndex => setCurrentlyPlayingSongIndex(currentSongIndex))
            audioPlayer.play(0)
            setTopArtists(topArtistsRes.items)
        }
        
        if (accessToken) {
            const spotifyClient = new SpotifyApiClient(accessToken)
            getResults(spotifyClient)
        }
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
                        <TopResult type={resultType} title={topTrack.name} topResultsLabelOnClick={changeSong} imgUrl={topTrack.album.images[0].url} artist={arrayToComaSeparatedString(topTrack.artists.map(({name}) => name))} album={topTrack.album.name}/>
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

ResultsPage.propTypes = {
    accessToken: PropTypes.string.isRequired
}

export default ResultsPage;
