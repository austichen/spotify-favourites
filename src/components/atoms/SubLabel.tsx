import React from 'react';
import PropTypes from 'prop-types'
import '../../App.css';

export interface Props {
  children: any
  className?: string
}

const subLabelStyle = {
  'fontSize': '0.6rem',
  'margin' : 0
}

const SubLabel = ({children, ...props} : Props) => {
  return <p className='sublabel' style={subLabelStyle} {...props}>{children}</p>
}

export default SubLabel;
