import React from 'react';

export interface Props {
  url: string
  size?: number,
  alt?: string
}
const Icon = ({url, size = 50, alt = 'Image of artist/album'} : Props) => {
  return <img className='icon' width={`${size}px`} height={`${size}px`} src={url} alt={alt}></img>
}




export default Icon;
