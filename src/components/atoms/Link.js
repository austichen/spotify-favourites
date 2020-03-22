import React from 'react';
import PropTypes from 'prop-types'
import './Link.css'


function Link({url, className, newTab, hoverAction, onClick, children}) {
  return <a className={`link ${hoverAction} ${className || ''}`} href={url} target={newTab ? '_blank' : '_self'} onClick={onClick}>{children}</a>
}

Link.defaultProps = {
    newTab: false,
    hoverAction: 'dim',
    onClick: () => {}
}

Link.propTypes = {
    className: PropTypes.string,
    url: PropTypes.string,
    newTab: PropTypes.bool,
    hoverAction: PropTypes.oneOf(['dim', 'opaque']),
    onClick: PropTypes.func
}

export default Link;
