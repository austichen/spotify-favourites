import React from 'react';
import PropTypes from 'prop-types'

function Icon({url, size, alt}) {
  return <img className='icon' width={`${size}px`} height={`${size}px`} src={url} alt={alt}></img>
}

Icon.defaultProps = {
    size: 50,
    alt: 'Image of artist/album'
}

Icon.propTypes = {
    url: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    alt: PropTypes.string
}

export default Icon;
