import React, {useEffect} from 'react';
import {ResultsType, songIndexCallbackType} from '../../Utils/constants'
import {getImgDataUrl, getAverageImgColour} from '../../Utils/helpers'
import Icon from '../atoms/Icon'
import TopResultLabel from './TopResultLabel'
import './TopResult.css'

export interface Props {
    type: ResultsType
    title: string
    imgUrl: string
    artist?: string
    album?: string
    topResultsLabelOnClick: songIndexCallbackType
}

const setBackgroundColor = (topResultImage : HTMLImageElement) => {
    const dataUrl = getImgDataUrl(topResultImage);
    const newImg = new Image()
    newImg.src = dataUrl
    newImg.onload = () => {
        const {r, g, b} = getAverageImgColour(topResultImage);
        const root = document.documentElement;
        const backgroundGradient = document.querySelector('.results-page-background')
        if (backgroundGradient === null) return;
        root.style.setProperty('--gradient-top', `rgb(${r}, ${g}, ${b})`)
        backgroundGradient.classList.add('show-gradient')
    }
}

const TopResult = ({type, title, imgUrl, artist, album, topResultsLabelOnClick = () => {}} : Props) => {
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
          <TopResultLabel  type={type} title={title} artist={artist} album={album} onClick={topResultsLabelOnClick} />
          <div className='top-result-background'></div>
      </div>
  )
}

export default TopResult;
