import React, {useState} from 'react';
import {ShowMoreLink, ItemTile} from '../index'
import {ResultsType, RESULT_TYPES, songIndexCallbackType} from '../../../utils/constants'
import {arrayToComaSeparatedString} from '../../../utils/helpers'
import './ItemList.css'

export interface Props {
    type: ResultsType,
    songs: any[],
    limit?: number,
    onTileClick?: songIndexCallbackType,
    currentlyPlayingIndex: number
}

const ItemList = ({type, songs, limit = 20, onTileClick = () => {}, currentlyPlayingIndex} : Props) => {
    const [showMore, setShowMore] = useState(false)
  return (
      <div className='item-list'>
          {songs.slice(0, showMore ? songs.length : limit).map((song, index) => {
              if (index === 0) return null;
              if (type === RESULT_TYPES.tracks) {
                const trackDetails = {
                    title: song.name,
                    imgUrl: song.album.images[2].url,
                    artist: arrayToComaSeparatedString(song.artists.map(({name} : {name: string}) => name)),
                    album: song.album.name
                }
                  return <ItemTile type={type} {...trackDetails} onClick={onTileClick} index={index} currentlyPlayingIndex={currentlyPlayingIndex} />
              } else {
                  return <div>xd</div>
              }
          })}
          <ShowMoreLink onClick={() => setShowMore(!showMore)} />
      </div>
  )
}

export default ItemList;
