import React, {useState} from 'react';
import PropTypes from 'prop-types'

import ShowMoreLink from './ShowMoreLink'
import ItemTile from './ItemTile';
import {RESULT_TYPES} from '../../Utils/constants'
import {arrayToComaSeparatedString} from '../../Utils/helpers'
import './ItemList.css'

function ItemList({type, songs, limit, onTileClick, currentlyPlayingIndex}) {
    const [showMore, setShowMore] = useState(false)
  return (
      <div className='item-list'>
          {songs.slice(0, showMore ? songs.length : limit).map((song, index) => {
              if (index === 0) return;
              if (type === RESULT_TYPES.tracks) {
                const trackDetails = {
                    title: song.name,
                    imgUrl: song.album.images[2].url,
                    artist: arrayToComaSeparatedString(song.artists.map(({name}) => name)),
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

ItemList.defaultProps = {
    limit: 20,
}

ItemList.propTypes = {
    type: PropTypes.oneOf(Object.keys(RESULT_TYPES)).isRequired,
    songs: PropTypes.arrayOf(PropTypes.object).isRequired,
    limit: PropTypes.number,
    onTileClick: PropTypes.func,
    currentlyPlayingIndex: PropTypes.number
}

export default ItemList;
