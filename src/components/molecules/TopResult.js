import React, {useEffect} from 'react';
import PropTypes from 'prop-types'
import {RESULT_TYPES} from '../../Utils/constants'
import {getImgDataUrl, getAverageImgColour} from '../../Utils/helpers'
import Icon from '../atoms/Icon'
import TopResultLabel from './TopResultLabel'
import './TopResult.css'

const setBackgroundColor = topResultImage => {
    console.log('onload called')

    const dataUrl = getImgDataUrl(topResultImage);
    const newImg = new Image()
    newImg.src = dataUrl
    newImg.onload = () => {
        const {r, g, b} = getAverageImgColour(topResultImage);
        const root = document.documentElement;
        const backgroundGradient = document.querySelector('.results-page-background')
        root.style.setProperty('--gradient-top', `rgb(${r}, ${g}, ${b})`)
        backgroundGradient.classList.add('show-gradient')
    }
}

function TopResult({type, title, imgUrl, artist, album, topResultsLabelOnClick}) {
    useEffect(() => {
        const topResultImage = document.querySelector('.top-result .icon');
        if (topResultImage) {
            const img = new Image()
            img.crossOrigin = "*";
            img.src = imgUrl
            img.addEventListener('load', () => setBackgroundColor(img), false)

        }
    }, [imgUrl])

  return (
      <div className='top-result'>
          <h1 className='number-one-label'>1.</h1>
          <Icon url={imgUrl} size={300}/>
          <TopResultLabel className='top-result-label' type={type} title={title} artist={artist} album={album} onClick={topResultsLabelOnClick} />
          <div className='top-result-background'></div>
      </div>
  )
}

TopResult.propTypes = {
    type: PropTypes.oneOf(Object.keys(RESULT_TYPES)).isRequired,
    title: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    artist: PropTypes.string,
    album: PropTypes.string,
    topResultsLabelOnClick: PropTypes.func
}

export default TopResult;
