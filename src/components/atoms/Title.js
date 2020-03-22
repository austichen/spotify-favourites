import React from 'react';
import PropTypes from 'prop-types'

const titleStyle = {
  'margin': 0,
  'fontSize': '4rem',
  'fontWeight': 'black'
}

function Title({children}) {
  return <h1 className='title' style={titleStyle}>{children}</h1>
}

Title.propTypes = {
  children: PropTypes.string.isRequired
}

export default Title;
