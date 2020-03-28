import * as React from 'react';
import {Icon, Label, SubLabel} from '../../atoms'
import {ResultsType, RESULT_TYPES, songIndexCallbackType} from '../../../utils/constants'
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

const ItemTile = ({type, index, currentlyPlayingIndex, title, imgUrl, artist, album, onClick = () => {}} : Props) => {
  return (
      <div className={`item-tile${index === currentlyPlayingIndex ? ' playing' : ''}`} onClick={() => onClick(index)}>
          <Label>{index+1}</Label>
          <Icon url={imgUrl} />
          <div className='tile-info-section'>
            <Label>{title}</Label>
            {type === RESULT_TYPES.tracks && <SubLabel>{`${artist} | ${album}`}</SubLabel>}
          </div>
      </div>
  )
}

export default ItemTile;
