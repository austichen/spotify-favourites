
import React, {useState, useEffect, Fragment} from 'react';

import {ItemList, TopResult, MuteButton, SettingsIcon, Footer} from '../../components/molecules'
import SettingsModal from '../../components/organisms/SettingsModal'
import Title from '../../components/atoms/Title';

import {SpotifyApiClient, ISpotifyResultList, ISpotifyArtist, ISpotifyTrack} from '../../clients/spotifyApi'
import {AudioPlayer} from '../../clients/audioPlayer'

import {arrayToComaSeparatedString, mapArtistsToTracks, IArtistTrackMapping} from '../../utils/helpers'
import {RESULT_TYPES, TIME_RANGES, IResultsSettings} from '../../utils/constants'

import logo from '../../logo.svg';
import './Results.css'

interface Props {
    accessToken: string
}

interface IAudioStatus {
    currentSongIndex : number
    isMuted : boolean
}

interface IResultGroups<T> {
    short_term : T | null
    medium_term : T | null
    long_term : T | null
}

let audioPlayer : AudioPlayer;
let artistTrackMap : IArtistTrackMapping;

const toggleMute = (audioStatus : IAudioStatus, setAudioStatus: any) => {
    const {isMuted} = audioStatus
    isMuted ? audioPlayer.unmute() : audioPlayer.mute()
    setAudioStatus({...audioStatus, isMuted: !isMuted})
}

