
import React, {useState, useEffect, Fragment} from 'react';
import {ItemList, TopResult, MuteButton, SettingsIcon, Footer} from '../../components/molecules'
import SettingsModal from '../../components/organisms/SettingsModal'
import Title from '../../components/atoms/Title';
import {SpotifyApiClient} from '../../clients/spotifyApi'
import {AudioPlayer} from '../../clients/audioPlayer'
import {arrayToComaSeparatedString} from '../../utils/helpers'
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

interface IResultGroups {
    short_term : any
    medium_term : any
    long_term : any
}

let audioPlayer : AudioPlayer;

const changeSong = (songIndex : number) => {
    audioPlayer.play(songIndex)
}

const toggleMute = (audioStatus : IAudioStatus, setAudioStatus: any) => {
    const {isMuted} = audioStatus
    isMuted ? audioPlayer.unmute() : audioPlayer.mute()
    setAudioStatus({...audioStatus, isMuted: !isMuted})
}

const ResultsPage = ({accessToken} : Props) => {
    const [userInfo, setUserInfo] = useState<any | null>(null)
    const [topTracks, setTopTracks] = useState<IResultGroups | null>(null)
    const [topArtists, setTopArtists] = useState<any | null>(null)
    const [resultsSettings, setResultsSettings] = useState<IResultsSettings>({type: RESULT_TYPES.tracks, timeRange: TIME_RANGES.medium_term})
    const [audioStatus, setAudioStatus] = useState<IAudioStatus>({currentSongIndex: -1, isMuted: process.env.REACT_APP_ENV === 'prod' ? false : true}) // so you don't get spammed with music in dev
    const [showModal, setShowModal] = useState<boolean>(false)
    
    useEffect(() => {
        const getResults = async (spotifyClient: SpotifyApiClient) => {
            const topTracksPromise = spotifyClient.getTopTracks({timeRange: TIME_RANGES.medium_term})
            const topArtistPromise = spotifyClient.getTopArtists({timeRange: TIME_RANGES.medium_term})
            const userInfoPromise = spotifyClient.getUserInfo()
            const [topTracksRes, topArtistsRes, userInfoRes] = await Promise.all([topTracksPromise, topArtistPromise, userInfoPromise])
            setTopTracks({short_term: null, medium_term: topTracksRes.items, long_term: null})
            setUserInfo(userInfoRes)
            audioPlayer = new AudioPlayer(topTracksRes.items.map(({preview_url} : {preview_url : string}) => preview_url), audioStatus.isMuted)
            audioPlayer.setSongChangeCallback((currentSongIndex : number) => setAudioStatus((a: IAudioStatus) => ({...a, currentSongIndex})))
            audioPlayer.play(0)
            setTopArtists(topArtistsRes.items)

            // do this after to improve page-load time
            const remainingRequests = [
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
        }
        
        const spotifyClient = new SpotifyApiClient(accessToken)
        getResults(spotifyClient)

    }, [accessToken])

    useEffect(() => {
        const {timeRange} = resultsSettings
        if (!topTracks || !topTracks[timeRange]) return;
        audioPlayer.updateTrackList(topTracks[timeRange].map(({preview_url} : {preview_url : string}) => preview_url))
        audioPlayer.play(0)
    }, [resultsSettings])

    const handleModalClose = (settings : IResultsSettings) => {
       setShowModal(false)
       if (settings.timeRange !== resultsSettings.timeRange || settings.type !== resultsSettings.type) {
           setResultsSettings(settings)
       }
    }

    
    return (
      <div className='page results-page'>
            {(() => {
                if (!topTracks || !topArtists || !userInfo) {
                    return <img src={logo} className="App-logo" alt="logo" />
                } else {
                    const {type, timeRange} = resultsSettings
                    const topBannerIndex = audioStatus.currentSongIndex === -1 ? 0 : audioStatus.currentSongIndex
                    const topTrack = topTracks[timeRange][topBannerIndex]
                    const usersName = userInfo.display_name.split(' ')[0]
                    return (
                    <Fragment>
                        <div className='results-page-background'></div>
                        <SettingsModal resultsSettings={resultsSettings} isOpen={showModal} onClose={handleModalClose} />
                        <Title>Hey {usersName}. Your top {type} are...</Title>
                        <TopResult type={type} rank={topBannerIndex + 1} title={topTrack.name} spotifyUrl={topTrack.external_urls.spotify} imgUrl={topTrack.album.images[0].url} artist={arrayToComaSeparatedString(topTrack.artists.map(({name} : {name: string}) => name))} album={topTrack.album.name}/>
                        <ItemList type={type} songs={topTracks[timeRange]} onTileClick={changeSong} currentlyPlayingIndex={audioStatus.currentSongIndex}/>
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
