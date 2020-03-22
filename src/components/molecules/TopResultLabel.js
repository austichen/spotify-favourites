import React from 'react';
import PropTypes from 'prop-types'
import {RESULT_TYPES} from '../../Utils/constants'
import './TopResultLabel.css'
import SubLabel from '../atoms/SubLabel'


function TopResultLabel({type, title, artist, album, onClick}) {
  return (
      <div className={`top-result-label`} onClick={() => onClick(0)}>
          <p className='title'>{title}</p>
          {type === RESULT_TYPES.tracks && <SubLabel className='top-result-sublabel' >{`${artist} | ${album}`}</SubLabel>}
      </div>
  )
}

TopResultLabel.defaultProps = {
    onClick: () => {}
}

TopResultLabel.propTypes = {
    type: PropTypes.oneOf(Object.keys(RESULT_TYPES)).isRequired,
    title: PropTypes.string.isRequired,
    artist: PropTypes.string,
    album: PropTypes.string,
    onClick: PropTypes.func
}

export default TopResultLabel;
