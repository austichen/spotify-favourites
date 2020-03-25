import React, {useState} from 'react';
import {ShowMoreLink, ItemTile} from '../index'
import {ResultsType, RESULT_TYPES, songIndexCallbackType} from '../../../utils/constants'
import {arrayToComaSeparatedString} from '../../../utils/helpers'
import './ItemList.css'

export interface Props {
    type: ResultsType,
    items: any[],
    limit?: number,
    onTileClick?: songIndexCallbackType,
    currentlyPlayingIndex: number
}

const ItemList = ({type, items: songs, limit = 20, onTileClick = () => {}, currentlyPlayingIndex} : Props) => {
    const [showMore, setShowMore] = useState(false)
  return (
      <div className='item-list'>
          {songs.slice(0, showMore ? songs.length : limit).map((song, index) => {
                const trackDetails : any = {
                    title: song.name,
                    imgUrl: type === RESULT_TYPES.tracks ? song.album.images[2].url : song.images[2].url,
                }
              if (type === RESULT_TYPES.tracks) {
                    trackDetails.artist = arrayToComaSeparatedString(song.artists.map(({name} : {name: string}) => name))
                    trackDetails.album = song.album.name
                }
                return <ItemTile type={type} {...trackDetails} onClick={onTileClick} index={index} currentlyPlayingIndex={currentlyPlayingIndex} />
          })}
          <ShowMoreLink onClick={() => setShowMore(!showMore)} />
      </div>
  )
}

export default ItemList;
