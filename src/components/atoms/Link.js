import React from 'react';
import PropTypes from 'prop-types'
import './Link.css'


function Link({url, onClick, children}) {
  return <a className='link' href={url} onClick={onClick}>{children}</a>
}

Link.defaultProps = {
    onClick: () => {}
}

Link.propTypes = {
    url: PropTypes.string,
    onClick: PropTypes.func
}

export default Link;
