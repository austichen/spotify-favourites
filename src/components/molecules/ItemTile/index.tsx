import * as React from 'react';
import {Icon, Label, SubLabel} from '../../atoms'
import {ResultsType, RESULT_TYPES, songIndexCallbackType} from '../../../Utils2/constants'
import './ItemTile.css'

export interface Props {
    type: ResultsType
    title: string
    imgUrl: string
    artist?: string
    album?: string
    onClick?: songIndexCallbackType
    index: number
    currentlyPlayingIndex: number
}

const renderInfoSection = (type : ResultsType, title : string, artist : string | undefined, album : string | undefined) => (
    <div className='tile-info-section'>
        <Label>{title}</Label>
        {type === RESULT_TYPES.tracks && <SubLabel>{`${artist} | ${album}`}</SubLabel>}
    </div>
)

const ItemTile = ({type, index, currentlyPlayingIndex, title, imgUrl, artist, album, onClick = () => {}} : Props) => {
  return (
      <div className={`item-tile${index === currentlyPlayingIndex ? ' playing' : ''}`} onClick={() => onClick(index)}>
          <Icon url={imgUrl} />
          {renderInfoSection(type, title, artist, album)}
      </div>
  )
}

export default ItemTile;
