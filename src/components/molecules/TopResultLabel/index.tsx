import React from 'react';
import {ResultsType, RESULT_TYPES, songIndexCallbackType} from '../../../Utils2/constants'
import SubLabel from '../../atoms/SubLabel'
import './TopResultLabel.css'

export interface Props {
    type : ResultsType,
    title: string,
    artist?: string,
    album?: string,
    onClick: songIndexCallbackType,
}


const TopResultLabel = ({type, title, artist, album, onClick = () => {}} : Props) =>{
  return (
      <div className={`top-result-label`} onClick={() => onClick(0)}>
          <p className='title'>{title}</p>
          {type === RESULT_TYPES.tracks && <SubLabel className='top-result-sublabel' >{`${artist} | ${album}`}</SubLabel>}
      </div>
  )
}

export default TopResultLabel;
