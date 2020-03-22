import React from 'react';
import PropTypes from 'prop-types'

import Icon from '../atoms/Icon'
import Label from '../atoms/Label'
import SubLabel from '../atoms/SubLabel'
import {RESULT_TYPES} from '../../Utils/constants'
import './ItemTile.css'

const renderInfoSection = (type, title, artist, album) => (
    <div className='tile-info-section'>
        <Label>{title}</Label>
        {type === RESULT_TYPES.tracks && <SubLabel>{`${artist} | ${album}`}</SubLabel>}
    </div>
)

function ItemTile({type, index, currentlyPlayingIndex, title, imgUrl, artist, album, onClick}) {
  return (
      <div className={`item-tile${index === currentlyPlayingIndex ? ' playing' : ''}`} onClick={() => onClick(index)}>
          <Icon url={imgUrl} />
          {renderInfoSection(type, title, artist, album)}
      </div>
  )
}

ItemTile.defaultProps = {
    onClick: () => {}
}

ItemTile.propTypes = {
    type: PropTypes.oneOf(Object.keys(RESULT_TYPES)).isRequired,
    title: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    artist: PropTypes.string,
    album: PropTypes.string,
    onClick: PropTypes.func,
    index: PropTypes.number,
    currentlyPlayingIndex: PropTypes.number
}

export default ItemTile;