const ResultsPage = ({accessToken} : Props) => {
    const [userInfo, setUserInfo] = useState<any | null>(null)
    const [topTracks, setTopTracks] = useState<IResultGroups<ISpotifyTrack[]> | null>(null)
    const [topArtists, setTopArtists] = useState<IResultGroups<ISpotifyArtist[]> | null>(null)
    const [resultsSettings, setResultsSettings] = useState<IResultsSettings>({type: RESULT_TYPES.tracks, timeRange: TIME_RANGES.medium_term})
    const [audioStatus, setAudioStatus] = useState<IAudioStatus>({currentSongIndex: -1, isMuted: process.env.REACT_APP_ENV === 'prod' ? false : true}) // so you don't get spammed with music in dev
    const [showModal, setShowModal] = useState<boolean>(false)
    
    useEffect(() => {
        const getResults = async () => {
            // fetch spotify data
            const topTracksPromise = spotifyClient.getTopTracks({timeRange: TIME_RANGES.medium_term})
            const topArtistPromise = spotifyClient.getTopArtists({timeRange: TIME_RANGES.medium_term})
            const userInfoPromise = spotifyClient.getUserInfo()
            const [topTracksRes, topArtistsRes, userInfoRes] = await Promise.all<ISpotifyResultList<ISpotifyTrack>, ISpotifyResultList<ISpotifyArtist>, any>([topTracksPromise, topArtistPromise, userInfoPromise])

            // update state
            setTopTracks({short_term: null, medium_term: topTracksRes.items, long_term: null})
            setTopArtists({short_term: null, medium_term: topArtistsRes.items, long_term: null})
            setUserInfo(userInfoRes)

            // set up audio player with track info and start playing
            const trackList = topTracksRes.items.map((track) => track.preview_url)
            const songChangeCallback = (currentSongIndex : number) => setAudioStatus((a: IAudioStatus) => ({...a, currentSongIndex}))
            audioPlayer = new AudioPlayer(trackList, audioStatus.isMuted, songChangeCallback)
            audioPlayer.play(0)

            // load the rest of the info after page is already active to improve page-load time
            const remainingRequests : [
                Promise<ISpotifyResultList<ISpotifyTrack>>,
                Promise<ISpotifyResultList<ISpotifyTrack>>,
                Promise<ISpotifyResultList<ISpotifyArtist>>,
                Promise<ISpotifyResultList<ISpotifyArtist>>,
            ] = [
                spotifyClient.getTopTracks({timeRange: TIME_RANGES.short_term}),
                spotifyClient.getTopTracks({timeRange: TIME_RANGES.long_term}),
                spotifyClient.getTopArtists({timeRange: TIME_RANGES.short_term}),
                spotifyClient.getTopArtists({timeRange: TIME_RANGES.long_term}),
            ]
            
            const [
                tracksShortTerm,
                tracksLongTerm,
                artistsShortTerm,
                artistsLongTerm
            ] = await Promise.all(remainingRequests)
            
            setTopTracks({medium_term: topTracksRes.items, short_term: tracksShortTerm.items, long_term: tracksLongTerm.items})
            setTopArtists({medium_term: topArtistsRes.items, short_term: artistsShortTerm.items, long_term: artistsLongTerm.items})

            let allArtists = topArtistsRes.items.concat(artistsShortTerm.items, artistsLongTerm.items)
            allArtists = allArtists.filter((artist, index) => allArtists.indexOf(artist) === index) // remove duplicates

            let allTracks = topTracksRes.items.concat(tracksShortTerm.items, tracksLongTerm.items)
            allTracks = allTracks.filter((track, index) => allTracks.indexOf(track) === index) // remove duplicates

            artistTrackMap = await mapArtistsToTracks(allArtists, allTracks)
            Object.entries(artistTrackMap).forEach(async ([key, value]) => {
                if (!value) {
                    artistTrackMap[key] = (await spotifyClient.getArtistTopTracks({id: key})).tracks[0].preview_url
                }
            })
        }
        
        const spotifyClient = new SpotifyApiClient(accessToken)
        getResults()

    // eslint-disable-next-line
    }, [accessToken])

    useEffect(() => {
        const {timeRange, type} = resultsSettings
        
        if (type === RESULT_TYPES.tracks) {
            if (!topTracks || !topTracks[timeRange]) return;
            const tracks = topTracks[timeRange]
            if (!tracks) return;
            audioPlayer.updateTrackList(tracks.map(track => track.preview_url))
        } else {
            if (!topArtists || !topArtists[timeRange]) return;
            const artists = topArtists[timeRange]
            if (!artists) return
            audioPlayer.updateTrackList(artists.map(artist => artistTrackMap[artist.id] || ''))
        }
        audioPlayer.play(0)
        // eslint-disable-next-line
    }, [resultsSettings])

    const handleModalClose = (settings : IResultsSettings) => {
       setShowModal(false)
       if (settings.timeRange !== resultsSettings.timeRange || settings.type !== resultsSettings.type) {
           setResultsSettings(settings)
       }
    }

    const changeSong = (songIndex : number) => {
        audioPlayer.play(songIndex)
    }    

    
    return (
      <div className='page results-page'>
            {(() => {
                if (!topTracks || !topArtists || !userInfo) {
                    return <img src={logo} className="App-logo" alt="logo" />
                } else {
                    const {type, timeRange} = resultsSettings
                    const topBannerIndex = audioStatus.currentSongIndex === -1 ? 0 : audioStatus.currentSongIndex
                    let topResultInfo, listItems
                    if (resultsSettings.type === RESULT_TYPES.tracks) {
                        const tracks = topTracks[timeRange]
                        if (!tracks) return null
                        const topTrack = tracks[topBannerIndex]
                        topResultInfo = {
                            rank: topBannerIndex + 1,
                            title: topTrack.name,
                            spotifyUrl: topTrack.external_urls.spotify,
                            imgUrl: topTrack.album.images[0].url,
                            artist: arrayToComaSeparatedString(topTrack.artists.map(({name} : {name: string}) => name)),
                            album: topTrack.album.name
                        }
                        listItems = tracks
                    } else {
                        const artists = topArtists[timeRange]
                        if (!artists) return null
                        const topArtist = artists[topBannerIndex]
                        topResultInfo = {
                            rank: topBannerIndex + 1,
                            title: topArtist.name,
                            spotifyUrl: topArtist.external_urls.spotify,
                            imgUrl: topArtist.images[0].url
                        }
                        listItems = artists
                    }
                    const usersName = userInfo.display_name.split(' ')[0]
                    return (
                    <Fragment>
                        <div className='results-page-background'></div>
                        <SettingsModal resultsSettings={resultsSettings} isOpen={showModal} onClose={handleModalClose} />
                        <Title>Hey {usersName}. Your top {type} are...</Title>
                        <TopResult type={type} {...topResultInfo} />
                        <ItemList type={type} items={listItems} onTileClick={changeSong} currentlyPlayingIndex={audioStatus.currentSongIndex}/>
                        <div className="settings-area">
                            <SettingsIcon hoverAction='opaque' onClick={() => setShowModal(true)}/>
                            <MuteButton isMuted={audioStatus.isMuted} hoverAction='opaque' onClick={() => toggleMute(audioStatus, setAudioStatus)}/>
                        </div>
                        <Footer />
                    </Fragment>
                    )
                }
            })()}
      </div>
    );
}

export default ResultsPage;
