import React from 'react';
import PropTypes from 'prop-types'
import './Link.css'

const linkStyle = {
    fontWeight: 'light',
    fontSize: '1rem',
    textDecoration: 'none',
    cursor: 'pointer'
}

function Link({url, onClick, children}) {
  return <a className='link' href={url} onClick={onClick} style={linkStyle}>{children}</a>
}

Link.defaultProps = {
    onClick: () => {}
}

Link.propTypes = {
    url: PropTypes.string,
    onClick: PropTypes.func
}

export default Link;
