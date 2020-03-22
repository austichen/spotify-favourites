import React from 'react';
import PropTypes from 'prop-types'
import '../../App.css';

const labelStyle = {
  'fontSize': '1.2rem',
  'margin': 0
}

function Label({children}) {
  return <p className='label' style={labelStyle}>{children}</p>
}

Label.propTypes = {
  children: PropTypes.string.isRequired
}

export default Label;
