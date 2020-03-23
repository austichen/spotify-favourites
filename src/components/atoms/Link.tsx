import React from 'react';
import './Link.css'

export interface Props {
  className?: string
  url?: string
  newTab?: boolean
  hoverAction?: 'dim' | 'opaque'
  onClick?: () => void
  children : any
}

function Link({url, className, newTab = false, hoverAction = 'dim', onClick = () => {}, children} : Props) {
  return <a className={`link ${hoverAction} ${className || ''}`} href={url} target={newTab ? '_blank' : '_self'} onClick={onClick}>{children}</a>
}



export default Link;
