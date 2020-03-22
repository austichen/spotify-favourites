import React from 'react';
import PropTypes from 'prop-types'
import '../../App.css';

const subLabelStyle = {
  'fontSize': '0.6rem',
  'margin' : 0
}

function SubLabel({children, ...props}) {
  return <p className='sublabel' style={subLabelStyle} {...props}>{children}</p>
}

SubLabel.propTypes = {
  children: PropTypes.string.isRequired
}

export default SubLabel;
