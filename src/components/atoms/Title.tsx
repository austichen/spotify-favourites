import React from 'react';

export interface Props {
  children : any
}

const titleStyle : React.CSSProperties = {
  'margin': 0,
  'fontSize': '4rem',
  'fontWeight': 'bold'
}

const Title = ({children} : Props) => {
  return <h1 className='title' style={titleStyle}>{children}</h1>
}

export default Title;
