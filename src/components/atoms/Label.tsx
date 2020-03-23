import React from 'react';

export interface Props {
  children: any
}

const labelStyle : React.CSSProperties = {
  'fontSize': '1.2rem',
  'margin': 0
}

const Label = ({children} : Props) => {
  return <p className='label' style={labelStyle}>{children}</p>
}

export default Label;
