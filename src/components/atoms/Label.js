import React from 'react';
import PropTypes from 'prop-types'
import '../../App.css';

const labelStyle = {
  'margin': 0
}

function Label({children}) {
  return <p style={labelStyle}>{children}</p>
}

Label.propTypes = {
  children: PropTypes.string.isRequired
}

export default Label;
