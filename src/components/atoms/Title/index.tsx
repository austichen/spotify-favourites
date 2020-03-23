import React from 'react';

export interface Props {
  children : any
  fontSize? : string
}


const Title = ({children, fontSize = '4rem'} : Props) => {
  const getTitleStyle = (): React.CSSProperties => ({
    'margin': 0,
    fontSize,
    'fontWeight': 'bold'
  })
  return <h1 className='title' style={getTitleStyle()}>{children}</h1>
}

export default Title;
